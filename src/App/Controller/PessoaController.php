<?php

namespace App\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class PessoaController
{
    /**
     * Método que lista pessoas
     *
     * @param Application $app
     * @return JsonResponse
     */
    public function listPessoas(Application $app)
    {
        try {
            $sql = "
            SELECT 
                p.id AS pessoa_id,
                p.nome,
                p.tipo,
                c.id AS contato_id,
                c.tipo AS contato_tipo,
                c.valor AS contato_valor
            FROM pessoa p
            LEFT JOIN contato c ON p.id = c.pessoa_id
            ORDER BY p.id
        ";

            $rows = $app['db']->fetchAll($sql);

            $pessoas = [];
            foreach ($rows as $row) {
                $id = $row['pessoa_id'];

                if (!isset($pessoas[$id])) {
                    $pessoas[$id] = [
                        'id' => $id,
                        'nome' => $row['nome'],
                        'tipo' => $row['tipo'],
                        'contatos' => []
                    ];
                }

                if (!empty($row['contato_id'])) {
                    $pessoas[$id]['contatos'][] = [
                        'id' => $row['contato_id'],
                        'tipo' => $row['contato_tipo'],
                        'valor' => $row['contato_valor']
                    ];
                }
            }

            return new JsonResponse([
                'success' => true,
                'data' => array_values($pessoas)
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Insere uma nova pessoa validando duplicidade de registros
     *
     * @param Request $request
     * @param Application $app
     * @return JsonResponse
     */
    public function store(Request $request, Application $app)
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Validação dos dados recebidos
            if (!isset($data['nome']) || !isset($data['tipo'])) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Campos obrigatórios ausentes'
                ], 400);
            }

            $nome = trim($data['nome']);
            $tipo = trim($data['tipo']);

            // Verificação de duplicidade de nome
            $sqlCheck = "SELECT COUNT(*) AS total FROM pessoa WHERE LOWER(nome) = LOWER(?)";
            $result = $app['db']->fetchAssoc($sqlCheck, [$nome]);

            if ($result['total'] > 0) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Já existe uma pessoa com este nome.'
                ], 400);
            }

            // Inserção no banco de dados
            $sql = "INSERT INTO pessoa (nome, tipo) VALUES (?, ?)";
            $app['db']->executeUpdate($sql, [$nome, $tipo]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Pessoa cadastrada com sucesso'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exclui uma pessoa passando seu ID
     *
     * @param Application $app
     * @param $id
     * @return JsonResponse
     */
    public function deletePessoa(Application $app, $id)
    {
        try {
            // Verifica se a pessoa existe
            $sql = "SELECT * FROM pessoa WHERE id = ?";
            $pessoa = $app['db']->fetchAssoc($sql, [$id]);

            if (!$pessoa) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Pessoa não encontrada'
                ], 404);
            }

            // Deleta a pessoa pelo ID
            $app['db']->delete('pessoa', ['id' => $id]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Pessoa deletada com sucesso'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza uma pessoa verificando duplicidade de registro.
     *
     * @param Application $app
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function updatePessoa(Application $app, Request $request, $id)
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!$data) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Nenhum dado enviado'
                ], 400);
            }

            $sql = "SELECT * FROM pessoa WHERE id = ?";
            $pessoa = $app['db']->fetchAssoc($sql, [$id]);

            if (!$pessoa) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Pessoa não encontrada'
                ], 404);
            }

            // Verifica se o nome já existe em outra pessoa.
            if (isset($data['nome'])) {
                $sql = "SELECT COUNT(*) FROM pessoa WHERE nome = ? AND id <> ?";
                $count = $app['db']->fetchColumn($sql, [$data['nome'], $id]);

                if ($count > 0) {
                    return new JsonResponse([
                        'success' => false,
                        'error' => 'Já existe uma pessoa com este nome'
                    ], 400);
                }
            }

            // Atualiza os dados
            $updateData = [];
            foreach ($data as $key => $value) {
                $updateData[$key] = $value;
            }

            $app['db']->update('pessoa', $updateData, ['id' => $id]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Pessoa atualizada com sucesso'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Busca uma pessoa pelo seu ID
     *
     * @param $id
     * @param Application $app
     * @return JsonResponse
     */
    public function buscarPorId($id, Application $app)
    {
        $sql = "SELECT * FROM pessoa WHERE id = ?";
        $pessoa = $app['db']->fetchAssoc($sql, [(int) $id]);

        if (!$pessoa) {
            return new JsonResponse(['error' => 'Pessoa não encontrada'], 404);
        }

        return new JsonResponse(['data' => $pessoa], 200);
    }

}


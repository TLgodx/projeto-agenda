<?php

namespace App\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ContatoController
{
    /**
     * Busca os registros para expor na interface
     *
     * @param Request $request
     * @param Application $app
     * @return JsonResponse
     */
    public function listContatos(Request $request, Application $app)
    {
        try {
            $dados = json_decode($request->getContent(), true);
            $pessoaId = isset($dados['pessoa_id']) ? $dados['pessoa_id'] : null;

            if (!$pessoaId) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'ID da pessoa não fornecido.'
                ], 400);
            }

            $sql = "SELECT * FROM contato WHERE pessoa_id = ?";
            $contatos = $app['db']->fetchAll($sql, [ $pessoaId ]);

            return new JsonResponse([
                'success' => true,
                'data' => $contatos
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cria um registro de contato validando a duplicidade de registro.
     *
     * @param Request $request
     * @param Application $app
     * @return JsonResponse
     */
    public function storeContato(Request $request, Application $app)
    {
        // Obtém os dados do corpo da requisição
        $data = json_decode($request->getContent(), true);

        // Validação dos campos obrigatórios
        if (empty($data['pessoa_id']) || empty($data['tipo']) || empty($data['descricao']) || empty($data['valor'])) {
            return new JsonResponse([
                'success' => false,
                'error' => 'Campos obrigatórios ausentes'
            ], 400);
        }

        try {
            // Verifica se já existe um contato igual
            $sql = "SELECT COUNT(*) FROM contato WHERE pessoa_id = ? AND tipo = ? AND valor = ?";
            $existe = $app['db']->fetchColumn($sql, [$data['pessoa_id'], $data['tipo'], $data['valor']]);

            if ($existe > 0) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Já existe um contato com este tipo e valor para essa pessoa'
                ], 400);
            }

            // Insere os dados
            $app['db']->insert('contato', [
                'pessoa_id' => $data['pessoa_id'],
                'tipo' => $data['tipo'],
                'descricao' => $data['descricao'],
                'valor' => $data['valor']
            ]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Contato cadastrado com sucesso'
            ], 201);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Método responsável por excluir um registro de contato.
     *
     * @param Application $app
     * @param $id
     * @return JsonResponse
     */
    public function deleteContato(Application $app, $id)
    {
        try {
            // Verifica se o contato existe
            $sql = "SELECT * FROM contato WHERE id = ?";
            $contato = $app['db']->fetchAssoc($sql, [$id]);

            if (!$contato) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Contato não encontrado'
                ], 404);
            }

            // Deleta o contato pelo ID
            $app['db']->delete('contato', ['id' => $id]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Contato deletado com sucesso'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza um contato passando pessoaId validadndo a duplicidade
     *
     * @param Application $app
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function updateContato(Application $app, Request $request, $id)
    {
        try {
            // Obtém os dados do corpo da requisição
            $data = json_decode($request->getContent(), true);

            if (!$data) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Nenhum dado enviado'
                ], 400);
            }

            // Verifica se o contato existe
            $sql = "SELECT * FROM contato WHERE id = ?";
            $contato = $app['db']->fetchAssoc($sql, [$id]);

            if (!$contato) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Contato não encontrado'
                ], 404);
            }

            // Se o tipo ou valor for alterado, verificar duplicidade
            if (isset($data['tipo']) && isset($data['valor'])) {
                $sqlDuplicado = "SELECT COUNT(*) FROM contato WHERE pessoa_id = ? AND tipo = ? AND valor = ? AND id <> ?";
                $existe = $app['db']->fetchColumn($sqlDuplicado, [
                    $contato['pessoa_id'],
                    $data['tipo'],
                    $data['valor'],
                    $id
                ]);

                if ($existe > 0) {
                    return new JsonResponse([
                        'success' => false,
                        'error' => 'Já existe outro contato vinculado para essa pessoa'
                    ], 400);
                }
            }

            // Atualiza apenas os campos enviados
            $updateData = [];
            foreach ($data as $key => $value) {
                $updateData[$key] = $value;
            }

            $app['db']->update('contato', $updateData, ['id' => $id]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Contato atualizado com sucesso'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
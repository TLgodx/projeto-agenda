app.controller('PessoaEditController', function ($scope, $routeParams, $location, PessoaService) {
   
    /**
     * Carrega o registro em edição.
     * @type {*[]}
     */
    $scope.pessoa = {};
    
    /**
     * define o estado em que o formulario se encontra
     */
    $scope.mode = 'edit'
    
    /**
     * Disponibiliza as opções para o select de tipos de pessoa
     * @type {string[]}
     */
    $scope.tiposPessoa = [
        'Pessoa Física',
        'Pessoa Jurídica',
    ];
    
    /**
     * Busca uma pessoa pelo seu ID.
     */
    $scope.init = function () {
        var id = $routeParams.id;
        
        if (!id) {
            return;
        }
        PessoaService.buscarPorId(id).then(function (response) {
                $scope.pessoa = response.data.data;
            })
    };
    
    /**
     * Verifica se uma pessoa já existe, caso exista atualiza o cadastro.
     */
    $scope.salvarPessoa = function () {
        if ($scope.pessoa.id) {
            // Pessoa já existe, atualizar
            PessoaService.atualizarPessoa($scope.pessoa.id, $scope.pessoa).then(function (response) {
                    alert(response.data.message);
                    $location.path('/pessoas');
                }).catch(function (error) {
                    if (error.data && error.data.error) {
                        alert('Erro: ' + error.data.error);
                    } else {
                        alert('Erro ao atualizar pessoa. Verifique os dados e tente novamente.');
                    }
                });
        } else {
            // Nova pessoa, cadastrar
            PessoaService.cadastrar($scope.pessoa).then(function (response) {
                    alert(response.data.message);
                    $location.path('/pessoas');
                }).catch(function (error) {
                    if (error.data && error.data.error) {
                        alert('Erro: ' + error.data.error);
                    } else {
                        alert('Erro ao cadastrar pessoa. Verifique os dados e tente novamente.');
                    }
                });
        }
    };
    
    /**
     * Ao clicar em cancelar volta para a listagem
     */
    $scope.voltarParaLista = function() {
        $location.path('/pessoas');
    };
    
    /**
     * Define a aba que esta selecionada
     */
    $scope.abaSelecionada = 'dados';
    
    $scope.selecionarAba = function(aba) {
        $scope.abaSelecionada = aba;
    };
    
// Inicializa o controlador
    $scope.init();
    
});


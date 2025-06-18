app.controller('PessoaCreateController', function ($scope, $location, PessoaService) {
    
    /**
     * Referencia ao registro em edição
     * @type {{}}
     */
    $scope.pessoa = {};
    
    /**
     * Referencia ao estado de visualização do formulário
     */
    $scope.mode = 'create';
    
    /**
     * Referencia a aba selecionada
     */
    $scope.abaSelecionada = 'dados';
    
    /**
     * Disponibiliza as opções para o select de tipos de pessoa
     * @type {string[]}
     */
    $scope.tiposPessoa = [
        'Pessoa Física',
        'Pessoa Jurídica',
    ];
    
    /**
     * Salva uma nova pessoa
     */
    $scope.salvarPessoa = function () {
        PessoaService.cadastrar($scope.pessoa).then(function (response) {
                alert(response.data.message);
                $location.path('/pessoas');
            })
            .catch(function (error) {
                if (error.data && error.data.error) {
                    alert(error.data.error);
                } else {
                    alert('Erro ao cadastrar pessoa. Verifique os dados e tente novamente.');
                }
                console.error('Erro ao cadastrar pessoa:', error);
            });
    };

    
    /**
     * Voltar para listagem
     */
    $scope.voltarParaLista = function () {
        $location.path('/pessoas');
    };
    
    /**
     * Selecionar aba (dados/contatos)
     */
    $scope.selecionarAba = function (aba) {
        $scope.abaSelecionada = aba;
    };
});

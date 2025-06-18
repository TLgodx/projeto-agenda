app.controller('PessoaShowController', function ($scope, $routeParams, PessoaService, ContatoService, $location) {
    
    /**
     * Recebe o registro de uma pessoa
     * @type {{}}
     */
    $scope.pessoa = {}
    
    /**
     * Define o estado em que o formulario se encontra
     */
    $scope.mode = 'show'
    
    /**
     * Indica o estado em que a aba se encontra
     * @type {string}
     */
    $scope.abaSelecionada = 'dados'
    
    /**
     * Disponibiliza as opções para o select de tipos de pessoa
     * @type {string[]}
     */
    $scope.tiposPessoa = [
        'Pessoa Física',
        'Pessoa Jurídica',
    ];
    
    /**
     * Função para selecionar a aba
     */
    $scope.selecionarAba = function (aba) {
        $scope.abaSelecionada = aba;
    };
    
    /**
     * Busca o registro pelo Id
     */
    PessoaService.buscarPorId($routeParams.id).then(function (response) {
        $scope.pessoa = response.data.data;
        
        // Lista os contatos de uma pessoa
        ContatoService.listarPorPessoa($routeParams.id).then(function (response) {
            $scope.contatos = response.data.data || [];
        });
    });
    
    /**
     * Volta para a listagem
     */
    $scope.voltarParaLista = function () {
        $location.path('/pessoas');
    };
    
    /**
     * Ir para a tela de edição
     */
    $scope.irParaEditar = function () {
        $location.path('/pessoas/editar/' + $scope.pessoa.id);
    };
});

app.controller('PessoaContatosController', function($scope,$uibModal,ContatoService, $http) {
    
    /**
     * Recebe a lista de contatos
     * @type {*[]}
     */
    $scope.contatos = [];
    
    /**
     * Busca pelos contatos vinculados a uma pessoa
     */
    $scope.carregarContatos = function() {
        ContatoService.listarPorPessoa($scope.pessoa.id).then(function(response) {
            if (response.data.success) {
                $scope.contatos = response.data.data;
            }
        });
    };
    
    /**
     * Abre modal para criar novo contato
     */
    $scope.abrirModalContato = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/pessoa/pessoa.contato.modal.html',
            size: 'lg',
            controller: 'contatoModalController',
            resolve: {
                contato: function () { return null; }, // criação
                pessoaId: function () { return $scope.pessoa.id; }
            }
        });
        
        modalInstance.result.then(function () {
            $scope.carregarContatos();
        });
    };
    
    /**
     * Abre modal para editar contato existente
     */
    $scope.editarContato = function(contato) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/pessoa/pessoa.contato.modal.html',
            size: 'lg',
            controller: 'contatoModalController',
            resolve: {
                contato: function () { return angular.copy(contato); },
                pessoaId: function () { return $scope.pessoa.id; }
            }
        });
        
        modalInstance.result.then(function (salvou) {
            if (salvou) {
                $scope.carregarContatos();
            }
        }).catch(function() {
        
        });
    };
    
    /**
     * Exclui um contato pelo seu ID
     * @param id
     */
    $scope.excluirContato = function (id) {
        ContatoService.excluir(id).then(function (response){
            if (response.data.success){
                alert("Contato excluído com sucesso.");
                $scope.carregarContatos();
            }else {
                alert("Erro ao excluir contato: " + response.data.error);
            }
        })
    }
    
    /**
     * Carrega os contatos ao abrir a aba
     */
    if ($scope.abaSelecionada === 'contatos') {
        $scope.carregarContatos();
    }
    
    // Se quiser, use $watch para reagir à aba
    $scope.$watch('abaSelecionada', function(novaAba) {
        if (novaAba === 'contatos') {
            $scope.carregarContatos();
        }
    });
});

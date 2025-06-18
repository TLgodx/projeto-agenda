app.controller('contatoModalController', function($scope, $uibModalInstance, pessoaId, contato, ContatoService) {
   
    /**
     * Inicializa ou clona o contato
     */
    $scope.contato = angular.copy(contato) || {};
    
    /**
     * Referênci a pessoa a quem o contato faz parte
     */
    $scope.pessoaId = pessoaId;
    
    /**
     * Normaliza o valor do contato com base no tipo (telefone, email, etc)
     */
    function normalizarContato(valor, tipo) {
        if (!valor || !tipo) return '';
        tipo = tipo.toLowerCase();
        
        if (tipo === 'telefone') {
            return valor.replace(/\D/g, '');
        }
        
        if (tipo === 'email') {
            return valor.trim().toLowerCase();
        }
        
        return valor.trim();
    }
    
    /**
     * Disponibiliza as opções para o select de tipos de contato
     * @type {string[]}
     */
    $scope.tiposContato = [
        'Telefone',
        'Email',
        'Outro'
    ];
    
    /**
     * Valida de um contato sera criado ou editado antes de salvar
     *
     */
    $scope.salvar = function() {
        $scope.contato.pessoa_id = $scope.pessoaId;
        
        //Normaliza o valor antes de enviar
        $scope.contato.valor = normalizarContato($scope.contato.valor, $scope.contato.tipo);
        
        if ($scope.contato.id) {
            ContatoService.atualizarContato($scope.contato.id, $scope.contato).then(function(response) {
                if (response.data.success) {
                    alert("Contato atualizado com sucesso.");
                    $uibModalInstance.close(true);
                } else {
                    alert("Erro ao atualizar contato: " + (response.data.error || "Erro desconhecido."));
                }
            }).catch(function(error) {
                const mensagemErro = error.data && error.data.error
                    ? error.data.error
                    : 'Erro inesperado ao atualizar o contato.';
                alert(mensagemErro);
            });
        } else {
            ContatoService.cadastrar($scope.contato).then(function(response) {
                if (response.data.success) {
                    alert("Contato cadastrado com sucesso.");
                    $uibModalInstance.close(true);
                } else {
                    alert("Erro ao cadastrar contato: " + (response.data.error || "Erro desconhecido."));
                }
            }).catch(function(error) {
                const mensagemErro = error.data && error.data.error
                    ? error.data.error
                    : 'Erro inesperado ao cadastrar o contato.';
                alert(mensagemErro);
            });
        }
    };
    
    /**
     * Fecha a modal
     */
    $scope.cancelar = function() {
        $uibModalInstance.dismiss('cancel');
    };
});

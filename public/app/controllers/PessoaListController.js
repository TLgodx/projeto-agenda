app.controller('PessoaListController', function ($scope, $location, PessoaService, $rootScope) {
    
    $scope.pessoas = [];
    $scope.pessoasFiltradas = null;
    
    $scope.totalPessoas = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    
    function getListaAtual() {
        return ($scope.pessoasFiltradas && $scope.pessoasFiltradas.length > 0) ? $scope.pessoasFiltradas : $scope.pessoas;
    }
    
    $scope.getPaginatedPessoas = function () {
        const lista = getListaAtual();
        const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const end = start + $scope.itemsPerPage;
        return lista.slice(start, end);
    };
    
    $scope.totalPages = function () {
        const lista = getListaAtual();
        return Math.ceil(lista.length / $scope.itemsPerPage);
    };
    
    $scope.proximaPagina = function () {
        if ($scope.currentPage < $scope.totalPages()) {
            $scope.currentPage++;
        }
    };
    
    $scope.paginaAnterior = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };
    
    $scope.listarPessoas = function () {
        PessoaService.listar().then(function (response) {
            $scope.pessoas = response.data.data || [];
            $scope.pessoasFiltradas = null;
            $scope.totalPessoas = $scope.pessoas.length;
            $scope.currentPage = 1;
        }).catch(function (error) {
            console.error('Erro ao listar pessoas:', error);
        });
    };
    
    $scope.removerPessoa = function (id) {
        PessoaService.excluir(id).then(function () {
            $scope.listarPessoas();
        }).catch(function (error) {
            console.error('Erro ao remover pessoa:', error);
            if (error.status === 404) {
                console.warn('A pessoa já foi excluída do banco de dados.');
                $scope.listarPessoas();
            }
        });
    };
    
    $scope.contarPessoas = function () {
        return getListaAtual().length;
    };
    
    $scope.irParaCadastro = function () {
        $location.path('/pessoas/nova');
    };
    
    $scope.visualizarPessoa = function (id) {
        $location.path('/pessoas/show/' + id);
    };
    
    $scope.editarPessoa = function (id) {
        if (!id) {
            console.error("Erro: ID inválido para edição!");
            return;
        }
        $location.path('/pessoas/editar/' + id);
    };
    
    $scope.abrirFiltro = function () {
        $('#filtro-pessoa-modal').modal('show');
    };
    
    /**
     * Escuta o filtro vindo do controller de filtro
     */
    $scope.$on('aplicarFiltroPessoa', function (event, filtro) {
        $scope.currentPage = 1;
        
        if ((!filtro.id || filtro.id === '') && (!filtro.nome || filtro.nome.trim() === '')) {
            $scope.pessoasFiltradas = null;
            return;
        }
        
        $scope.pessoasFiltradas = $scope.pessoas.filter(function (pessoa) {
            var idOk = !filtro.id || pessoa.id.toString().includes(filtro.id.toString());
            var nomeOk = !filtro.nome || pessoa.nome.toLowerCase().includes(filtro.nome.toLowerCase());
            return idOk && nomeOk;
        });
    });
    
    $scope.listarPessoas();
});

app.controller('pessoaFilterController', function ($scope, $rootScope) {
    $scope.filtro = {
        id: '',
        nome: ''
    };
    
    $scope.enviarFiltro = function () {
        $rootScope.$broadcast('aplicarFiltroPessoa', angular.copy($scope.filtro));
    };
    
    $scope.limparFiltro = function () {
        $scope.filtro = {
            id: '',
            nome: ''
        };
        $rootScope.$broadcast('aplicarFiltroPessoa', angular.copy($scope.filtro));
    };
});

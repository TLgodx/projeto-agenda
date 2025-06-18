app.service('PessoaService', function ($http) {
    var apiListaPessoas = 'http://agenda.local/listPessoas';
    var apiCriaPessoas = 'http://agenda.local/storePessoas';
    var apiExcluiPessoas = 'http://agenda.local';
    var apiAtualizaPessoas = 'http://agenda.local/updatePessoa/';
    var buscaPorId = 'http://agenda.local/getPessoa/'
    
    
    this.listar = function () {
        return $http.post(apiListaPessoas);
    };
    
    this.cadastrar = function (pessoa) {
        return $http.post(apiCriaPessoas, pessoa);
    };

    this.excluir = function (id) {
        return $http.post(apiExcluiPessoas + '/deletePessoas/' + id);
    };
    
    this.buscarPorId = function (id) {
        return $http.get(buscaPorId + id);
    };
    this.atualizarPessoa = function (id, pessoa) {
        return $http.post(apiAtualizaPessoas + id, pessoa);
        };
    
});

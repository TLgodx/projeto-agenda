app.factory('ContatoService', function($http) {
    return {
        excluir: function (id){
            return $http.post('/deleteContatos/' + id)
        },
        listarPorPessoa: function (pessoaId) {
            return $http.post('/listContatos', { pessoa_id: pessoaId });
        },
        cadastrar: function (contato){
            return $http.post('/storeContato', contato);
        },
        atualizarContato: function (id, contato){
            return $http.post('/updateContato/' + id, contato);
        }
    };
});

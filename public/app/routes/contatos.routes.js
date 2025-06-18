app.config(function ($routeProvider) {
    $routeProvider
        .when('/contatos', {
            templateUrl: 'app/views/pessoa/contatos.list.html',
            controller: 'contatoListController'
        })
        .when('/pessoas/nova', {
            templateUrl: 'app/views/pessoa/pessoas.form.html',
            controller: 'PessoaFormController'
        })
        
        .when('/pessoas/editar/:id', {
            templateUrl: 'app/views/pessoa/.form.html',
            controller: 'PessoaEditContrr'
        })
        // .when('/contatos/:pessoaId', {
        //     templateUrl: 'public/app/views/contato/lista.html',
        //     controller: 'ContatoController'
        // })
        .otherwise({
            redirectTo: '/pessoas'
        });
});



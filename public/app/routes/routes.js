app.config(function ($routeProvider) {
    $routeProvider
        .when('/pessoas', {
            templateUrl: 'app/views/pessoa/pessoas.list.html',
            controller: 'PessoaListController'
        })
        
        .when('/pessoas/nova', {
            templateUrl: 'app/views/pessoa/pessoas.form.html',
            controller: 'PessoaCreateController'
        })
        
        .when('/pessoas/show/:id',{
            templateUrl: 'app/views/pessoa/pessoas.form.html',
            controller: 'PessoaShowController'
        })
        
        .when('/pessoas/editar/:id', {
            templateUrl: 'app/views/pessoa/pessoas.form.html',
            controller: 'PessoaEditController'
        })
        // .when('/contatos/:pessoaId', {
        //     templateUrl: 'public/app/views/contato/lista.html',
        //     controller: 'ContatoController'
        // })
        .otherwise({
            redirectTo: '/pessoas'
        });
});



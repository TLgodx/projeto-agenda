<?php

require_once __DIR__.'/bootstrap.php';

$app->get('/', 'App\Controller\AppController::welcomeAction')->bind('home');

//Rota para o endpoint de listagem de Pessoas
$app->post('/listPessoas', 'App\Controller\PessoaController::listPessoas');

//Rota para o endpoint de inserção de Pessoas
$app->post('/storePessoas', 'App\Controller\PessoaController::store');

//Rota para o endpoint de inserção de Pessoas
$app->post('/deletePessoas/{id}', 'App\Controller\PessoaController::deletePessoa');

//Rota para o endpoint de atualização de cadastro de Pessoas
$app->post('/updatePessoa/{id}', 'App\Controller\PessoaController::updatePessoa');

// Rota para buscar uma pessoa pelo ID
$app->get('/getPessoa/{id}', 'App\Controller\PessoaController::buscarPorId');




// Rota para listar os contatos
$app->post('/listContatos', 'App\Controller\ContatoController::listContatos');

//Rota para o endpoint de cadastro de contatos vinculados a uma pessoa
$app->post('/storeContato', 'App\Controller\ContatoController::storeContato');

//Rota para o endpoint de exclusão de contatos vinculados a uma pessoa
$app->post('/deleteContatos/{id}', 'App\Controller\ContatoController::deleteContato');

//Rota para o endpoint de exclusão de contatos vinculados a uma pessoa
$app->post('/updateContato/{id}', 'App\Controller\ContatoController::updateContato');





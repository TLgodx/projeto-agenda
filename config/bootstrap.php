<?php

use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\DoctrineServiceProvider;


//Configuration TwigServiceProvider
$app->register(new TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../templates',
));

$app['twig'] = $app->share($app->extend('twig', function ($twig, $app) {
    return $twig;
}));

$app = new Application();

$app->register(new DoctrineServiceProvider(), [
    'db.options' => [
        'driver'   => 'pdo_mysql',
        'host'     => 'localhost',
        'dbname'   => 'agenda',
        'user'     => 'root',
        'password' => 'root',
        'charset'  => 'utf8mb4',
    ]
]);

return $app;


//$queryBuilder = $conn->createQueryBuilder();

//$selected = $queryBuilder->select('id','nome','produto', 'valor')
//    ->from('loja')
//    ->where('id='.$queryBuilder->createNamedParameter(0))
//    ->setParameter('id',1);
//
//var_dump($selected->execute()->fetch(\PDO::FETCH_ASSOC));

/*$inserted = $queryBuilder->insert('loja')->values([
    'id'=> ':id',
    'nome' => ':nome',
    'produto' => ':produto',
    'valor' => ':valor',
])->setParameters([
    'id'=> '3',
    'nome' => 'xiaomi',
    'produto' => 'pocoPhone',
    'valor' => '1450',
])->execute();
var_dump($inserted);*/



$app['debug'] = true;
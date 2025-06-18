<?php
require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;

$app = new Application();

require_once __DIR__.'/../config/routes.php';
require_once __DIR__.'/../config/bootstrap.php';

$app->run();
<?php
require '../vendor/autoload.php';

$settings = require __DIR__ . '/../app/settings.php';
$app = new \Slim\App($settings);

$dependencies = require __DIR__ . '/../app/dependencies.php';
$dependencies($app);

$routes = require __DIR__ . '/../app/routes.php';
$routes($app);

$app->run();
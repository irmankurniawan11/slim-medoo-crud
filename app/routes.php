<?php

use App\Controller\HomeController;
use App\Controller\MuridController;
use App\Controller\SekolahController;
use Slim\App;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\Http\Response as HttpResponse;

return function (App $app) {

    $app->get('/', function ($request, $response, array $args) {
        return HomeController::index($this, $request, $response, $args);
    });
    $app->get('/sekolah', function ($request, $response, array $args) {
        return SekolahController::index($this, $request, $response, $args);
    });
    $app->post('/add-sekolah', function ($request, $response, array $args){
        $data = $request->getParsedBody();
        return SekolahController::create($this, $request, $response,  ['data' => $data]);
    });
    $app->delete('/api/delete-sekolah', function (Request $request, HttpResponse $response, array $args) {
        $data = $request->getParsedBody();
        return SekolahController::deleteSekolah($this, $request, $response, ['data' => $data]);
    });

    $app->get('/api/sekolah', function($request, $response, array $args) {
        return SekolahController::getAllSekolah($this, $request, $response, $args);
    });
    $app->get('/api/sekolah/{id}', function($request, $response, array $args) {
        return SekolahController::getSekolahById($this, $request, $response, $args);
    });
    $app->get('/api/murid', function($request, $response, array $args) {
        return MuridController::getAllMurid($this, $request, $response, $args);
    });
    $app->get('/api/murid/{id}', function($request, $response, array $args) {
        return MuridController::getMuridById($this, $request, $response, $args);
    });

};
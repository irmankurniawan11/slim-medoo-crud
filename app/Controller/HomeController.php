<?php

namespace App\Controller;

class HomeController extends BaseController {
    public static function index($app, $request, $response, $args=null) {

        $app->view->render($response, 'home.twig', 
            [
                "title" => "Home"
            ]
        );
    }

}
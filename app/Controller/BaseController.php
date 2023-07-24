<?php

namespace App\Controller;

class BaseController {
    protected $container;
    public function __construct($container) {
        $this->container = $container;
    }

}
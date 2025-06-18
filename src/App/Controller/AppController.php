<?php

namespace App\Controller;

use Silex\Application;

/**
 * @author Diego Brocanelli <contato@diegobrocanelli.com.br>
 */
class AppController
{
    /**
     * Render welcome view.
     *
     * @param  Application $app Silex\Application
     * @return Twig_Environment
     */
    public function welcomeAction(Application $app)
    {
        return $app['twig']->render('welcome.html', array(
            'content' => 'Hello World!'
        ));
    }
}
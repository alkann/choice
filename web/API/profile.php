<?php

session_start();
require_once '../vendor/twig/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../twig');
$twig = new Twig_Environment($loader, array(
    'cache' => false,
));

include '../protected/dbconnect.php';

$template = $twig->loadTemplate('profile.html.twig');
echo $template->render(
    array('login' => $_SESSION['logged'])
);
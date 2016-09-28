<?php
session_start();
require_once '../vendor/twig/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../twig');
$twig = new Twig_Environment($loader, array(
    'cache' => false,
));

include '../protected/dbconnect.php';
include '../protected/user_data.php';
include '../protected/if_selected.php';

$template = $twig->loadTemplate('order_form.html.twig');
echo $template->render(
    array(
        'login' => $_SESSION['logged'],
        'user'=>$user_information_array[0],
        'shop'=>$_SESSION['selected'],
        'price' =>$_SESSION['shop_price'])
);
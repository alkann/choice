<?php
session_start();
require_once 'vendor/twig/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('twig');
$twig = new Twig_Environment($loader, array(
    'cache' => false,
));

include 'protected/dbconnect.php';
include 'protected/user_data.php';
include 'protected/orders_data.php';
include 'protected/if_selected.php';

$p24_url_return = 'http://www.choiceunderwear.pl/';
$p24_url_status = 'http://www.choiceunderwear.pl/verify.php';

$p24_merchant_id = '51855';
$p24_pos_id = '51855';
$p24_amount = ($_SESSION['shop_price'] + $_SESSION['transport'])*100;
$p24_currency = 'PLN';
$p24_description = 'Slipy męskie';
$p24_email = $_SESSION["userInformation"][0]['email'];
$p24_country = 'pl';

$sign_24 = $_SESSION['pay_unid'] . '|'.$p24_merchant_id.'|'.$p24_amount.'|'.$p24_currency.'|'.'6b039d4412a892e3';
$sign_24 = md5($sign_24);

$fields = array(
    'p24_merchant_id' => '51855',
    'p24_pos_id' => '51855',
    'p24_session_id' => $_SESSION['pay_unid'],
    'p24_amount' => $p24_amount,
    'p24_currency' => 'PLN',
    'p24_description' => 'Slipy meskie',
    'p24_email' => $p24_email,
    'p24_country' => 'PL',
    'p24_url_return' => $p24_url_return,
    'p24_url_status' => $p24_url_status,
    'p24_api_version' => '3.2',
    'p24_sign' => $sign_24,
    'p24_name_X' => 'Slipy Męskie',
    'p24_quantity_X' => $_SESSION['shop_count'],
    'p24_price_X' => $p24_amount,
    'p24_amount_pln' => ($_SESSION['shop_price'] + $_SESSION['transport'])
);


$isSesion = !isset($_SESSION['open']);
$_SESSION['open'] = 1;

$template = $twig->loadTemplate('pay.html.twig');
echo $template->render(
    array(
        'login' => $_SESSION['logged'],
        'pay' => $fields,
        'session' => false,
        'menu' => false)
);

$_SESSION['selected'] = null;
$_SESSION['shop_count'] = 0;
$_SESSION['shop_price'] = 0;
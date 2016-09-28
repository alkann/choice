<?php
require_once '../vendor/twig/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../twig');
$twig = new Twig_Environment($loader, array(
    'cache' => false,
));


$urs_inf = $_SESSION["userInformation"];

$user_total_array = array(
    'email'=>$urs_inf['email'],
    'name'=>$urs_inf['user_name'],
    'surname'=>$urs_inf['surname'],
    'street'=>$urs_inf['street'],
    'nr'=>$urs_inf['house_nr'],
    'city'=>$urs_inf['city'],
    'postcode'=>$urs_inf['postcode'],
    'prepaid'=>$_SESSION['transport'],
    'order'=>$_SESSION['selected'],
    'price'=>intval($_SESSION['shop_price'])+intval($_SESSION['transport']),
    'order_nr'=>$_SESSION['total_order_nr']
);


$template = $twig->loadTemplate('email_to_user.html.twig');
$message = $template->render(
    array('user'=>$user_total_array)
);
$subject = 'Choice - realizacja zamówienia';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

// Additional headers
$headers .= 'To: '.$urs_inf['user_name'].' <'.$urs_inf['email'].'>' . "\r\n";
$headers .= 'From: Choice <kontakt@choiceunderwear.pl>' . "\r\n";

mail($urs_inf["email"], $subject, $message, $headers);
?>
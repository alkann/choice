<?php
session_start();
require_once '../vendor/twig/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../twig');
$twig = new Twig_Environment($loader, array(
    'cache' => false,
));

include '../protected/dbconnect.php';

$orderItems = array();
$orderArray = array();
$order_id = $_POST['order_id'];

if(isset($_SESSION["user"])){
    $stmt = $pdo -> query("SELECT * FROM orders_items WHERE order_id=$order_id");
    $orderItems= $stmt->fetchAll();
}
if(isset($_SESSION["user"])){
    $stmt = $pdo -> query("SELECT * FROM orders WHERE order_id=$order_id LIMIT 1");
    $orderArray= $stmt->fetchAll();
}

$itemsrTemplate = array(
    'hasItems'=>count($orderItems),
    'items'=>$orderItems,
    'name' =>$_POST['order_number'],
    'order_id'=>$_POST['order_id'],
    'data'=>$orderArray[0]
);

$template = $twig->loadTemplate('one_order.html.twig');
echo $template->render(
    array(
        'login' => $_SESSION['logged'],
        'order' => $itemsrTemplate
    )
);
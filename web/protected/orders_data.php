<?php
$orderArray = array();

if(isset($_SESSION["user"])){
    $user_id = $_SESSION["user"];
    $stmt = $pdo -> query("SELECT * FROM orders WHERE user_id=$user_id");
    $orderArray= $stmt->fetchAll();
}

$orderTemplate = array(
    'hasOrders'=>count($orderArray),
    'orders'=>$orderArray
);
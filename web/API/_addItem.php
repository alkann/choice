<?php
session_start();
include_once '../protected/dbconnect.php';

// it will never let you open index(login) page if session is set

function checkData($input){
    $output = trim($input);
    $output = strip_tags($output);
    $output = htmlspecialchars($output);
    return $output;
}

    $_SESSION['selected'] = $_POST['shopitems'];

    $shopItems = $_POST['shopitems'];
    $shopCount = 0;
    $_SESSION['shop_count'] = 0;
    $_SESSION['shop_price'] = 0;
    $if_promotion = false;

    for ($i = 0; $i <= count($shopItems); $i++) {
        $shopCount += $shopItems[$i][5];
    }

    $shopPrice = $shopCount*69;

    if(($shopCount % 2) == 0){
        $shopPrice = $shopCount*50;
        $if_promotion = $shopCount*69;
    }

    $_SESSION['shop_price'] = $shopPrice;
    $_SESSION['shop_count'] = $shopCount;

    $arr = array(
        'success'=> true,
        'logged'=> $_SESSION['logged'],
        'element'=> $_POST['shopitems'],
        'count' => $shopCount,
        'price' => $shopPrice,
        'if_promotion'=> $if_promotion
    );

    echo json_encode($arr);
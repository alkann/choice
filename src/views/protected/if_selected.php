<?php
if(isset($_SESSION['selected'])){
    $shopCount = 0;
    for ($i = 0; $i <= count($_SESSION['selected']); $i++) {
        $shopCount += $_SESSION['selected'][$i][5];
    }

    $shopPrice = $shopCount*69;

    if(($shopCount % 2) == 0){
        $shopPrice = $shopCount*50;
    }

    $_SESSION['shop_price'] = $shopPrice;
    $_SESSION['shop_count'] = $shopCount;
}
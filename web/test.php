<?php

include 'protected/dbconnect.php';

$order_date = date('Y-m-d\TH:i:s');
$is_paid = true;
$pay_unid = '852cef7c090f2f4aac9ecfc0a91c5a1a';

$stmt = $pdo -> query("UPDATE orders SET paid_date='$order_date', is_paid='$is_paid' WHERE pay_id='$pay_unid'");
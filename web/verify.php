<?php
include 'protected/dbconnect.php';

$p24_sign = md5($_POST['p24_session_id'] .'|'.$_POST['p24_order_id'].'|'.$_POST['p24_amount'].'|'.$_POST['p24_currency'].'|'.'6b039d4412a892e3');

$fileLocation = getenv("DOCUMENT_ROOT") . "/myfile.txt";
$file = fopen($fileLocation,"w");
$content = $_POST['p24_merchant_id'].' | '.$_POST['p24_pos_id'].' | '.$_POST['p24_session_id'].' | '.$_POST['p24_amount'].' | '.$_POST['p24_currency'].' | '.$_POST['p24_order_id'].' | '.$p24_sign;
fwrite($file,$content);
fclose($file);

// where are we posting to?
$url = 'https://secure.przelewy24.pl/trnVerify';

// what post fields?
$fields = array(
    'p24_merchant_id' => $_POST['p24_merchant_id'],
    'p24_pos_id' => $_POST['p24_pos_id'],
    'p24_session_id' => $_POST['p24_session_id'],
    'p24_amount' => $_POST['p24_amount'],
    'p24_currency' => $_POST['p24_currency'],
    'p24_order_id' => $_POST['p24_order_id'],
    'p24_sign' => $p24_sign
);

$order_date = date('Y-m-d\TH:i:s');
$is_paid = true;
$pay_unid = $_POST['p24_session_id'];

// build the urlencoded data
$postvars = http_build_query($fields);

// open connection
$ch = curl_init();

// set the url, number of POST vars, POST data
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($fields));
curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);

// execute post
$result = curl_exec($ch);

// close connection
curl_close($ch);

$stmt = $pdo -> query("UPDATE orders SET paid_date='$order_date', is_paid='$is_paid' WHERE pay_id='$pay_unid'");
?>
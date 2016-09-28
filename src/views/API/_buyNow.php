<?php
session_start();
include_once '../protected/dbconnect.php';

// it will never let you open index(login) page if session is set
$err = false;
$sucess = false;
$pay_succes = false;

if(isset($_POST['try-pay'])){
    if (!isset($_SESSION['selected'])) {
        $err = 'Brak sesji';
    }else{
        if ($_SESSION['shop_count']) {

            if( !$err ) {

                $_SESSION['transport'] = $_POST['platnosc'];

                $user_id = $_SESSION['user'];
                $transport = $_POST['platnosc'];
                $is_order = true;
                $order_id = join('', explode('.', microtime(true)));
                $send_date = null;
                $paid_date = null;
                $order_date = date('Y-m-d\TH:i:s');
                $price = $_SESSION['shop_price'];
                $order_count = $_SESSION['shop_count'];

                $usr_data = $_SESSION["userInformation"][0];

                $name = $usr_data['user_name'];
                $surname = $usr_data['surname'];
                $street = $usr_data['street'];
                $house_nr = $usr_data['house_nr'];
                $city = $usr_data['city'];
                $postcode = $usr_data['postcode'];
                $user_email = $usr_data['email'];

                $_SESSION['total_order_nr'] = $order_id;
                $_SESSION['total_order_nr'] = substr($_SESSION['total_order_nr'], -8);
                $order_total_nr = $_SESSION["total_order_nr"];

                $_SESSION['pay_unid'] = md5(join('', explode('.', microtime(true))));
                $pay_id = $_SESSION['pay_unid'];

                $stmt = $pdo -> query("INSERT INTO orders(user_id,transport, is_order, order_id, send_date, paid_date, order_date, price, order_count, user_name, user_surname, user_street, user_house, user_city, user_postcode, user_email, order_number, pay_id) VALUES('$user_id','$transport','$is_order','$order_id','$send_date','$paid_date','$order_date','$price','$order_count','$name','$surname','$street','$house_nr','$city','$postcode','$user_email','$order_total_nr','$pay_id')");

                if ($stmt) {
                    $succesItem = true;

                    for($i = 0; $i<count($_SESSION['selected']); $i++){

                        $itemInside = $_SESSION['selected'][$i];

                        $size_name = $itemInside[1];
                        $color_name = $itemInside[3];
                        $count_nr = $itemInside[5];
                        $type_name = $itemInside[6];

                        $stmt = $pdo -> query("INSERT INTO orders_items(order_id,size_name, color_name, count_nr, type_name) VALUES('$order_id','$size_name','$color_name','$count_nr','$type_name')");

                        if (!$stmt) {
                            $succesItem = false;
                        }
                    }

                    $succes = $succesItem;

                    if($succes){
                        $_SESSION["userInformation"] = $_SESSION["userInformation"][0];

                        include "../parts/_sendMailUser.php";
                        include "../parts/_sendMailAutor.php";

                        if($transport == 16){
                            $pay_succes = true;
                        }else{
                            $_SESSION['selected'] = null;
                            $_SESSION['shop_count'] = 0;
                            $_SESSION['shop_price'] = 0;
                        }
                    }
                } else {
                    $err = "Coś poszło nie tak, spróbuj poźniej";
                }

            }
            $sucess = true;
        }else{
            $err = 'Brak produktów';
        }
    }
}

$arr = array(
    'success'=> $succes,
    'pay_succes'=> $pay_succes,
    'error'=> $err
);

echo json_encode($arr);
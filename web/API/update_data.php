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

if ($_SESSION['logged'] && $_SESSION['user']) {
    if( isset($_POST['update-data']) ){
        $name = checkData($_POST['name']);
        $surname = checkData($_POST['surname']);
        $street = checkData($_POST['street']);
        $house_number = checkData($_POST['house_nr']);
        $city = checkData($_POST['city']);
        $postcode = checkData($_POST['postcode']);
        $user_id = $_SESSION["user"];

        if($prefer_size == ''){
            $prefer_size = 0;
        }

        $arr = array(
            'success'=> $user_id,
            'a'=> $name,
            'b'=> $surname,
            'c'=> $street,
            'd'=> $house_number,
            'e'=> $city,
            'f'=> $postcode,
            'g'=> $user_id,
            'logged'=> $_SESSION['logged']
        );

        echo json_encode($arr);

        $stmt = $pdo -> query("UPDATE users SET user_name='$name', surname='$surname', street='$street', house_nr='$house_number', city='$city', postcode='$postcode' WHERE id=$user_id");

        //$stmt = $pdo -> query("UPDATE users(name, surname, street, house_nr, city, postcode) VALUES('$name','$surname','$street','$house_number','$city','$postcode') WHERE id=$user_id");

        //$result = $stmt->fetch();
    }
}
<?php
session_start();
if( isset($_SESSION['user'])!="" ){
    $arr = array(
        'error' => 1100,
        'succes' => false,
        'error_msg'=>'Jestes zalogowany na innym koncie'
    );

    echo json_encode($arr);
    exit;
}
include_once '../protected/dbconnect.php';

$error = false;
$succes = false;
$errMSG = '';
$succes2 = false;

if ( isset($_POST['try-register']) ) {

    function checkData($input){
        $output = trim($input);
        $output = strip_tags($output);
        $output = htmlspecialchars($output);
        return $output;
    }


    $email = checkData($_POST['email']);
    $pass = checkData($_POST['pass']);
    $name = checkData($_POST['name']);
    $surname = checkData($_POST['surname']);
    $street = checkData($_POST['street']);
    $house_nr = checkData($_POST['house_nr']);
    $city = checkData($_POST['city']);
    $postcode = checkData($_POST['postcode']);

    //basic email validation
    $stmt = $pdo -> query("SELECT email FROM users WHERE email='$email'");
    $result = $stmt->fetchAll();
    if(count($result)!=0){
        $error = 1001;
        $errMSG = "Podany email jest już uzywany w systemie";
    }

    // password validation
    if (empty($pass)){
        $error = 1002;
        $errMSG = "Proszę podać hasło";
    } else if(strlen($pass) < 6) {
        $error = 1003;
        $errMSG = "Hasło musi mieć conajmniej 6 znaków";
    }

    // password encrypt using SHA256();
    $password = hash('sha256', $pass);

    // if there's no error, continue to signup
    //$stmt = null;

    if( !$error ) {
        $stmt = $pdo -> query("INSERT INTO users(email,pass,user_name, surname, street, house_nr, city, postcode) VALUES('$email','$password','$name','$surname','$street','$house_nr','$city','$postcode')");
        if ($stmt) {
            $errMSG = "Zarejestrowano poprawnie";
            $succes = true;

            $stmt = $pdo ->query("SELECT * FROM users WHERE email='$email'");
            $userArr = $stmt->fetchAll();

            $_SESSION['logged'] = true;
            $_SESSION['user'] = $userArr[0]['id'];

            unset($email);
            unset($pass);
        } else {
            $error = 1004;
            $errMSG = "Coś poszło nie tak, spróbuj poźniej";
        }

    }

    $arr = array(
        'error' => $error,
        'succes' => $succes,
        'error_msg'=>$errMSG
    );

    echo json_encode($arr);
}
?>
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

if ( isset($_POST['try-register']) ) {

    // clean user inputs to prevent sql injections
    $email = trim($_POST['email']);
    $email = strip_tags($email);
    $email = htmlspecialchars($email);

    $pass = trim($_POST['pass']);
    $pass = strip_tags($pass);
    $pass = htmlspecialchars($pass);

    //basic email validation
    if ( !filter_var($email,FILTER_VALIDATE_EMAIL) ) {
        $error = 1000;
        $errMSG = "Please enter valid email address.";
    } else {
        $stmt = $pdo -> query("SELECT userEmail FROM users WHERE userEmail='$email'");
        $result = $stmt->fetchAll();
        if(count($result)!=0){
            $error = 1001;
            $errMSG = "Podany email jest już uzywany w systemie";
        }
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
    if( !$error ) {
        $stmt = $pdo -> query("INSERT INTO users(userEmail,userPass) VALUES('$email','$password')");
        if ($stmt) {

            print_r($stmt);

            $errMSG = "Zarejestrowano poprawnie";
            $succes = true;
            //$_SESSION['user'] = $resultItem['userId'];
            $_SESSION['logged'] = true;
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
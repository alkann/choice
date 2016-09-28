<?php
session_start();
include_once '../protected/dbconnect.php';

// it will never let you open index(login) page if session is set
if ( isset($_SESSION['user'])!="" ) {
    //header("Location: home.php");
    echo json_encode(array('logged' => true));
    exit;
}

$error = false;
$errMSG ='';
$succes = false;
$_SESSION['logged'] = false;
$_SESSION['user'] = null;

if( isset($_POST['try-login']) ) {

    // prevent sql injections/ clear user invalid inputs
    $email = trim($_POST['email']);
    $email = strip_tags($email);
    $email = htmlspecialchars($email);

    $pass = trim($_POST['pass']);
    $pass = strip_tags($pass);
    $pass = htmlspecialchars($pass);
    // prevent sql injections / clear user invalid inputs

    if(empty($email)){
        $error = 999;
        $errMSG = "Prosze podac adres email";
    } else if ( !filter_var($email,FILTER_VALIDATE_EMAIL) ) {
        $error = 1000;
        $errMSG = "Please enter valid email address.";
    }

    if(empty($pass)){
        $error = 1002;
        $errMSG = "Prosze podac hasło";
    }

    // if there's no error, continue to login
    if (!$error) {

        $password = hash('sha256', $pass); // password hashing using SHA256

        $stmt = $pdo -> query("SELECT id, pass FROM users WHERE email='$email'");
        $result = $stmt->fetchAll();
        $resultItem = $result[0];

        if( count($result) == 1 && $resultItem['pass']==$password ) {
            $succes = true;
            $error = false;
            $errMSG = "";
            $_SESSION['user'] = $resultItem['id'];
            $_SESSION['logged'] = true;

            if(isset($_POST['opened'])){
                $_SESSION['opened'] = true;
            }


        } else {
            $succes = false;
            $error = 1004;
            $errMSG = "Coś poszło nie tak, spróbuj poźniej";
        }

    }

    $arr = array(
        'succes' => $succes,
        'error' => $error,
        'error_msg'=>$errMSG,
        'user'=> $_SESSION['user'],
        'logged'=> $_SESSION['logged']
    );

    echo json_encode($arr);
}
?>
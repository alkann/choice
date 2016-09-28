<?php
session_start();
if (isset($_POST['try-logout'])) {
    unset($_SESSION['user']);
    unset($_SESSION['logged']);

    $arr = array(
        'user'=> null,
        'logged'=> false
    );
    echo json_encode($arr);

    session_unset();
    session_destroy();
    exit;
}
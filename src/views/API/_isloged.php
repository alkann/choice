<?php
session_start();
if (isset($_POST['islogged'])) {

    $arr = null;

    if (!isset($_SESSION['logged'])) {
        $arr = array(
            'user'=> null,
            'logged'=> false
        );
    } else if(isset($_SESSION['logged'])!="") {
        $arr = array(
            'user'=> $_SESSION['user'],
            'logged'=> $_SESSION['logged']
        );
    }

    echo json_encode($arr);
}
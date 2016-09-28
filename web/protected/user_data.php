<?php
if(isset($_SESSION["user"])){
    $user_id = $_SESSION["user"];
    $stmt = $pdo -> query("SELECT * FROM users WHERE id=$user_id LIMIT 1");
    $_SESSION["userInformation"]= $stmt->fetchAll();
}
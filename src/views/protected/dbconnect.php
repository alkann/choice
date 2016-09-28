<?php
//$servername = "127.0.0.1";
//$username = "root";
//$password = "";
//$db_name = "choice_db";

$username = "21271385_0000003";
$password = "s3C70_5WtXBZ";
$db_name = "21271385_0000003";

$DIR = 'http://choice.local/';

try
{
    $pdo = new PDO('mysql:host='.$servername.';dbname='.$db_name, $username, $password);
}
catch(PDOException $e)
{
    echo 'Połączenie nie mogło zostać utworzone: ' . $e->getMessage();
}
?>
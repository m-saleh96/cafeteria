<?php
require_once 'vendor/autoload.php';

use Dcblogdev\PdoWrapper\Database;

// make a connection to mysql here
$options = [
    //required
    'username' => 'root',
    'database' => 'cafeteria',
    //optional
    'password' => '',
    'type' => 'mysql',
    'charset' => 'utf8',
    'host' => 'localhost',
    'port' => '3307'
];

$db = new Database($options);

?>
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
    'port' => '3306'
];

$db = new Database($options);




//create category table
try {
    $conn = new PDO("mysql:host=localhost;dbname=cafeteria", "root", "");
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "CREATE TABLE IF NOT EXISTS category (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL)";


$conn->exec($sql);
} catch(PDOException $e) {
echo "Error creating table: " . $e->getMessage();
}


$conn = null;
?>
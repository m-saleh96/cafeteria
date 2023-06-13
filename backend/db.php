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
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE TABLE IF NOT EXISTS category (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL)";


    $conn->exec($sql);
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}

// create orders table
try {
    $conn = new PDO("mysql:host=localhost;dbname=cafeteria", "root", "");

    // Create the "orders" table
    $sqlOrders = "
CREATE TABLE IF NOT EXISTS orders (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    total_price INT(11) NOT NULL,
    room_no INT(11) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
";

    // Create the "order_items" table
    $sqlOrderItems = "
    CREATE TABLE IF NOT EXISTS order_items (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        order_id INT(11) UNSIGNED NOT NULL,
        product_id INT(11) NOT NULL,
        quantity INT(11) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
        foreign key (order_id)  references orders(id) on delete cascade
        );
    
";

    // Execute the queries to create the tables
    $conn->exec($sqlOrders);
    $conn->exec($sqlOrderItems);


} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}






//create category table
try {
    $conn = new PDO("mysql:host=localhost;dbname=cafeteria", "root", "");
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "CREATE TABLE IF NOT EXISTS users(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Email VARCHAR(255) NOT NULL Unique,
    Password VARCHAR(50) NOT NULL,
    Room_No	INT(11) NOT NULL,
    Ext INT(11) NOT NULL,
    Is_admin BOOLEAN NOT NULL,
    picture VARCHAR(255) NOT NULL)";


$conn->exec($sql);
} catch(PDOException $e) {
echo "Error creating table: " . $e->getMessage();
}







$conn = null;
?>
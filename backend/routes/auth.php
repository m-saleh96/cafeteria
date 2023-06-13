<?php
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'controller/AuthController.php';
require('vendor/autoload.php');



$AuthController = new AuthController();
$url = explode("/",$_SERVER['QUERY_STRING']);

if($url[0] == 'login' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');   
    $respones = $AuthController->login($_POST['Email'],$_POST['password']);
    echo json_encode($respones);
}
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
    $respones = file_get_contents('php://input');
    $respones= json_decode($respones, true);
    $respones = $AuthController->login($respones['Email'],$respones['password'] );
    // echo json_encode($respones['Email'].$respones['password'] );
    echo json_encode($respones);
}

if($url[0] == 'repassword' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');   
    $respones = $AuthController->resetPassword($_POST['Email'],$_POST['password']);
    echo json_encode($respones);
}

if($url[0] == 'sendEmail' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');   
    $respones = $AuthController->sendEmail($_POST['Email']);
    // echo json_encode($respones);
}
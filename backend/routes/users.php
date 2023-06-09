<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



require_once 'controller/usersConroller.php';
$usersController = new usersController();
require_once 'middleware/validation.php';
$url = explode("/",$_SERVER['QUERY_STRING']);
if($url[0] == 'users' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($url[1])&& !empty($url[1])) {
        $id = $url[1];
        $users = $usersController->getuser($id);
        echo json_encode($users);
        echo json_encode($id);
        exit;
    }else{
    $users = $usersController->getAllusers();
    echo json_encode($users);
    // echo json_encode("return all users");
    exit;   
    }
}




else if($url[0] == 'users'  && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $user = [];
    if($_SERVER['CONTENT_TYPE'] == 'application/json') {
        $data = file_get_contents("php://input");
        $products = json_decode($data, true);
    } 
//     // 1	id  	Name		Email 	Password		Room_No		Ext	picture

    else {
    $target = "./images/";
    $user_Name = $_POST['Name'];
    $user_Email = $_POST['Email'];
    $user_Password = $_POST['Password'];
    $user_Room_No = $_POST['Room_No'];
    $user_Ext = $_POST['Ext'];
    $image = $_FILES['picture']['name'];
    $image = time().'_'.$image;
    $user = [
            "Name" => $user_Name,
            "Email" => $user_Email,
            "Password" => $user_Password,
            "Room_No" => $user_Room_No,
            "Ext" => $user_Ext,
            "picture" =>$image ,
    ];       
move_uploaded_file($_FILES['picture']['tmp_name'],$target.$image);
}
    if ( !isset($url[1])){$users = $usersController->createuser($user);      echo json_encode( $users);  }// for create new user
    else{ $users = $usersController->updateuser($url[1],$user);  echo json_encode( $users);}//for update user

    // if ( !isset($url[1])){ validate($_POST) ;echo json_encode( $_POST);  }// for create new user
    // else{ $users = $usersController->updateuser($url[1],$user);  echo json_encode( $users);}//for update user
}





else if($url[0]=="users" && $_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($url[1])){
    $id = $url[1];
    $users = $usersController->deleteuser($id);
    echo json_encode($users);
}


?>



















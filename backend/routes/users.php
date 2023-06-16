<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
use Rakit\Validation\Validator;



require_once 'controller/usersConroller.php';
$usersController = new usersController();
require_once 'middleware/validation.php';
$url = explode("/",$_SERVER['QUERY_STRING']);
if($url[0] == 'users' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($url[1])&& !empty($url[1])) {
        $id = $url[1];
        $users = $usersController->getuser($id);
        echo json_encode($users);
        // echo json_encode($id);
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
    } 
//     // 1	id  	Name		Email 	Password		Room_No		Ext	picture  Is_admin
 
    else {

        $validator = new Validator;
        $validation = $validator->make($_POST + $_FILES, [
            'Name'                  => 'required',
            'Email'                 => 'required|email',
            'Password'           => 'required|min:8',
            'Room_No'           => 'required|numeric',
            'Ext'           => 'required|numeric',
            'picture'               => 'required|uploaded_file:0,500000K,png,jpeg',
        ]);
        $validation->validate();
        if ($validation->fails()) {
            http_response_code(422);
            $errors = $validation->errors();
           echo json_encode($errors->firstOfAll());
           exit();
        }         

    $target = "./images/";
    // $user_Name = $_POST['Name'];
    // $user_Email = $_POST['Email'];
    // $user_Password = $_POST['Password'];
    // $user_Room_No = $_POST['Room_No'];
    // $user_Ext = $_POST['Ext'];
    $image = $_FILES['picture']['name'];
    $image = time().'_'.$image;


    $user = [
        "Name" =>  $_POST['Name'],
        "Email" => $_POST['Email'],
        "Password" =>  $_POST['Password'],
        "Room_No" => $_POST['Room_No'],
        "Ext" =>$_POST['Ext'],
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



















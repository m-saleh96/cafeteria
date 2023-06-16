<?php
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'controller/OrdersController.php';
require('vendor/autoload.php');

use Rakit\Validation\Validator;
// use AuthController;
include_once 'controller/AuthController.php';


$ordersController = new OrdersController();
$url = explode("/", $_SERVER['QUERY_STRING']);


if ($url[0] == 'orders' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($url[1])) {
        $id = $url[1];
        $orders = $ordersController->getOrder($id);
        if (!$orders) {
            http_response_code(404);
            echo json_encode(["error" => "No orders found with this id"]);
            exit;
        }
        echo json_encode($orders);
    } else {
        $orders = $ordersController->getAllOrders();
        echo json_encode($orders);
    }

} else if ($url[0] == 'orders' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $orders = file_get_contents('php://input');
    $orders = json_decode($orders, true);
    $validator = new Validator;
    $orders['status'] = 'processing';
    $validation = $validator->make($orders, [
        'user_id' => 'required',
        'products' => 'required|array|min:1',
        'products.*.product_id' => 'required',
        'products.*.quantity' => 'required',
        'total_price' => 'required',
        'room_no' => 'required'
    ]);
    $validation->validate();

    if ($validation->fails()) {
        http_response_code(422);
        $errors = $validation->errors();
        echo json_encode($errors->firstOfAll());
    } else {
      
       try {
        $orders = $ordersController->createOrder($orders);
        if (!$orders) {
            http_response_code(500);
            echo json_encode(["error" => "Error while creating order"]);
            exit;
        }
        echo json_encode("order created successfully");
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    }

















}else if ($url[0] == 'order_Status' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
        $validator = new Validator;
        header('Access-Control-Allow-Methods: POST');   
        $respones = file_get_contents('php://input');
        $respones= json_decode($respones, true);

        $auth =New AuthController();
    //    $data= 
    $is_admin=$auth->is_admin($respones['Token']);
        if($is_admin=="admin"){
                $validation = $validator->make($respones, [
                    'id' => 'required|numeric',
                    'Stutes'=>'required'
                ]);
                  $validation->validate();
    
                if ($validation->fails()) {
                http_response_code(422);
                $errors = $validation->errors();
                echo json_encode($errors->firstOfAll());
                }
            else {
            try {
                    $res = $ordersController->updateStatus($respones['id'],$respones['Stutes']);
                    if (!$res) {
                        http_response_code(500);
                        echo json_encode(["error" => "Error while update order"]);
                        exit;
                    }
                    echo json_encode("order upadte statues  successfully");
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
                }
            }
  
        }



        elseif($is_admin=="not_admin"){
            echo json_encode("plz login is admin");


        }
        else{
            echo json_encode("this token is  invalid");
        }

    }




    else if ($url[0] == 'order_cancel' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
        $validator = new Validator;
        header('Access-Control-Allow-Methods: POST');   
        $respones = file_get_contents('php://input');
        $respones= json_decode($respones, true);

        $auth =New AuthController();
    $cheek_token=$auth->validatio_token($respones['Token']);
        if($cheek_token!="this token is  invalid"){
                $validation = $validator->make($respones, [
                    'order_id' => 'required|numeric',
                ]);
                  $validation->validate();
                if ($validation->fails()) {
                http_response_code(422);
                $errors = $validation->errors();
                echo json_encode($errors->firstOfAll());
                }
                else {
                // echo json_encode($cheek_token);
            try {
                if($cheek_token['admin']==0){
                    $res = $ordersController->cansel_order($respones['order_id'],$cheek_token);
                }else{
                    $res = $ordersController->deleteOrder($respones['order_id']);

                }
                    if (!$res) {
                        http_response_code(500);
                        echo json_encode(["error" => "no permision to delete or no order to deleted"]);
                        exit;
                    }
                 echo json_encode("delet ordersecusses"); 
                }
                 catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
                }
                }
  
        }
        else{
            echo json_encode("this token is  invalid");
        }       









    }else if ($url[0] == 'order_cansel' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
            $validator = new Validator;
            header('Access-Control-Allow-Methods: POST');   
            $respones = file_get_contents('php://input');
            $respones= json_decode($respones, true);
            $res = $ordersController->getOrder($respones['order_id']);
            if($res='{status: processing}'){

            $res = $ordersController->deleteitem($respones['item_id']);
            if($res){
                echo json_encode("delete item seccessively");
            }
            else{
                echo json_encode("delete item failed because no item id found");
            }
            
            }
            else{
                echo json_encode("statues not processing");

            }
            

    }else if ($url[0] == 'orders' && isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $id = $url[1];
    $orders = file_get_contents('php://input');
    $orders = json_decode($orders, true);
    $validator = new Validator;
    $orders['status'] = 'processing';
    $validation = $validator->make($orders, [
        'user_id' => 'required',
        'products' => 'required|array|min:1',
        'products.*.product_id' => 'required',
        'products.*.quantity' => 'required',
        'total_price' => 'required',
        'room_no' => 'required'
    ]);
    $validation->validate();

    if ($validation->fails()) {
        http_response_code(422);
        $errors = $validation->errors();
        echo json_encode($errors->firstOfAll());
    } else {
        try {
            $orders = $ordersController->updateOrder($id, $orders);
        if ($orders == false) {
            echo "Aa";
            http_response_code(404);
            echo json_encode(["error" => "No order found with this id"]);
            exit;
        }
        echo json_encode("orders updated successfully");

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
       
    }
} 










else if ($url[0] == "order" && $_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($url[1])) {
    header('Access-Control-Allow-Methods: DELETE');
    $id = $url[1];
    $orders = $ordersController->deleteOrder($id);
    if (!$orders) {
        http_response_code(404);
        echo json_encode(["error" => "No order found with this id"]);
        exit;
    }
    echo json_encode("order deleted successfully");
}


?>
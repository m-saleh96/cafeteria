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

} else if ($url[0] == 'orders' && isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
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
} else if ($url[0] == "order" && $_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($url[1])) {
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
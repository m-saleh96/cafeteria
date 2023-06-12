<?php
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'controller/CategoryController.php';
require('vendor/autoload.php');

use Rakit\Validation\Validator;

$CategoryController = new CategoryController();
$url = explode("/", $_SERVER['QUERY_STRING']);


if ($url[0] == 'categories' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($url[1])) {
        $id = $url[1];
        $categories = $CategoryController->getCategory($id);
        if (!$categories) {
            http_response_code(404);
            echo json_encode(["error" => "No products found in this category"]);
            exit;
        }
        echo json_encode($categories);
    } else {
        $categories = $CategoryController->getAllCategories();
        echo json_encode($categories);
    }

} else if ($url[0] == 'categories' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $validator = new Validator;
    $validation = $validator->make($_POST, [
        'name' => 'required',
    ]);
    $validation->validate();

    if ($validation->fails()) {
        http_response_code(422);
        $errors = $validation->errors();
        echo json_encode($errors->firstOfAll());
    } else {
        $cat_name = $_POST['name'];
        $categories = ["name" => $cat_name];
        $categories = $CategoryController->createCategory($categories);
        if (!$categories) {
            http_response_code(500);
            echo json_encode(["error" => "Error while creating category"]);
            exit;
        }
        echo json_encode("Category created successfully");
    }

} else if ($url[0] == 'categories' && isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $id = $url[1];
    $validator = new Validator;
    $validation = $validator->make($_POST, [
        'name' => 'required',
    ]);
    $validation->validate();

    if ($validation->fails()) {
        http_response_code(422);
        $errors = $validation->errors();
        echo json_encode($errors->firstOfAll());
    } else {
        $cat_name = $_POST['name'];
        $categories = ["name" => $cat_name];
        $categories = $CategoryController->updateCategory($id, $categories);
        if ($categories == false) {
            http_response_code(404);
            echo json_encode(["error" => "No category found with this id"]);
            exit;
        }
        echo json_encode("Category updated successfully");

    }
} else if ($url[0] == "category" && $_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($url[1])) {
    header('Access-Control-Allow-Methods: DELETE');
    $id = $url[1];
    $categories = $CategoryController->deleteCategory($id);
    if (!$categories) {
        http_response_code(404);
        echo json_encode(["error" => "No category found with this id"]);
        exit;
    }
    echo json_encode("category deleted successfully");
}


?>
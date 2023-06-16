<?php
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'controller/ProductsConroller.php';
require('vendor/autoload.php');

use Rakit\Validation\Validator;

$productsController = new ProductsController();
$url = explode("/",$_SERVER['QUERY_STRING']);


if($url[0] == 'products' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    // $productsController = new ProductsController();
  $productsController->getAllProducts();
    // var_dump($products);
    // echo json_encode($products);
}


else if($url[0] == 'products' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');   
$validator = new Validator;
$validation = $validator->make($_POST + $_FILES, [
    'name'                  => 'required',
    'price'                 => 'required|numeric',
    'description'           => 'required',
    'picture'               => 'required|uploaded_file:0,500000K,png,jpeg',
    'category_id'           => 'required|numeric',
]);
$validation->validate();

if ($validation->fails()) {
    http_response_code(422);
    $errors = $validation->errors();
   echo json_encode($errors->firstOfAll());
} else {
    $products = [];
    $product_name = $_POST['name'];
    $product_price = $_POST['price'];
    $product_description = $_POST['description'];
    $product_image = $_FILES['picture']['name'];
    $category_id = $_POST['category_id'];
    $products = [
            "name" => $product_name,
            "price" => $product_price,
            "description" => $product_description,
            "picture" => $product_image,
            "category_id" => $category_id
    ];   

    $products = $productsController->createProduct($products);
     echo json_encode($products);
}
   
}
else if($url[0]=='product' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    if(!isset($url[1])) {
        echo json_encode(["error" => "No id provided"]);
        exit;
    }
    $id = $url[1];
    $products = $productsController->getProduct($id);
    if(!$products) {
        http_response_code(404);
        echo json_encode(["error" => "No product found with this id"]);
        exit;
    }
    echo json_encode($products);
}
else if ($url[0] == 'products' && isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $id = $url[1];
    $products = [];
    $validator = new Validator;
    // var_dump($_POST['picture']);
    // if(!empty($_POST['picture'])){
    //     echo "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    // }
    // exit;
        // Check if the image is a file or a string representation
    $pic_updated = false;
if (isset($_FILES['picture'])) {
    // echo "1";
    $rules['picture'] = 'required|uploaded_file:0,500K,png,jpeg';
    $pic_updated = true;
} else if (!empty($_POST['picture'])) {
    echo "2";
    $pic_updated =false;
    
} else {
    
    // Image is not provided or empty
    // Handle this case based on your application's requirements
}
// exit;
$rules=[
    'name'                  => 'required',
    'price'                 => 'required|numeric',
    'description'           => 'required',
    // 'picture'               => 'required|uploaded_file:0,500K,png,jpeg',
    'category_id'           => 'required|numeric',
];
$validation = $validator->make($_POST + $_FILES, $rules);
$validation->validate();

if ($validation->fails()) {
    http_response_code(422);
    $errors = $validation->errors();
   echo json_encode($errors->firstOfAll());
} else {
    $product_name = $_POST['name'];
    $product_price = $_POST['price'];
    $product_description = $_POST['description'];
    $category_id = $_POST['category_id'];
    if($pic_updated){
        $product_image = $_FILES['picture']['name'];
        $products['picture'] = $product_image;
        $products = [
            "name" => $product_name,
            "price" => $product_price,
            "description" => $product_description,
            "picture" => $product_image,
            "category_id" => $category_id
    ];  
    }else{
        // $product_image = $_POST['picture'];
        $products = [
            "name" => $product_name,
            "price" => $product_price,
            "description" => $product_description,
            // "picture" => $product_image,
            "category_id" => $category_id
    ]; 
    }
   
   
    $products = $productsController->updateProduct($id,$products,$pic_updated);
     echo json_encode($products);

}
}
else if($url[0]=="product" && $_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($url[1])){
    header('Access-Control-Allow-Methods: DELETE');
    $id = $url[1];
    $products = $productsController->deleteProduct($id);
    if(!$products) {
        http_response_code(404);
        echo json_encode(["error" => "No product found with this id"]);
        exit;
    }
    echo json_encode("Product deleted successfully");
}


?>
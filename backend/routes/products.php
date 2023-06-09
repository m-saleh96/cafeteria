<?php
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: Aplication/json');
header('Content-Type: Aplication/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'controller/ProductsConroller.php';
$productsController = new ProductsController();
$url = explode("/",$_SERVER['QUERY_STRING']);


if($url[0] == 'products' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    // $productsController = new ProductsController();
    $products = $productsController->getAllProducts();
    echo json_encode($products);
}
else if($url[0] == 'products' && !isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    // echo "jj";
    header('Access-Control-Allow-Methods: POST');
    $products = [];
    if($_SERVER['CONTENT_TYPE'] == 'application/json') {
        $data = file_get_contents("php://input");
        $products = json_decode($data, true);
       
    } else {
    
    $product_name = $_POST['name'];
    $product_price = $_POST['price'];
    $product_description = $_POST['description'];
    $product_image = $_POST['picture'];
    $category_id = $_POST['category_id'];
    $products = [
            "name" => $product_name,
            "price" => $product_price,
            "description" => $product_description,
            "picture" => $product_image,
            "category_id" => $category_id
    ];   

}
    // $products = $productsController->createProduct($products);
    //  echo json_encode($products);
     echo json_encode("dbn,");
   
}
else if($url[0]=='product' && $_SERVER['REQUEST_METHOD'] == 'GET') {
    if(!isset($url[1])) {
        echo json_encode(["error" => "No id provided"]);
        exit;
    }
    $id = $url[1];
    $products = $productsController->getProduct($id);
    echo json_encode($products);
}
else if ($url[0] == 'products' && isset($url[1]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: POST');
    $id = $url[1];
    $products = [];
    if($_SERVER['CONTENT_TYPE'] == 'application/json') {
        $data = file_get_contents("php://input");
        $products = json_decode($data, true);
       
    } else {
    
    $product_name = $_POST['name'];
    $product_price = $_POST['price'];
    $product_description = $_POST['description'];
    $product_image = $_POST['picture'];
    $category_id = $_POST['category_id'];
    $products = [
            "name" => $product_name,
            "price" => $product_price,
            "description" => $product_description,
            "picture" => $product_image,
            "category_id" => $category_id
    ];   

}
    $products = $productsController->updateProduct($id,$products);
     echo json_encode($products);

}
else if($url[0]=="product" && $_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($url[1])){
    $id = $url[1];
    $products = $productsController->deleteProduct($id);
    echo json_encode($products);
}


?>
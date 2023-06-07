<?php
require_once('db.php');

class ProductsController {
    public function getAllProducts() {
        global $db;
        $products = $db->rows("SELECT * FROM products");
        return $products;
    }

    public function createProduct($data) {
        global $db;
        $products = $db->insert("products", $data);
         return $db->rows("SELECT * FROM products WHERE id = ?", [$products]);
    }

    public function getProduct($id) {
        global $db;
        $products = $db->row("SELECT * FROM products WHERE id = ?", [$id]);
        return $products;
    }
    public function updateProduct($id, $data) {
        global $db;
        // var_dump($data);
        $Id =['id' => $id];
         $products = $db->update("products", $data, $Id);
        //  echo $products;
        //  echo $id;
        return $db->rows("SELECT * FROM products WHERE id = ?", [$id]);
    }

    public function deleteProduct($id){
    global $db;
    $id = ['id'=>$id];
    $products = $db->delete("products",$id);
    return $products;
    }
}

?>
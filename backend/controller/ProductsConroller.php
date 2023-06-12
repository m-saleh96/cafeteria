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
        $target_dir = "images/";
        $image_name = time()."_".basename($_FILES["picture"]["name"]);
        $target_file = $target_dir . basename($image_name);
         move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);
         $data['picture'] = $target_file;
        $products = $db->insert("products", $data);
         return $db->rows("SELECT * FROM products WHERE id = ?", [$products]);
    }

    public function getProduct($id) {
        global $db;
        $products = $db->row("SELECT * FROM products WHERE id = ?", [$id]);
        return $products;
    }
    public function updateProduct($id, $data,$pic_updated) {
        global $db;
        $Id =['id' => $id];

       if($pic_updated){
        $target_dir = "images/";
        $image_name = time()."_".basename($_FILES["picture"]["name"]);
        $target_file = $target_dir . basename($image_name);
         move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);
         $data['picture'] = $target_file;
       }
         $products = $db->update("products", $data, $Id);
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
<?php
require_once('db.php');


class CategoryController {
    public function getAllCategories() {
        global $db;
        $products = $db->rows("SELECT * FROM category");
        return $products;
    }

    public function createCategory($data) {
        global $db;        
       return $products = $db->insert("category", $data);
        // return $db->rows("SELECT * FROM category WHERE id = ?", [$products]);
    }

    public function getCategory($id) {
        global $db;
        $products = $db->row("SELECT * FROM category WHERE id = ?", [$id]);
        return $products;
    }
    public function updateCategory($id, $data) {
        global $db;
        $Id =['id' => $id];
        return $categories = $db->update("category", $data, $Id);
        // return $db->rows("SELECT * FROM products WHERE id = ?", [$id]);
    }

    public function deleteCategory($id){
    global $db;
    $id = ['id'=>$id];
    $products = $db->delete("category",$id);
    return $products;
    }
}

?>
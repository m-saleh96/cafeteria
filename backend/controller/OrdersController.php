<?php
require_once('db.php');


class OrdersController {
    public function getAllOrders() {
        global $db;
        // $orders = $db->rows("SELECT * FROM orders");
        // return $orders;
        $query = "SELECT o.*, oi.product_id, oi.quantity
          FROM orders AS o
          JOIN order_items AS oi ON o.id = oi.order_id";
        $orders = $db->rows($query);
        return $orders;
    }

    public function createOrder($data) {
        global $db;        
        $orderId = $db->insert("orders", [
            "user_id" => $data['user_id'],
            "total_price" => $data['total_price'],
            "room_no" => $data['room_no'],
            "status" => $data['status']
        ]);
    
        if ($orderId) {
            foreach ($data['products'] as $product) {
                $db->insert("order_items", [
                    "order_id" => $orderId,
                    "product_id" => $product['product_id'],
                    "quantity" => $product['quantity']
                ]);
            }
            return true; 
        } else {
            return false; 
        }
    }

    public function getOrder($id) {
        global $db;
        $orders = $db->row("SELECT * FROM orders WHERE id = ?", [$id]);
        return $orders;
    }
    public function updateOrder($id, $data) {
        global $db;
        $Id =['id' => $id];
        return $orders = $db->update("orders", $data, $Id);
        // return $db->rows("SELECT * FROM products WHERE id = ?", [$id]);
    }

    public function deleteOrder($id){
    global $db;
    $id = ['id'=>$id];
    $orders = $db->delete("orders",$id);
    return $orders;
    }
}

?>
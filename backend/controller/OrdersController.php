<?php
require_once('db.php');


class OrdersController {
    public function getAllOrders() {
        global $db;
        // $orders = $db->rows("SELECT * FROM orders");
        // return $orders;
        $query = "SELECT  
        oi.order_id,oi.quantity, p.name,p.description,p.price,p.picture,
        o.room_no,o.status,o.created_at,
        u.name as user_name 
        FROM orders AS o
        JOIN order_items AS oi ON o.id = oi.order_id
        join users as u on o.user_id = u.id
        JOIN products AS p ON oi.product_id = p.id";
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
        $query = "SELECT  
        oi.order_id,oi.quantity, p.name,p.description,p.price,p.picture,
        o.room_no,o.status,o.created_at
        FROM orders AS o
        JOIN order_items AS oi ON o.id = oi.order_id
        join users as u on o.user_id = u.id
        JOIN products AS p ON oi.product_id = p.id Where o.user_id = $id";
        $orders = $db->rows($query);
        return $orders;
    }
    public function updateOrder($id, $data) {
        global $db;
        $orderData = [
            "user_id" => $data['user_id'],
            "total_price" => $data['total_price'],
            "room_no" => $data['room_no'],
            "status" => $data['status']
        ];
        
        $id = ['id' => $id];
        // Update the main order details
        $update = $db->update("orders", $orderData, $id);
        return $update;
      
        // // Update the order items
        // if (isset($data['products'])) {
        //     foreach ($data['products'] as $product) {
        //         $itemData = [
        //             "product_id" => $product['product_id'],
        //             "quantity" => $product['quantity']
        //         ];
        //         $order_id = ['order_id' => $id];
        //         // Update or insert the order item
        //         $db->update("order_items", $itemData, $order_id);
        //     }
        // }
        
        // return true;
    }
    

    public function deleteOrder($id){
    global $db;
    $id = ['id'=>$id];
    $orders = $db->delete("orders",$id);
    return $orders;
    }
}

?>
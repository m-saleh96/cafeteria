<?php
require_once('db.php');

class usersController {
    public function getAllusers() {
        global $db;
        $users = $db->rows("SELECT * FROM users");
        return $users;
    }

    public function createuser($data) {
        global $db;
        try {
        $users = $db->insert("users", $data);
        return $db->rows("SELECT * FROM users WHERE id = ?", [$users]);            
        } catch (Exception $e) {
            //throw $th;

            return "error". $e->getMessage();
        }

    }

    public function getuser($id) {
        global $db;
        $users = $db->row("SELECT * FROM users WHERE id = ?", [$id]);
        return $users;
    }
    public function updateuser($id, $data) {
        global $db;
        // var_dump($data);
        $Id =['id' => $id];
         $users = $db->update("users", $data, $Id);
        //  echo $products;
        //  echo $id;
        return $db->rows("SELECT * FROM users WHERE id = ?", [$id]);
    }

    public function deleteuser($id){
    global $db;
    $id = ['id'=>$id];
    $users = $db->delete("users",$id);
    return $users;
    }
}

?>
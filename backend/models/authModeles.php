<?php
require_once('db.php');

class usermodel {
    // public function getAllusers() {
    //     global $db;
    //     $users = $db->rows("SELECT * FROM users");
    //     return $users;
    // }

    // public function createuser($data) {
    //     global $db;
    //     $users = $db->insert("users", $data);
    //      return $db->rows("SELECT * FROM users WHERE id = ?", [$users]);
    // }

    public function getuser($Email,$password) {
        global $db;
        $users = $db->row("SELECT * FROM users WHERE email = ? and Password = ?", [$Email,$password]);
        return $users;
    }
    
    public function updatepassword($email, $password) {
        global $db;
        $email =['Email' => $email];
         $user = $db->update("users", $password, $email);
        //  return ;
        if($user){return "update success";}
        return "no data to change";
    }

    // public function deleteuser($id){
    // global $db;
    // $id = ['id'=>$id];
    // $users = $db->delete("users",$id);
    // return $users;
    // }
}



?>
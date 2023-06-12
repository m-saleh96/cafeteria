<?php


function validate($data){
$errors = [];
// if (empty($data['Name'])) {
    // $errors[] = "Name is required";
    // }

// if ($data['Name']) {
//     $errors[] = "Name is required";
//     }


    // if (empty($data['Email'])) {
        // $errors[] = "Email is required";
    // }

    // if (empty($password)) {
    //     $errors[] = "Password is required";
    // }
    // if (empty($confirm_password)) {
    //     $errors[] = "Confirm Password is required";
    // }
    // if (empty($room)) {
    //     $errors[] = "Room is required";
    // }
    // if (empty($ext)) {
    //     $errors[] = "Ext is required";
    // }
    // if (empty($image)) {
    //     $errors[] = "Image is required";
    // }
    // if ($password != $confirm_password) {
    //     $errors[] = "Password and Confirm Password must be the same";
    // }
    

echo json_encode($errors);
echo json_encode($data);

}
?>
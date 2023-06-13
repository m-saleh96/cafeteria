<?php
require_once('db.php');
require_once('mailer.php');
use Rakit\Validation\Validator;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// include_once 'tets.php';
require_once 'models/authModeles.php';
class AuthController {

public function login($request_Email,$request_password){
    $validator = new Validator;
    $validation = $validator->validate(['email'=>$request_Email,'password'=> $request_password], [
        'email' => 'required|email',
        'password' => 'required|min:8'
    ]);

    if ($validation->fails()) {
        $errors = $validation->errors();
        return $errors->firstOfAll();
    } else {
        try{
        $auth=new usermodel();
        $user= $auth->getuser($request_Email,$request_password);
        if($user){

        
        $payload = [
            'username' => $user->Name,
            'email' => $user->Email,
            'admin' => false,
        ];
        $privateKey = <<<EOD
        -----BEGIN RSA PRIVATE KEY-----
        MIIEowIBAAKCAQEAuzWHNM5f+amCjQztc5QTfJfzCC5J4nuW+L/aOxZ4f8J3Frew
        M2c/dufrnmedsApb0By7WhaHlcqCh/ScAPyJhzkPYLae7bTVro3hok0zDITR8F6S
        JGL42JAEUk+ILkPI+DONM0+3vzk6Kvfe548tu4czCuqU8BGVOlnp6IqBHhAswNMM
        78pos/2z0CjPM4tbeXqSTTbNkXRboxjU29vSopcT51koWOgiTf3C7nJUoMWZHZI5
        HqnIhPAG9yv8HAgNk6CMk2CadVHDo4IxjxTzTTqo1SCSH2pooJl9O8at6kkRYsrZ
        WwsKlOFE2LUce7ObnXsYihStBUDoeBQlGG/BwQIDAQABAoIBAFtGaOqNKGwggn9k
        6yzr6GhZ6Wt2rh1Xpq8XUz514UBhPxD7dFRLpbzCrLVpzY80LbmVGJ9+1pJozyWc
        VKeCeUdNwbqkr240Oe7GTFmGjDoxU+5/HX/SJYPpC8JZ9oqgEA87iz+WQX9hVoP2
        oF6EB4ckDvXmk8FMwVZW2l2/kd5mrEVbDaXKxhvUDf52iVD+sGIlTif7mBgR99/b
        c3qiCnxCMmfYUnT2eh7Vv2LhCR/G9S6C3R4lA71rEyiU3KgsGfg0d82/XWXbegJW
        h3QbWNtQLxTuIvLq5aAryV3PfaHlPgdgK0ft6ocU2de2FagFka3nfVEyC7IUsNTK
        bq6nhAECgYEA7d/0DPOIaItl/8BWKyCuAHMss47j0wlGbBSHdJIiS55akMvnAG0M
        39y22Qqfzh1at9kBFeYeFIIU82ZLF3xOcE3z6pJZ4Dyvx4BYdXH77odo9uVK9s1l
        3T3BlMcqd1hvZLMS7dviyH79jZo4CXSHiKzc7pQ2YfK5eKxKqONeXuECgYEAyXlG
        vonaus/YTb1IBei9HwaccnQ/1HRn6MvfDjb7JJDIBhNClGPt6xRlzBbSZ73c2QEC
        6Fu9h36K/HZ2qcLd2bXiNyhIV7b6tVKk+0Psoj0dL9EbhsD1OsmE1nTPyAc9XZbb
        OPYxy+dpBCUA8/1U9+uiFoCa7mIbWcSQ+39gHuECgYAz82pQfct30aH4JiBrkNqP
        nJfRq05UY70uk5k1u0ikLTRoVS/hJu/d4E1Kv4hBMqYCavFSwAwnvHUo51lVCr/y
        xQOVYlsgnwBg2MX4+GjmIkqpSVCC8D7j/73MaWb746OIYZervQ8dbKahi2HbpsiG
        8AHcVSA/agxZr38qvWV54QKBgCD5TlDE8x18AuTGQ9FjxAAd7uD0kbXNz2vUYg9L
        hFL5tyL3aAAtUrUUw4xhd9IuysRhW/53dU+FsG2dXdJu6CxHjlyEpUJl2iZu/j15
        YnMzGWHIEX8+eWRDsw/+Ujtko/B7TinGcWPz3cYl4EAOiCeDUyXnqnO1btCEUU44
        DJ1BAoGBAJuPD27ErTSVtId90+M4zFPNibFP50KprVdc8CR37BE7r8vuGgNYXmnI
        RLnGP9p3pVgFCktORuYS2J/6t84I3+A17nEoB4xvhTLeAinAW/uTQOUmNicOP4Ek
        2MsLL2kHgL8bLTmvXV4FX+PXphrDKg1XxzOYn0otuoqdAQrkK4og
        -----END RSA PRIVATE KEY-----
        EOD;
        $token= JWT::encode(
            $payload,
            $privateKey,
            'RS256'
        );
        // return $this->validatio_token($token);
        return [$token,$user] ;  

    }
    else{
        return "email or password is error";
    }
}catch(Exception $e){
//     return ['code'=>-1, "data"=>"no data avilable", 'msg'=>(string)$e];

$respones="error";
return $respones;
}// if no error fuond in emaoil and password
}
}





public function validatio_token($token){

$publicKey = <<<EOD
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzWHNM5f+amCjQztc5QT
fJfzCC5J4nuW+L/aOxZ4f8J3FrewM2c/dufrnmedsApb0By7WhaHlcqCh/ScAPyJ
hzkPYLae7bTVro3hok0zDITR8F6SJGL42JAEUk+ILkPI+DONM0+3vzk6Kvfe548t
u4czCuqU8BGVOlnp6IqBHhAswNMM78pos/2z0CjPM4tbeXqSTTbNkXRboxjU29vS
opcT51koWOgiTf3C7nJUoMWZHZI5HqnIhPAG9yv8HAgNk6CMk2CadVHDo4IxjxTz
TTqo1SCSH2pooJl9O8at6kkRYsrZWwsKlOFE2LUce7ObnXsYihStBUDoeBQlGG/B
wQIDAQAB
-----END PUBLIC KEY-----
EOD;
        $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
        $decoded_array = (array) $decoded;
        
        return $decoded_array;  

}




public function sendEmail($email){
    //  $mail->setFrom('gergesvictor512@gmail.com', 'gerges');
    // $mail->addAddress('gergesvicto512@gmail.com', 'mina');
    $validator = new Validator;
    $validation = $validator->validate(['email'=>$email], [
        'email' => 'required|email'
    ]);

    if ($validation->fails()) {
        $errors = $validation->errors();
        return $errors->firstOfAll();
    } else {
        $mail= connectToMailer();
        $mail->setFrom($email, 'semon');    
        $mail->addAddress($email, 'semon');    
        
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->CharSet="UTF-8";
        $mail->Subject = 'cafateria';
        $mail->Body    = '<h1> to change password enter this number</h1><br> <strong>123456789</strong>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    }

   
    
    
    try{ $mail->send();
    return 'Message has been sent';
    } catch (Exception $e) {
    return "error happened";
    // echo " {$mail->ErrorInfo}";
    }
    
}




public function resetPassword($email,$newPassword){
    $validator = new Validator;
    $validation = $validator->validate(['email'=>$email,'password'=> $newPassword], [
        'email' => 'required|email',
        'password' => 'required|min:8'
    ]);

    if ($validation->fails()) {
        $errors = $validation->errors();
        return $errors->firstOfAll();
    } else {
        $auth=new usermodel();
        // $cat_name = $newPassword;
        $newPassword = ["Password" => $newPassword];
        $user= $auth->updatepassword($email,$newPassword);
        return $user;
        // return "dd";
    }

}


}



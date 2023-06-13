<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';



function connectToMailer(){
    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;             
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'gergesvictor512@gmail.com';                     //SMTP username
        $mail->Password   = 'tekpkgirwgjnjstn';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        $mail->addReplyTo('gergesvictor512@gmail.com', 'Information');
        $mail->addCC('gergesvictor512@gmail.com');
        $mail->addBCC('gergesvictor512@gmail.com');
    
    
    
     return $mail ;  
    
    } catch (Exception $e) {
        echo "{$mail->ErrorInfo}";
        
    }
}

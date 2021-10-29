<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);

$result = '';
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$body = '';

if (trim(!empty($name)) && trim(!empty($email)) && trim(!empty($message))) {
	$body = '<h1>Новая заявка.</h1><p><b>Имя: </b>' . $name . '</p><p><b>Почта: </b>' . $email . '</p><p><b>Сообщение: </b>' . $message .'</p>';
}

if (trim(!empty($name)) && trim(!empty($email))) {
	$body = '<h1>Новая заявка.</h1><p><b>Имя: </b>' . $name . '</p><p><b>Почта: </b>' . $email . '</p>';
}

try {
    //Server settings
		$mail->CharSet = 'UTF-8';
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '';                     //SMTP username
    $mail->Password   = '';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('', '');
    $mail->addAddress('ivanov-anton.mgn@yandex.ru');               //Name is optional

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = $body;

    $mail->send();
    $result = "sended successfully";
} catch (Exception $e) {
		$result = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

$response = ["message" => $result];

header('Content-Type: application/json');
echo json_encode($response);
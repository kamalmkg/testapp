<?php

$recipient = "kamalmkg@hotmail.com";


$name = $_POST['name'];
$name1 = ereg_replace("[^A-Za-z0-9]", " ", $name );

$email = $_POST['email'];
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email1 = $email;
}
else {
	$url = htmlspecialchars($_SERVER['HTTP_REFERER']);
    echo "Email not valid - " . "<a href='$url'>Click here to go back</a>."; 
	exit();
}

$phone = $_POST['phone'];
$phone1 = ereg_replace("[^A-Za-z0-9]", " ", $phone );

$date = $_POST['date'];

$time = $_POST['time'];

$people = $_POST['people'];
$people1 = ereg_replace("[^A-Za-z0-9]", " ", $people );

$message = $_POST['message'];
$message1 = ereg_replace("[^A-Za-z0-9]", " ", $message );


$formcontent="From: $name1 \n Email: $email1 \n Telephone: $phone1 \n Date: $date \n Time: $time \n People: $people1 \n Message: $message1";

$subject = "New Online Booking!";

header("Location: thankyou.php");

$mailheader = "From: $email1 \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");

echo "Thank you for your booking. A member of our team will confirm your booking shortly with the number you have provided.";

?>
 
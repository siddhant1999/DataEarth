<?php
define("RECIPIENT", "fabian.vera@mail.utoronto.ca");

$name = strip_tags(trim($_POST["name"]));
$name = str_replace(array("\r","\n"),array(" "," "),$name);
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$message = trim($_POST["message"]);

// Set the email subject.
$subject = "Contact from: $name";

// Build the email content.
$email_content = "Name: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

// Build the email headers.
$email_headers = "From: $name <$email>". "\r\n" .
    'Reply-To: ' . $email . "\r\n";



// Send the email.
if(1!==preg_match('~[0-9]~',$name)){
    if (mail(RECIPIENT, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    }
    else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
}


?>

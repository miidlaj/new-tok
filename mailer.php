<?php
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
      
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
       $phone= trim($_POST["phone"]);
        $company= trim($_POST["company"]);
        $message= trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($email) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
//            http_response_code(400);
            header( 'HTTP/1.1 400 BAD REQUEST' );
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "info@newtok.com";
        

        // Set the email subject.
        $subject = "Enquiry , I'm $name";

        // Build the email content.
        $email_content = "<html><body>";
        $email_content .="<table border=0 width=450px cellspacing=0 cellpadding=5 style='border: 1px solid #1c61ad;
    color: #1c61ad;
    font-family: arial;
    font-size: 15px;  '>
<tbody>";
        $email_content .="<tr><td style='width:40%;font-style:italic;color:black'>Name</td><td >".$name."</td></tr>";
        $email_content .="<tr><td style='font-style:italic;color:black'>Email</td><td>".$email."</td></tr>";
      $email_content .="<tr><td style='font-style:italic;color:black'>Phone</td><td>".$phone."</td></tr>";
          $email_content .="<tr><td style='font-style:italic;color:black'>Company Name</td><td>".$company."</td></tr>";
            $email_content .="<tr><td style='font-style:italic;color:black'>Message</td><td>".$message."</td></tr>";
        
        $email_content .= "</tbody> 
</table></body></html>";
        
        $email_headers = "From: $name <$email> \r\n".
            'X-Mailer: PHP/' . phpversion().
            "MIME-Version: 1.0" . "\r\n".
            "Content-Type: text/html; charset=ISO-8859-1\r\n";
   
// $email_headers = "From: $name <$email> \r\n" ;
//    $email_headers .='Reply-To: '. $recipient . "\r\n" ;
//    $email_headers .='X-Mailer: PHP/' . phpversion();
//    $email_headers .= "MIME-Version: 1.0\r\n";
//    $email_headers .= "Content-type: text/html; charset=iso-8859-1\r\n";  
//

    
        if (mail($recipient, $subject, $email_content, $email_headers)) {

            header("HTTP/1.1 200 OK");
            echo "Thank You, your message has been sent.";
        } else {

            header('HTTP/1.1 500 Internal Server Error');
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {

        header('HTTP/1.1 403 Forbidden');
        echo "There was a problem with your submission, please try again.";
    }

?>
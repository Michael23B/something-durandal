<?php
	session_start();
	$function = $_POST['function'];
    switch($function){
    	case('check'):
			if (isset($_SESSION['user'])){
				// logged in !
				echo json_encode($_SESSION['user']);
			}
			else{
				echo json_encode(false);
			}
			break;	
		case('login'):
			$servername = "localhost";
			$username = $_POST['username'];
			$password = $_POST['password'];
			$dbname = "mysql";

			// Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
				die($conn->connect_error);
			}
			else{
				$_SESSION['user'] = $username;
				echo true;
			}
			$conn->close();
			break;
	}
?>
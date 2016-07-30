<?php
	include_once "common.php";


	// $options = array('cost' => 11);
	// echo password_hash('password', PASSWORD_BCRYPT, $options);


	$email = !empty($_GET['email']) ? $_GET['email'] : false;
	$password = !empty($_GET['password']) ? $_GET['password'] : false;
	$hash = !empty($_GET['hash']) ? $_GET['hash'] : false;

	if(!$email || !$password){
		if($hash){
			$options = array('cost' => 11);
			echo password_hash($hash, PASSWORD_BCRYPT, $options);
		}else{
			format_response(false, 'no email or password');
		}

	}else{
		$userData = checkLogin($email, $password);
		if(!$userData){
			format_response(false, 'incorrect email or password');
		}else{
			$_SESSION["user"] = $userData;
			format_response(true, 'user logged in', $userData);
			
		}
	}


	function checkLogin($email, $password){

		$user = getSingleRow('users', 'email', $email);
		print_r($user);

		// $typeArr = array();

		// global $mysqli;
		// $sql = "SELECT u.id, u.email, u.username, u.fName, u.lName, u.password, u.hasLoggedIn, r.type FROM users u INNER JOIN roles r ON u.id = r.id WHERE username = ?";
		// $result = $mysqli->prepare($sql);
		// $result->bind_param('s', $username);
		// $result->execute();

		// $result->store_result();
		// if($result->num_rows > 0) {
		// 	$result->bind_result($id, $email, $username, $fName, $lName, $hash, $hasLoggedIn, $type);

		// 	while($result->fetch())
		// 	{	
		// 		if (password_verify($password, $hash)) {
		// 			$typeArr[] = $type;
		// 	    	$userData = array('id'=>$id, 'email'=>$email, 'username'=>$username, 'fName'=>$fName, 'lName'=>$lName, 'hasLoggedIn'=>$hasLoggedIn);

		// 		} else {
		// 		    $userData = false;
		// 		}
		// 	}
		// }else{
		// 	$userData = false;
		// }

		// $result->close();

		// if($userData){
		// 	$userData['type'] = $typeArr;
		// }

		// return $userData;
	}







	// function checkLogin($username, $password){
	// 	$typeArr = array();

	// 	global $mysqli;
	// 	$sql = "SELECT u.id, u.email, u.username, u.fName, u.lName, u.password, u.hasLoggedIn, r.type FROM users u INNER JOIN roles r ON u.id = r.id WHERE username = ?";
	// 	$result = $mysqli->prepare($sql);
	// 	$result->bind_param('s', $username);
	// 	$result->execute();

	// 	$result->store_result();
	// 	if($result->num_rows > 0) {
	// 		$result->bind_result($id, $email, $username, $fName, $lName, $hash, $hasLoggedIn, $type);

	// 		while($result->fetch())
	// 		{	
	// 			if (password_verify($password, $hash)) {
	// 				$typeArr[] = $type;
	// 		    	$userData = array('id'=>$id, 'email'=>$email, 'username'=>$username, 'fName'=>$fName, 'lName'=>$lName, 'hasLoggedIn'=>$hasLoggedIn);

	// 			} else {
	// 			    $userData = false;
	// 			}
	// 		}
	// 	}else{
	// 		$userData = false;
	// 	}

	// 	$result->close();

	// 	if($userData){
	// 		$userData['type'] = $typeArr;
	// 	}

	// 	return $userData;
	// }
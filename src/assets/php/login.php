<?php
	include_once "common.php";

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
		$user = checkLogin($email, $password);
		if(!$user){
			format_response(false, 'incorrect email or password');

		}else{
			$_SESSION["user"] = $user;
			format_response(true, 'user logged in', $user);
			
		}
	}


	function checkLogin($email, $password){

		$user = getSingleRow('users', 'email', $email);

		if (password_verify($password, $user['password'])) {
			unset($user['password']);

		}else{
			$user = false;
		}

		return $user;
	}

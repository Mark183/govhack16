<?php
	include_once "common.php";

	$email = !empty($_GET['email']) ? $_GET['email'] : false;
	$password = !empty($_GET['password']) ? $_GET['password'] : false;
	$fName = !empty($_GET['fName']) ? $_GET['fName'] : false;
	$lName = !empty($_GET['lName']) ? $_GET['lName'] : false;


	if(!$email || !$password){
		format_response(false, 'no email or password');

	}else{
		$encPassword = encryptPassword($password);
		$user = signup($email, $encPassword, $fName, $lName);

		if(!$user){
			format_response(false, 'incorrect email or password');

		}else{
			$_SESSION["user"] = $user;
			format_response(true, 'user logged in', $user);
			
		}
	}


	function signup($email, $encPassword, $fName, $lName){
		$time = time();
		$added = insertRow('users', "email, password, fName, lName, timestamp", "'$email', '$encPassword', '$fName', '$lName', '$time'");

		if($added){
			$user = getSingleRow('users', 'email', $email);
			unset($user['password']);
		}else{
			$user = false;
		}


		return $user;
	}

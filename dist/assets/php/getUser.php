<?php
	include_once "common.php";

	$isLoggedin = loginCheck();

	if($isLoggedin){
		$user = $_SESSION['user'];
		format_response(true, 'user logged in', $user);

	}else{
		format_response(false, 'not logged in');
	}
<?php

if (gethostname() == 'sm9.siteground.biz') {
	$mysqli = new mysqli('localhost','alperecr_govhack','Si2SXTklWhFc','alperecr_govhack');	
} else {
	$mysqli = new mysqli('109.73.228.248','alperecr_govhack','Si2SXTklWhFc','alperecr_govhack');
}

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

global $mysqli;
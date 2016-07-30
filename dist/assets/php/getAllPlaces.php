<?php 

include_once "common.php";

// $response = array();

$lat = $_GET['lat'];

$lng = $_GET['lng'];

$distance = $_GET['distance'];

$miles = $distance * 0.621371;

$lat = -28.0167;

$lng = 153.4;

$query = "SELECT * FROM places ";

$out = customQuery($query);

format_response(true, true, $out);

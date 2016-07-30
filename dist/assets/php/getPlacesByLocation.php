<?php 

include_once "common.php";

// $response = array();

if (empty($_GET['lat']) || empty($_GET['lng']) || empty($_GET['distance'])) {
	format_response(false, 'missing data');
} else {
	$lat = $_GET['lat'];

	$lng = $_GET['lng'];

	$distance = $_GET['distance'];
	
	$miles = $distance * 0.621371;

	$query = "SELECT " .
	  "id, ( " .
	    "3959 * acos ( " .
	      "cos ( radians($lat) ) " .
	      "* cos( radians( lat ) ) " .
	      "* cos( radians( lng ) - radians($lng) ) " .
	      "+ sin ( radians($lat) ) " .
	      "* sin( radians( lat ) ) " .
	    ") " .
	  ") AS distance, " .
	  "lat, " .
	  "lng " .
	"FROM places " .
	"HAVING distance < $miles " .
	"ORDER BY distance ";
	$out = customQuery($query);

	format_response(true, true, $out);
}

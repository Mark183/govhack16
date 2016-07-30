<?php 

include_once "common.php";
include_once "locations.php";

if (empty($_GET['location'])) {
	format_response(false, 'missing location');
} else if (empty($_GET['category'])) {
	format_response(false, 'missing category');
} else {
	$location = $_GET['location'];

	$category = $_GET['category'];

	$lat = $locations[$location]["lat"];

	$lng = $locations[$location]["lng"];

	$distance = $locations[$location]["distance"];

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
	  "lng, " .
	  "category " .
	"FROM places " .
	"HAVING distance < $miles " .
	"AND category = '$category' " .
	"ORDER BY distance ";

	// $out = customQuery($query);

	format_response( true, true, $query);
}

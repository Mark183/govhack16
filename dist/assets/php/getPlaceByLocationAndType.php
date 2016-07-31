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

	$query = "SELECT AVG( reviews.overall ) AS overall, ( 3959 * ACOS( COS( RADIANS( $lat ) ) * COS( RADIANS( lat ) ) * COS( RADIANS( lng ) - RADIANS( $lng ) ) + SIN( RADIANS( $lat ) ) * SIN( RADIANS( lat ) ) ) ) AS distance, places.id, lat, lng, name, description, category " .
			"FROM places " .
			"LEFT OUTER JOIN reviews ON reviews.place_id = places.id " .
			"WHERE category =  '$category' " .
			"GROUP BY places.id " .
			"HAVING distance < $miles " .
			"ORDER BY overall DESC";

	$out = customQuery($query);

	format_response( true, true, $out);
}

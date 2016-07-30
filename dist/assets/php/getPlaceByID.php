<?php 

include_once "common.php";
include_once "locations.php";

if (empty($_GET['place_id'])) {
	format_response(false, 'missing place id');
} else {
	$data = array();

	$place_id = $_GET['place_id'];

	$query = "SELECT * FROM places LEFT JOIN toilets ON places.ID = toilets.place_id WHERE places.ID = $place_id";

	$data['details'] = customQuery($query);

	$query = "SELECT * FROM reviews, users, places WHERE place_id = $place_id AND reviews.user_id = users.ID AND reviews.place_id = places.ID LIMIT 0,10"; 

	$data['reviews'] = customQuery($query);

	$query = "SELECT AVG(lighting) as lighting, AVG(cleanliness) as cleanliness, AVG(accessibility) as accessibility, AVG(cond) as cond, AVG(family_friendly) as family_friendly, AVG(safety) as safety, AVG(overall) as overall FROM reviews WHERE place_id = $place_id"; 

	$data['ratings'] = customQuery($query);

	format_response( true, true, $data);
}

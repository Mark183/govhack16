<?php
	include_once "common.php";

	$sql = "SELECT * FROM reviews INNER JOIN users ON reviews.user_id=users.id INNER JOIN places ON reviews.place_id = places.id ORDER BY reviews.timestamp DESC LIMIT 0 , 5";

	$data = customQuery($sql);

	if(!$data){
		format_response(false, 'an error occured');
	}else{
		format_response(false, 'last 5 reviews', $data);
	}
	

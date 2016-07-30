<?php
	include_once "common.php";

	// INSERT INTO tbl_name (a,b,c) VALUES(1,2,3),(4,5,6),(7,8,9);

	$sql = "SELECT * FROM sunshinestops";

	$data = customQuery($sql);

	$string = "INSERT INTO places (name, category, lat, lng) VALUES ";

	$count = 0;

	foreach ($data as $key => $value) {
		if($count != 0){
			$string .= ", ";
		}
		$count++;

		$geo = explode(", ",$value['Shape']);

		$lat = substr($geo[0], 1);
		$lng = rtrim($geo[1], ")");

		$name = $value['StreetName'];

		$string .= "('$name', 'bus_stop', '$lat', '$lng')";
	}

	$data = customQuery($string);

	print_r($data);
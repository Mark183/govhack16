<?php
	include_once "common.php";

	$toilet_locations = customQuery("SELECT * FROM toiletTemp");
	echo count($toilet_locations);

	foreach ($toilet_locations as $toilet) {
		// print_r($toilet['toiletid']);

		$fields_place = "name, category, lat, lng";
		$values_place = "'" . $mysqli->real_escape_string($toilet['name']) . "', " .
						"'" . $mysqli->real_escape_string($toilet['category']) . "', " .
						$toilet['lat'] . ", " .
						$toilet['lng'];

		$id = insertRow('places', $fields_place, $values_place);

		$values_specific = $mysqli->real_escape_string($toilet['sanitarydisposal']) . ", " .
				  $mysqli->real_escape_string($toilet['sharpsdisposal']) . ", " .
				  $mysqli->real_escape_string($toilet['drinkingwater']) . ", " .
				  $mysqli->real_escape_string($toilet['showers']) . ", " .
				  $mysqli->real_escape_string($toilet['babychange']) . ", " .
				  $mysqli->real_escape_string($toilet['parkingaccessible']) . ", " .
				  $mysqli->real_escape_string($toilet['accessibleunisex']) . ", " .
				  $mysqli->real_escape_string($toilet['accessiblefemale']) . ", " .
				  $mysqli->real_escape_string($toilet['accessiblemale']) . ", " .
				  $mysqli->real_escape_string($toilet['parking']) . ", " .
				  $mysqli->real_escape_string($toilet['keyrequired']) . ", " .
				  $mysqli->real_escape_string($toilet['paymentrequired']) . ", " .
				  $mysqli->real_escape_string($toilet['accesslimited']) . ", " .
				  $mysqli->real_escape_string($toilet['unisex']) . ", " .
				  $mysqli->real_escape_string($toilet['female']) . ", " .
				  $mysqli->real_escape_string($toilet['male']) . ", " .
				  $mysqli->real_escape_string($toilet['postcode']) . ", " .
				  "'" . $mysqli->real_escape_string($toilet['state']) . "', " .
				  "'" . $mysqli->real_escape_string($toilet['town']) . "', " .
				  "'" . $mysqli->real_escape_string($toilet['address1']) . "', " .
				  $id;

		$fields_specific = "sanitarydisposal, sharpsdisposal, drinkingwater, showers, babychange, parkingaccessible, accessibleunisex, accessiblefemale, accessiblemale, parking, keyrequired, paymentrequired, accesslimited, unisex, female, male, postcode, state, town, address1, place_id";

		$id = insertRow('toilets', $fields_specific, $values_specific);
		if (!$id) {
			break;
		} else {
			echo $id;
		}
	}
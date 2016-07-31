<?php
	include_once "common.php";

	$isLoggedin = loginCheck();

	if($isLoggedin){
		$place_id = !empty($_GET['place_id']) ? $_GET['place_id'] : false;
		$comment = !empty($_GET['comment']) && $_GET['comment'] != false ? $_GET['comment'] : false;
		$lighting = !empty($_GET['lighting']) && $_GET['lighting'] != false ? (int)$_GET['lighting'] : false;
		$cleaning = !empty($_GET['cleaning']) && $_GET['cleaning'] != false ? (int)$_GET['cleaning'] : false;
		$accessibility = !empty($_GET['accessibility']) && $_GET['accessibility'] != false ? (int)$_GET['accessibility'] : false;
		$condition = !empty($_GET['condition']) && $_GET['condition'] != false ? (int)$_GET['condition'] : false;
		$familyFriendly = !empty($_GET['familyFriendly']) && $_GET['familyFriendly'] != false ? (int)$_GET['familyFriendly'] : false;
		$safety = !empty($_GET['safety']) && $_GET['safety'] != false ? (int)$_GET['safety'] : false;

		if($place_id){
			$userId = $_SESSION['user']['id'];
			$sql = "SELECT * FROM reviews WHERE place_id = '$place_id' AND user_id = '$userId'";
			$exists = customQuery($sql);

			if(!$exists){
				if(!$comment && !$lighting && !$cleaning && !$accessibility && !$condition && !$familyFriendly && !$safety){
					format_response(false, 'no review given');

				}else{
					//only comment given
					if(!$lighting && !$cleaning && !$accessibility && !$condition && !$familyFriendly && !$safety){
						$overall = false;

						$lighting = !$lighting ? "NULL" : $lighting;
						$cleaning = !$cleaning ? "NULL" : $cleaning;
						$accessibility = !$accessibility ? "NULL" : $accessibility;
						$condition = !$condition ? "NULL" : $condition;
						$familyFriendly = !$familyFriendly ? "NULL" : $familyFriendly;
						$safety = !$safety ? "NULL" : $safety;

					}else{
						$overall = calcOverall($lighting, $cleaning, $accessibility, $condition, $familyFriendly, $safety);

						$lighting = !$lighting ? "NULL" : $lighting;
						$cleaning = !$cleaning ? "NULL" : $cleaning;
						$accessibility = !$accessibility ? "NULL" : $accessibility;
						$condition = !$condition ? "NULL" : $condition;
						$familyFriendly = !$familyFriendly ? "NULL" : $familyFriendly;
						$safety = !$safety ? "NULL" : $safety;
					}
						
					$added = addReview($comment, $overall, $lighting, $cleaning, $accessibility, $condition, $familyFriendly, $safety, $place_id);
					if($added){
						format_response(true, 'review complete');
					}else{
						format_response(false, 'issue adding review');
					}
				}
			}else{
				format_response(false, 'User already reviewed this');
			}
		}else{
			format_response(false, 'Missing place ID');
		}

	}else{
		format_response(false, 'User not logged in'); //gets call in common no here
	}

	function calcOverall($lighting, $cleaning, $accessibility, $condition, $familyFriendly, $safety){
		$overall = 0;
		$count = 0;
		
		if($lighting){
			$overall += $lighting;
			$count++;
		}

		if($cleaning){
			$overall += $cleaning;
			$count++;
		}

		if($accessibility){
			$overall += $accessibility;
			$count++;
		}

		if($condition){
			$overall += $condition;
			$count++;
		}

		if($familyFriendly){
			$overall += $familyFriendly;
			$count++;
		}

		if($safety){
			$overall += $safety;
			$count++;
		}

		return $overall/$count;
	}

	function addReview($comment, $overall, $lighting, $cleaning, $accessibility, $condition, $familyFriendly, $safety, $place_id){
		$userId = $_SESSION['user']['id'];
		$time = time();

		$added = insertRow('reviews', 'text, timestamp, overall, lighting, cleanliness, accessibility, cond, family_friendly, safety, user_id, place_id', "'$comment', $time, $overall, $lighting, $cleaning, $accessibility, $condition, $familyFriendly, $safety, $userId, '$place_id'");

		return $added;
	}
	

	

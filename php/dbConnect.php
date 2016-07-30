<?php

$mysqli = new mysqli('sm9.siteground.biz','alperecr_govhack','Si2SXTklWhFc','alperecr_govhack');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
print_r($mysqli);
global $mysqli;
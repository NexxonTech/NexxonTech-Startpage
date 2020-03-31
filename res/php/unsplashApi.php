<?php
/*
Copyright 2020 (c) Riccardo Sacchetto (NexxonTech) <rsacchetto (at) nexxontech.it>


This file is part of NexxonTech Startpage.

NexxonTech Startpage is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

NexxonTech Startpage is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with NexxonTech Startpage.  If not, see <http://www.gnu.org/licenses/>.
*/


$apiUrl = "https://api.unsplash.com/photos/random?client_id=$clientId&collections=$cat&count=1&orentation=landscape&content_filter=high";
$apiResponse = file_get_contents($apiUrl);
if($apiResponse == false) {
	$backgroundUrl = "res/img/fallbackImg.jpg";
	$autore = $fallbackAuthor;
	$authorLink = $fallbackAuthorUrl;
} else {
	$jsonResponse = utf8_encode($apiResponse);
	$response = json_decode($jsonResponse);
	$backgroundUrl = $response[0]->{"urls"}->{"full"};
	$autore = $response[0]->{"user"}->{"name"};
	$authorLink = $response[0]->{"user"}->{"links"}->{"html"};
}

?>
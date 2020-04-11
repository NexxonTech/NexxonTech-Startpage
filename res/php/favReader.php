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


// Se non è mai stato creato, inseriso il cookie con i preferiti di default
if(!isset($_COOKIE["favorites2"])) {
		// Codifico il cookie con i valori predefiniti
		$cookieContent = json_encode($defaultFavs);
		// Imposto il cookie
    setcookie("favorites2", $cookieContent, time() + (10 * 365 * 24 * 60 * 60), "/");
}

function favList() {
	/* Funzione favList: crea la lista con i link cliccabili */
	// Decodifico il cookie
	$favs = json_decode($_COOKIE["favorites2"], true);
	echo('<script>console.log("' . $favs . '");</script>');
	// Se ci sono preferiti
	if (count($favs) != 0) {
		// Per ogni preferito
		foreach ($favs as $favName => $favUrl) {
			// Faccio il print del link
			echo('<a class="dropdown-item" href="https://' . $favUrl . '">' . $favName . '</a>');
		}
	}
}

function favManagerList() {
	/* Funzione favList: crea la lista con i link modificabili */
	// Decodifico il cookie
	$favs = json_decode($_COOKIE["favorites2"], true);
	// Se ci sono preferiti
	if (count($favs) != 0) {
		// Preparo il contatore di preferiti
		$favCount = 0;
		// Per ogni preferito
		foreach ($favs as $favName => $favUrl) {
			// Faccio il print dell'elemento editabile
			echo('<p id="fav-' . $favCount . '" class="w-100"><b><span id="fav-name-' . $favCount . '" contenteditable>' . $favName . '</span>:</b> <span id="fav-url-' . $favCount . '" contenteditable>' . $favUrl . '</span><i class="fas fa-trash" style="float: right; color: red" onclick="rmFav(' . $favCount . ')"></i></p>');
			// Incremento il contatore
			$favCount++;
		}
	}
}
?>
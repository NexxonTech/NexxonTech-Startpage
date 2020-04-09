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
if(!isset($_COOKIE["favorites"])) {
    setcookie("favorites", "Google=www.google.it|Wikipedia=it.wikipedia.org|NexxonTech=www.nexxontech.it", time() + (10 * 365 * 24 * 60 * 60), "/");
}

function favList() {
	/* Funzione favList: crea la lista con i link cliccabili */
	// Separo i vari links
	$favs = explode("|",$_COOKIE["favorites"]);
	// Se ci sono preferiti
	if (count($favs) != 0) {
		// Per ogni preferito
		foreach ($favs as $fav) {
			// Separo nome da URL
			$fav = explode("=",$fav);
			// Faccio il print del link
			echo('<a class="dropdown-item" href="https://' . $fav[1] . '">' . $fav[0] . '</a>');
		}
	}
}

function favManagerList() {
	/* Funzione favList: crea la lista con i link modificabili */
	// Separo i vari links
	$favs = explode("|",$_COOKIE["favorites"]);
	// Se ci sono preferiti
	if (count($favs) != 0) {
		// Preparo il contatore di preferiti
		$favCount = 0;
		// Per ogni preferito
		foreach ($favs as $fav) {
			// Separo nome da URL
			$fav = explode("=",$fav);
			// Faccio il print dell'elemento editabile
			echo('<p id="fav-' . $favCount . '" class="w-100"><b><span id="fav-name-' . $favCount . '" contenteditable>' . $fav[0] . '</span>:</b> <span id="fav-url-' . $favCount . '" contenteditable>' . $fav[1] . '</span><i class="fas fa-trash" style="float: right; color: red" onclick="rmFav(' . $favCount . ')"></i></p>');
			// Incremento il contatore
			$favCount++;
		}
	}
}
?>
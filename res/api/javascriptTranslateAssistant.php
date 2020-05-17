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


// Importo la configurazione
require "../../config.php";
// Importo il file di lingua
require "../langs/$defaultLang.php";

// Verifico la funzione richiesta
if($_GET["action"] == "translateMonth") {
	// Ritorno il nome del mese scelto (0- 11)
	echo($uiTexts["Mesi"][intval($_GET["month"])]);
} elseif($_GET["action"] == "pressEnterTranslate") {
	// Ritorno le traduzioni per la text box centrale
	$texts = array(
		"Cerca con Google" => $uiTexts["Cerca con Google"],
		"Chiedi a Wolfram|Alpha" => $uiTexts["Chiedi a Wolfram|Alpha"],
		"Digita un URL" => $uiTexts["Digita un URL"]
	);
	// Codifico il risultato in JSON
	$jsonTexts = json_encode($texts);
	// Invio il risultato
	echo($jsonTexts);
} elseif($_GET["action"] == "favTexts") {
	// Ritorno le traduzioni per i campi dei preferiti
	$texts = array(
		"Nome favorito" => $uiTexts["Nome favorito"],
		"URL favorito" => $uiTexts["URL favorito"]
	);
	// Codifico il risultato in JSON
	$jsonTexts = json_encode($texts);
	// Invio il risultato
	echo($jsonTexts);
}
?>
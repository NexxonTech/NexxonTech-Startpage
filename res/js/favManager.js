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


// Aggiorno i favoriti quando clicco su salva
$(document).delegate('#favSaveBtn', 'click', function(event) {
	/* Listener favSaveBtn -> click: salvo la configurazione dei links */
	// Avvio l'update
  updateFavs();
});

$(document).delegate('#addFavBtn', 'click', function(event) {
	/* Listener addFavBtn -> click: aggiungo un preferito */
	
	// Creo un XMLHttpRequest
	var xhttp = new XMLHttpRequest();
	// Quando la API risponde
  xhttp.onreadystatechange = function() {
  	if (this.readyState == 4 && this.status == 200) {
  		// Salvo il nome del mese
  		texts = JSON.parse(this.responseText);
  	}
  };
  // Avvio la comunicazione
  xhttp.open("GET", "res/api/javascriptTranslateAssistant.php?action=favTexts", false);
  xhttp.send();
	
	// Dichiaro la variabile nella quale contare i preferiti esistenti
	var favCount = 0;
	
	// Cerco preferiti fino a quando non ce ne sono più
	while (true) {
		// Se non esiste
		if (document.getElementById('fav-' + favCount) === null) {
			// Fermo il ciclo
			break;
		} else {
			// Incremento il contatore
			favCount++;
		}
	}
	
	// Aggiungo l'HTML per la gestione del nuovo preferito
	document.getElementById('favSettingsContainer').innerHTML = document.getElementById('favSettingsContainer').innerHTML + '<p id="fav-' + favCount + '" class="w-100"><b><span id="fav-name-' + favCount + '" contenteditable>[' + texts["Nome favorito"] + ']</span>:</b> <span id="fav-url-' + favCount + '" contenteditable>[' + texts["URL favorito"] + ']</span><i class="fas fa-trash" style="float: right; color: red" onclick="rmFav(' + favCount + ')"></i></p>';
});

function updateFavs() {
	/* Funzione updateFavs: aggiorna i preferiti */
	// Dichiaro le variabili di appoggio
	var favCount = 0;
	var favArray = {};
	
	// Cerco preferiti fino a quando non ce ne sono più
	while (true) {
		// Se esiste
		if (document.getElementById('fav-' + favCount) !== null) {
			// Aggiungo il preferito alla lista da trasmettere al backend
			favArray[document.getElementById('fav-name-' + favCount).innerHTML] = document.getElementById('fav-url-' + favCount).innerHTML;
		} else {
			// Fermo il ciclo
			break;
		}
		// Incremento il contatore
		favCount++;
	}
	
	// Chiamo il backend
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	// Quando è tutto pronto, aggiorno la pagina
      location.reload();
    }
  };
	xhttp.open("GET", "res/api/favUpdate.php?string=" + JSON.stringify(favArray), true);
	xhttp.send();
}

function rmFav(id) {
	/* Funzione rmFav: cancella un link dato il suo id */
	var favCount = 0;
	// Cerco preferiti fino a quando non ce ne sono più
	while (true) {
		// Se non esiste
		if (document.getElementById('fav-' + favCount) === null) {
			// Fermo il ciclo
			break;
		} else {
			// Incremento il contatore
			favCount++;
		}
	}
	
	// Cancello l'elemento
	document.getElementById("fav-" + id).remove();
	
	// Se necessario, riconto quelli rimanenti
	if (id < favCount) {
		var idAttuale = id + 1;
		while (true) {
			// Se esiste
			if (document.getElementById('fav-' + idAttuale) !== null) {
				// Scalo tutti gli id successivi all'elemento rimosso
				document.getElementById("fav-" + idAttuale).id = "fav-" + id;
				document.getElementById("fav-name-" + idAttuale).id = "fav-name-" + id;
				document.getElementById("fav-url-" + idAttuale).id = "fav-url-" + id;
				
				// Incremento le due variabili
				idAttuale++;
				id++;
			} else {
				// Fermo il ciclo
				break;
			}
		}
	}
}
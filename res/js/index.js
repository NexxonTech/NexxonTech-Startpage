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


/* opType: funzione della casella
0 -> Ricerca [Default]
1 -> Apri un URL
*/
var opType = 0;
/* shType: tipo di ricerca
0 -> Google [Default]
1 -> Wolfram|Alpha
*/
var shType = 0;


function startTime() {
	/* Funzione startTime: ogni secondo aggiorna l'orologio in mezzo alla pagina */
	// Recupero la data di oggi
  var today = new Date();
  // Carico l'ora
  var h = today.getHours();
  // Carico i minuti
  var m = today.getMinutes();
  // Carico i secondi
  var s = today.getSeconds();
  // Carico il giorno
  var g = today.getDate();
  // Carico il mese interpretandolo con determineMonth()
  var me = determineMonth(today.getMonth());
  // Carico l'anno
  var y = today.getFullYear();
  // Aggiungo i leading-zero se necessario
  m = checkTime(m);
  s = checkTime(s);
  // Aggiorno l'orologio
  document.getElementById('ora').innerHTML = h + ":" + m + ":" + s;
  document.getElementById('data').innerHTML = g + " " + me + " " + y;
  // Decido quando chiamare la funzione la prossima volta
  var t = setTimeout(startTime, 1000);
}


function determineMonth(mese) {
	/* Funzione determineMonth: analizza il mese sostituendolo con la sua versione scritta */
	switch(mese) {
		case 0:
	  	return "Gennaio";
	  case 1:
	    return "Febbraio";
	  case 2:
	    return "Marzo";
	  case 3:
	    return "Aprile";
	  case 4:
	    return "Maggio";
	  case 5:
	    return "Giugno";
	  case 6:
	    return "Luglio";
	  case 7:
	    return "Agosto";
	  case 8:
	    return "Settembre";
	  case 9:
	    return "Ottobre";
	  case 10:
	    return "Novembre";
	  case 11:
	    return "Dicembre";
	}
}


function checkTime(i) {
	/* Funzione checkTime: se necessario, aggiunge uno zero davanti a i per avere sempre numeri di 2 cifre */
	// Se il numero ha una sola cifra (è minore di 10)
  if (i < 10) {
  	// Aggiungo un leading-zero
  	i = "0" + i;
  }
  // Ritorno il numero
  return i;
}


function pressEnter() {
	/* Funzione pressEnter: avvia le operazioni di redirezione o scambia tra ricerca e apertura URL */
	// Recupero la query
	query = document.getElementById("inputBox").value
	// Cambio solo se non è stato digitato nulla
	if (query === "") {
		// Verifico il tipo di ricerca già abilitata
		if (opType === 0) {
			// Passo all'apertura di un URL
			opType = 1;
			document.getElementById("inputBox").placeholder = "Digita un URL";
			document.getElementById("buttonChar").className = "fas fa-arrow-circle-right";
		} else {
			// Passo alla ricerca
			opType = 0;
			// Guardo quale grafica mostrare
			if (shType === 0) {
				// Grafica per Google
				document.getElementById("inputBox").placeholder = "Cerca con Google";
				document.getElementById("buttonChar").className = "fas fa-search";
			} else {
				// Grafica per Wolfram|Alpha
				document.getElementById("inputBox").placeholder = "Chiedi a Wolfram|Alpha";
				document.getElementById("buttonChar").className = "fas fa-calculator";
			}
		}
	} else {
		if (opType === 0) {
			if (shType === 0) {
				// Codifico la query
				query = encodeURIComponent(query);
				// Cerco su Google
				location.href = 'https://www.google.com/search?q=' + query;
			} else {
				// Codifico la query
				query = encodeURIComponent(query);
				// Do l'input a Wolfram|Alpha
				location.href = 'https://www.wolframalpha.com/input/?i=' + query;
			}
		} else {
			location.href = 'https://' + query;
		}
	}
}

function changeSearchType() {
	/* Funzione changeSearchType: cambia il tipo di ricerca eseguita */
	// Recupero la query
	query = document.getElementById("inputBox").value
	// Cambio solo se non è stato digitato nulla
	if (query === "") {
		// Verifico il tipo di ricerca già abilitata
		if (shType === 0) {
			// Passo alla ricerca su Wolfram|Alpha
			shType = 1;
			document.getElementById("inputBox").placeholder = "Chiedi a Wolfram|Alpha";
			document.getElementById("buttonChar").className = "fas fa-calculator";
		} else {
			// Passo alla ricerca su Google
			shType = 0;
			document.getElementById("inputBox").placeholder = "Cerca con Google";
			document.getElementById("buttonChar").className = "fas fa-search";
		}
	}
}

// Avvio la ricerca quando premo invio
$(document).delegate('#inputBox', 'keydown', function(event) {
	/* Listener inputBox -> keyup: avvio la ricerca quando premo invio sulla casella di ricerca */
	// Se il pulsante è invio
  if (event.keyCode === 13) {
  	// Disattivo la funzione di default
    event.preventDefault();
    // Avvio la ricerca
    pressEnter();
  } else if (event.keyCode == 9) {
    event.preventDefault();
    if (opType === 0) {
    	// Cambio il tipo di ricerca
    	changeSearchType();
    }
	}
});

// Avvio la ricerca quando clicco sul pulsante
$(document).delegate('#startSearch', 'click', function(event) {
	/* Listener startSearch -> click: avvio la ricerca quando premo il pulsante di ricerca */
	// Avvio la ricerca
  pressEnter();
});
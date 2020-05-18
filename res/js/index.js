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
  h = checkTime(h);
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
	// Dichiaro la variabile che conterrà il testo
	var textMese = "";
	// Creo un XMLHttpRequest
	var xhttp = new XMLHttpRequest();
	// Quando la API risponde
  xhttp.onreadystatechange = function() {
  	if (this.readyState == 4 && this.status == 200) {
  		// Salvo il nome del mese
  		textMese = this.responseText;
  	}
  };
  // Avvio la comunicazione
  xhttp.open("GET", "res/api/javascriptTranslateAssistant.php?action=translateMonth&month=" + mese, false);
  xhttp.send();
  // Ritorno il nome del mese
  return textMese;
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
  xhttp.open("GET", "res/api/javascriptTranslateAssistant.php?action=pressEnterTranslate", false);
  xhttp.send();
	
	// Recupero la query
	query = document.getElementById("inputBox").value
	// Cambio solo se non è stato digitato nulla
	if (query === "") {
		// Verifico il tipo di ricerca già abilitata
		if (opType === 0) {
			// Passo all'apertura di un URL
			opType = 1;
			document.getElementById("inputBox").placeholder = texts["Digita un URL"];
			document.getElementById("buttonChar").className = "fas fa-arrow-circle-right";
		} else {
			// Passo alla ricerca
			opType = 0;
			// Guardo quale grafica mostrare
			if (shType === 0) {
				// Grafica per Google
				document.getElementById("inputBox").placeholder = texts["Cerca con Google"];
				document.getElementById("buttonChar").className = "fas fa-search";
			} else {
				// Grafica per Wolfram|Alpha
				document.getElementById("inputBox").placeholder = texts["Chiedi a Wolfram|Alpha"];
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
  xhttp.open("GET", "res/api/javascriptTranslateAssistant.php?action=pressEnterTranslate", false);
  xhttp.send();
	
	// Recupero la query
	query = document.getElementById("inputBox").value
	// Cambio solo se non è stato digitato nulla
	if (query === "") {
		// Verifico il tipo di ricerca già abilitata
		if (shType === 0) {
			// Passo alla ricerca su Wolfram|Alpha
			shType = 1;
			document.getElementById("inputBox").placeholder = texts["Chiedi a Wolfram|Alpha"];
			document.getElementById("buttonChar").className = "fas fa-calculator";
		} else {
			// Passo alla ricerca su Google
			shType = 0;
			document.getElementById("inputBox").placeholder = texts["Cerca con Google"];
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

// Carico lo sfondo in maniera asincrona
window.addEventListener("load", function() {
	// Creo una nuova immagine
	var bgImg = new Image();
	// Quando l'immagine sarà caricata
	bgImg.onload = function(){
		// La uso come background
		document.getElementById("bgImage").style.backgroundImage = 'url(' + bgImg.src + ')';
	};
	// Avvio il download dell'immagine
	bgImg.src = fullBgUrl;
});
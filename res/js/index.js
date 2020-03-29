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


function doSearch() {
	/* Funzione doSearch: esegue una ricerca su Google con la query digitata in inputBox */
	// Recupero la query
	query = document.getElementById("inputBox").value
	// Sostituisco gli spazi con un +
	query.replace(/\s/g, '+')
	// Cerco su Google
	location.href = 'https://www.google.com/search?q=' + query;
}

// Avvio la ricerca quando premo invio
document.getElementById("inputBox").addEventListener("keyup", function(event) {
	/* Listener inputBox -> keyup: avvio la ricerca quando premo invio sulla casella di ricerca */
	// Se il pulsante è invio
  if (event.keyCode === 13) {
  	// Disattivo la funzione di default
    event.preventDefault();
    // Avvio la ricerca
    doSearch();
  }
});

// Avvio la ricerca quando clicco sul pulsante
document.getElementById("startSearch").addEventListener("click", function(event) {
	/* Listener startSearch -> click: avvio la ricerca quando premo il pulsante di ricerca */
	// Avvio la ricerca
  doSearch();
});
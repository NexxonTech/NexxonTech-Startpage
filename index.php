<!--
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
-->


<?php
	// Se l'utente non ha mai visto l'avviso sui Cookies glielo mostro e lo ricordo
	if (!isset($_COOKIE['cookiePolicy'])) {
		$showAdvice = true;
		setcookie("cookiePolicy", "true", time() + (10 * 365 * 24 * 60 * 60), "/");
	} else {
		$showAdvice = false;
	}

	// Carico la configurazione
	require "config.php";
	
	// Carico la API di Unsplash
	require "res/php/unsplashApi.php";
	
	// Carico il lettore dei preferiti
	require "res/php/favReader.php";
?>

<html>
	<head>
		<title>NexxonTech Startpage</title>
		
		<!-- Adatto la viewport -->
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<!-- Favicon -->
  	<link href="res/img/favicon.jpg" rel="icon">
		
		<!-- Importo Bootstrap -->
		<link rel="stylesheet" href="res/css/bootstrap.min.css">
		
		<!-- Importo FontAwesome -->
		<script src="res/js/fontawesome.js" crossorigin="anonymous"></script>
		
		<!-- Importo i fonts -->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans|Source+Code+Pro&display=swap" rel="stylesheet">
		
		<!-- Importo i files CSS del progetto -->
		<link rel="stylesheet" href="res/css/index.css">
	</head>
	<body style="height: 100%;" onload="startTime()">
		<!-- Background sfocato scaricato da Unsplash -->
		<div style="height: 100%; width: 100%; overflow: hidden;"><div id="bgImage" style="background-image: url('<?php echo $backgroundUrl; ?>');"></div></div>
		
		<!-- Main area -->
		<div class="container-fluid" id="main">
			<!-- Barra in alto -->
			<div id="branding" class="mt-2 w-100">
				<!-- Logo -->
				<h1 style="font-family: 'Open Sans', sans-serif; float: left; "><?php echo $homeName ?><sup><span style="font-size: 15px;">StartPage</span></sup></h1>
				<!-- Menu dei preferiti -->
				<div class="dropdown" style="float: right;">
					<!-- Pulsante di apertura del menu -->
				  <button style="padding: 0; border: none; background: none; margin: 10px; color: white" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    <i class="fas fa-bars" style="font-size: 30px"></i>
				  </button>
				  <!-- Lista dei preferiti -->
				  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
				  	<?php favList(); ?>
					  <div class="dropdown-divider"></div>
					  <a class="dropdown-item" data-toggle="modal" data-target="#gestionePreferiti"><i class="fas fa-cogs"></i> Gestisci preferiti</a>
				  </div>
				</div>
			</div>
			<!-- Contenuto centrale -->
			<div id="central-content" class="container-fluid">
				<!-- Orologio -->
				<div class="row pb-5" align="center">
					<div class="col">
						<h1 class="display-1" id="ora">...</h1>
						<h1 class="display-4" id="data">...</h1>
					</div>
				</div>
				<!-- Area di ricerca -->
				<div class="row pt-5">
					<div class="col-md-4"></div>
					<div class="col-md-4" align="center">
						<div class="row">
							<!-- Casella di ricerca -->
							<div class="col-11 p-sm-1 p-2">
								<input id="inputBox" class="form-control form-control-sm mr-1" type="text" placeholder="Cerca con Google" style="background-color: rgba(F, F, F, 0.5);" autocomplete="off" autofocus>
							</div>
							<!-- Pulsante di ricerca -->
						  <div class="col-1 p-sm-1 p-2">
						  	<button id="startSearch" type="button" class="btn btn-primary"><i id="buttonChar" class="fas fa-search" aria-hidden="true"></i></button>
						  </div>
						</div>
					</div>
					<div class="col-md-4"></div>
				</div>
			</div>
			<!-- Footer -->
			<div id="credit" class="container-fluid">
				<!-- Crediti dell'immagine -->
				<p style="float: left"><?php echo("Photo by <a href='$authorLink?utm_source=nexxontech_startPage&utm_medium=referral'>$autore</a> on <a href='https://unsplash.com/?utm_source=nexxontech_startPage&utm_medium=referral'>Unsplash</a> | Vedi <a href='https://unsplash.com/collections/$cat?utm_source=nexxontech_startPage&utm_medium=referral'>tutta la collezione</a>"); ?></p>
				<!-- NexxonTech Footer -->
				<p align="right">Powered with ❤️ in 🇮🇹 by <a href="http://www.nexxontech.it">NexxonTech</a></p>
			</div>
		</div>
		
		<!-- Modal di gestione dei preferiti -->
		<div id="gestionePreferiti" class="modal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Impostazioni dei preferiti</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div id="favSettingsContainer" class="modal-body">
		      	<p id="addFavBtn" class="w-100"><i class="fas fa-plus" style="float: right; color: green"></i></p><br>
		        <?php favManagerList(); ?>
		      </div>
		      <div class="modal-footer">
		        <button id="favSaveBtn" type="button" class="btn btn-primary">Salva</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		<!-- Modal con messaggio sui cookies -->
		<div id="cookieModal" class="modal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Politica sui Cookie</h5>
		      </div>
		      <div class="modal-body">
		      	<p >Questo sito utilizza dei cookie tecnici (obbligatori) per fornire i suoi servizi in maniera corretta.</p>
		      	<p>Questo messaggio ti viene mostrato per assicurarci che tu sia d'accordo con ciò.</p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" data-dismiss="modal">OK, Grazie</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		
		<!-- Importo gli script per Bootstrap -->
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
		
		<!-- Script JS della pagina -->
		<script src="res/js/index.js"></script>
		<script src="res/js/favManager.js"></script>
		
		<!-- Visualizza banner cooke -->
		<?php
		// Se è necessario mostrare il banner, avvio la modal
		if ($showAdvice == true) {
			echo("
			<script>
		    $(window).on('load',function(){
		        $('#cookieModal').modal('show');
		    });
			</script>
			");
		}
		?>
	</body>
</html>
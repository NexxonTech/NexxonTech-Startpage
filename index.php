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
		<?php
		// Carico la configurazione
		require "config.php";
		
		// Carico la API di Unsplash
		require "res/php/unsplashApi.php";
		?>
		
		<!-- Background sfocato scaricato da Unsplash -->
		<div style="height: 100%; width: 100%; overflow: hidden;"><div id="bgImage" style="background-image: url('<?php echo $backgroundUrl; ?>');"></div></div>
		
		<!-- Main area -->
		<div class="container-fluid" id="main">
			<div id="branding" class="mt-2">
				<h1 style="font-family: 'Open Sans', sans-serif; float: left;"><?php echo $homeName ?><sup><span style="font-size: 15px;">StartPage</span></sup></h1>
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
								<input id="inputBox" class="form-control form-control-sm mr-1" type="text" placeholder="Cerca con Google" style="background-color: rgba(F, F, F, 0.5);" autofocus>
							</div>
							<!-- Pulsante di ricerca -->
						  <div class="col-1 p-sm-1 p-2">
						  	<button id="startSearch" type="button" class="btn btn-primary"><i class="fas fa-search" aria-hidden="true"></i></button>
						  </div>
						</div>
					</div>
					<div class="col-md-4"></div>
				</div>
			</div>
			<!-- Footer -->
			<div id="credit" class="container-fluid">
				<!-- Crediti dell'immagine -->
				<p style="float: left"><?php echo("Photo by <a href='$authorLink?utm_source=nexxontech_startPage&utm_medium=referral'>$autore</a> on <a href='https://unsplash.com/?utm_source=nexxontech_startPage&utm_medium=referral'>Unsplash</a> | Vedi <a href='https://unsplash.com/collections/$cat'>tutta la collezione</a>"); ?></p>
				<!-- NexxonTech Footer -->
				<p align="right">Powered with ❤️ in 🇮🇹 by <a href="http://www.nexxontech.it">NexxonTech</a></p>
			</div>
		</div>
		
		<!-- Script JS della pagina -->
		<script src="res/js/index.js"></script>
		
		<!-- Importo gli script per Bootstrap -->
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	</body>
</html>
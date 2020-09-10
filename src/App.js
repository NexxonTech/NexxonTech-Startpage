import React from "react";
import "./res/css/App.css";
import axios from "axios";

import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";

import BrandBar from "./res/components/BrandBar.component";
import CentralContent from "./res/components/CentralContent.component";
import Footer from "./res/components/Footer.component";

class App extends React.Component {
	constructor(props) {
		super(props);

		var toastStatuses = { welcomeToast: true, cookieToast: true };
		if (localStorage.getItem("toastStatuses")) {
			toastStatuses = JSON.parse(localStorage.getItem("toastStatuses"));
		}

		var settings = { searchEngine: "0" };
		if (localStorage.getItem("settings")) {
			settings = JSON.parse(localStorage.getItem("settings"));
		}

		this.state = {
			toastStatuses,
			unsplashLoaded: false,
			unsplashImageData: {},
			settings,
		};
	}

	changeSettings = (settings) => {
		this.setState({ settings });
	};

	componentDidMount() {
		axios.get("https://apis.nexxontech.it/unsplash-random.php").then((res) => {
			this.setState({
				unsplashLoaded: true,
				unsplashImageData: res.data[0],
			});
		});
	}

	render() {
		if (this.state.unsplashLoaded) {
			const bgUrl = "url(" + this.state.unsplashImageData.urls.regular + ")";
			return (
				<div
					className="App"
					style={{
						background: bgUrl,
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "100%",
						overflow: "auto",
					}}
				>
					<div id="contentContainer" className="container-fluid">
						<BrandBar changeSettings={this.changeSettings} />
						<CentralContent engine={this.state.settings.searchEngine} />
					</div>
					<div id="toastArea">
						<Toast
							show={this.state.toastStatuses.welcomeToast}
							onClose={() => {
								var newStatuses = {
									...this.state.toastStatuses,
									welcomeToast: false,
								};
								localStorage.setItem(
									"toastStatuses",
									JSON.stringify(newStatuses)
								);
								this.setState({ toastStatuses: newStatuses });
							}}
						>
							<Toast.Header>
								<div style={{ width: "100%" }}>
									Benvenuto!
									<img
										src="holder.js/20x20?text=%20"
										className="rounded mr-2"
										alt=""
										style={{ float: "right" }}
									/>
								</div>
							</Toast.Header>
							<Toast.Body>
								<p>Benvenuto nella nuova versione di NexxonTech Startpage!</p>
								<p>
									La app si è aggiornata per essere ancora più veloce ed
									elegante, perfetta per ogni PC.
								</p>
								<p style={{ marginBottom: 0 }}>
									Provala subito per scoprire tutte le novità e per
									personalizzarla secondo i tuoi gusti.
								</p>
							</Toast.Body>
						</Toast>
						<Toast
							show={this.state.toastStatuses.cookieToast}
							onClose={() => {
								var newStatuses = {
									...this.state.toastStatuses,
									cookieToast: false,
								};
								localStorage.setItem(
									"toastStatuses",
									JSON.stringify(newStatuses)
								);
								this.setState({ toastStatuses: newStatuses });
							}}
						>
							<Toast.Header>
								<div style={{ width: "100%" }}>
									Cookie notice
									<img
										src="holder.js/20x20?text=%20"
										className="rounded mr-2"
										alt=""
										style={{ float: "right" }}
									/>
								</div>
							</Toast.Header>
							<Toast.Body>
								<p>Grazie per esserti interessato a NexxonTech Startpage.</p>
								<p>
									Ti mostriamo questo messaggio per ricordarti che questa app fa
									uso di cookie (API localStorage, per la precisione) al fine di
									conservare informazioni necessarie al funzionamento stesso del
									software.
								</p>
								<p style={{ marginBottom: 0 }}>
									Non sono necessarie operazioni da parte tua.
								</p>
							</Toast.Body>
						</Toast>
					</div>
					<Footer photoData={this.state.unsplashImageData} />
				</div>
			);
		} else {
			return (
				<div id="preloader">
					<div id="preloader-content">
						<Spinner animation="border" role="status"></Spinner>
					</div>
				</div>
			);
		}
	}
}

export default App;

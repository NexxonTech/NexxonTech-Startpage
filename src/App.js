import React from "react";
import "./res/css/App.css";
import axios from "axios";

import locales from "./res/locale";

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
			toastStatuses = {
				...toastStatuses,
				...JSON.parse(localStorage.getItem("toastStatuses")),
			};
		}

		var settings = {
			searchEngine: "0",
			language: "en",
			startpageTitle: "NexxonTech",
			twelveHours: "false",
		};
		if (localStorage.getItem("settings")) {
			settings = {
				...settings,
				...JSON.parse(localStorage.getItem("settings")),
			};
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
						<CentralContent
							engine={this.state.settings.searchEngine}
							lang={this.state.settings.language}
							twelveHours={this.state.settings.twelveHours}
						/>
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
									{locales[this.state.settings.language].toasts.welcome.title}
									<img
										src="holder.js/20x20?text=%20"
										className="rounded mr-2"
										alt=""
										style={{ float: "right" }}
									/>
								</div>
							</Toast.Header>
							<Toast.Body>
								<p>
									{
										locales[this.state.settings.language].toasts.welcome
											.paragraphs[0]
									}
								</p>
								<p>
									{
										locales[this.state.settings.language].toasts.welcome
											.paragraphs[1]
									}
								</p>
								<p style={{ marginBottom: 0 }}>
									{
										locales[this.state.settings.language].toasts.welcome
											.paragraphs[2]
									}
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
									{locales[this.state.settings.language].toasts.cookie.title}
									<img
										src="holder.js/20x20?text=%20"
										className="rounded mr-2"
										alt=""
										style={{ float: "right" }}
									/>
								</div>
							</Toast.Header>
							<Toast.Body>
								<p>
									{
										locales[this.state.settings.language].toasts.cookie
											.paragraphs[0]
									}
								</p>
								<p>
									{
										locales[this.state.settings.language].toasts.cookie
											.paragraphs[1]
									}
								</p>
								<p style={{ marginBottom: 0 }}>
									{
										locales[this.state.settings.language].toasts.cookie
											.paragraphs[2]
									}
								</p>
							</Toast.Body>
						</Toast>
					</div>
					<Footer
						photoData={this.state.unsplashImageData}
						lang={this.state.settings.language}
					/>
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

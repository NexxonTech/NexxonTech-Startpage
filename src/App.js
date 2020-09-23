import React from "react";
import "./res/css/App.css";
import axios from "axios";

import config from "./config/default";

import Spinner from "react-bootstrap/Spinner";

import BrandBar from "./res/components/BrandBar.component";
import CentralContent from "./res/components/CentralContent.component";
import Toasts from './res/components/Toasts.component'
import Footer from "./res/components/Footer.component";

class App extends React.Component {
	constructor(props) {
		super(props);

		var settings = config.settings;
		if (localStorage.getItem("settings")) {
			settings = {
				...settings,
				...JSON.parse(localStorage.getItem("settings")),
			};
		}

		this.state = {
			unsplashLoaded: false,
			unsplashImageData: {},
			settings,
		};
	}

	changeSettings = (settings) => {
		this.setState({ settings });
	};

	componentDidMount() {
		axios.get(config.unsplashApiUrl).then((res) => {
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
							dateFormat={this.state.settings.dateFormat}
						/>
					</div>
					<Toasts lang={this.state.settings.language} />
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

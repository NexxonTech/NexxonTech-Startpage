import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faArrowCircleRight,
	faCalculator,
} from "@fortawesome/free-solid-svg-icons";

import locales from "../locale";

export default class CentralComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userSearch: "",
			hour: "00:00:00",
			date: "01/01/2000",
			searchStatus: true,
			searchFunction: 0,
		};
	}

	currentTime = () => {
		var hourClock = "";
		var dateClock = "";

		const date = new Date();

		var hour = date.getHours();
		const min = this.updateTime(date.getMinutes());
		const sec = this.updateTime(date.getSeconds());
		const day = this.updateTime(date.getDate());
		const month = this.updateTime(date.getMonth() + 1);
		const year = date.getFullYear();

		if (this.props.twelveHours === "true") {
			const ampm = hour >= 12 ? "PM" : "AM";
			hour = hour > 12 ? this.updateTime(hour - 12) : this.updateTime(hour);
			hourClock = hour + ":" + min + ":" + sec + " " + ampm;
		} else {
			hour = this.updateTime(hour);
			hourClock = hour + ":" + min + ":" + sec;
		}

		switch (this.props.dateFormat) {
			case "DMY":
				dateClock = day + "/" + month + "/" + year;
				break;
			case "YMD":
				dateClock = year + "/" + month + "/" + day;
				break;
			case "MDY":
				dateClock = month + "/" + day + "/" + year;
				break;
			default:
				dateClock = day + "/" + month + "/" + year;
				break;
		}

		this.setState({
			hour: hourClock,
			date: dateClock,
		});
	};

	updateTime = (k) => {
		if (k < 10) {
			return "0" + k;
		} else {
			return k;
		}
	};

	startSearch = () => {
		if (this.state.userSearch !== "") {
			if (this.state.searchStatus) {
				const userSearchEncoded = encodeURIComponent(this.state.userSearch);
				if (this.state.searchFunction === 0) {
					if (this.props.engine === "0") {
						const ddgurl = "https://duckduckgo.com/?t=nexxontech_Startpage&q=";
						window.location = ddgurl + userSearchEncoded;
					} else {
						const gurl =
							"https://www.google.com/search?source=nexxontech_Startpage&q=";
						window.location = gurl + userSearchEncoded;
					}
				} else if (this.state.searchFunction === 1) {
					const wolframurl = "https://www.wolframalpha.com/input/?i=";
					window.location = wolframurl + userSearchEncoded;
				}
			} else {
				if (
					this.state.userSearch.startsWith("http://") ||
					this.state.userSearch.startsWith("https://")
				) {
					window.location = encodeURIComponent(this.state.userSearch);
				} else {
					window.location =
						"https://" + encodeURIComponent(this.state.userSearch);
				}
			}
		} else {
			this.setState({ searchStatus: !this.state.searchStatus });
		}
	};

	rotateFuction = () => {
		var newFunction = 0;
		switch (this.state.searchFunction) {
			case 0:
				newFunction = 1;
				break;
			case 1:
				newFunction = 0;
				break;
			default:
				newFunction = 0;
				break;
		}
		this.setState({ searchFunction: newFunction });
	};

	componentDidMount() {
		this.currentTime();
		this.clock = setInterval(() => {
			this.currentTime();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.clock);
	}

	render() {
		var placeholder = "";
		var icon = null;
		if (this.state.searchStatus) {
			if (this.state.searchFunction === 0) {
				if (this.props.engine === "0") {
					placeholder = locales[this.props.lang].searchWith.duckduckgo;
					icon = faSearch;
				} else {
					placeholder = locales[this.props.lang].searchWith.google;
					icon = faSearch;
				}
			} else if (this.state.searchFunction === 1) {
				placeholder = locales[this.props.lang].searchWith.wolfram;
				icon = faCalculator;
			}
		} else {
			placeholder = locales[this.props.lang].searchWith.url;
			icon = faArrowCircleRight;
		}

		return (
			<div id="centralContent">
				<div id="clock" className="col">
					<h1 className="display-1" id="ora">
						{this.state.hour}
					</h1>
					<h1 className="display-4" id="data">
						{this.state.date}
					</h1>
				</div>
				<div id="searchArea" className="row">
					<div className="col-10">
						<input
							id="inputBox"
							className="form-control form-control-sm mr-1"
							type="text"
							placeholder={placeholder}
							value={this.state.userSearch}
							onChange={(e) => this.setState({ userSearch: e.target.value })}
							onKeyDown={(e) => {
								if (e.which === 13) {
									e.preventDefault();
									this.startSearch();
								} else if (e.which === 9) {
									e.preventDefault();
									this.rotateFuction();
								}
							}}
							style={{
								backgroundColor: "rgba(F, F, F, 0.5)",
								height: "100%",
							}}
							autoComplete="off"
							autoFocus
						></input>
					</div>
					<div className="col-2">
						<button
							id="startSearch"
							type="button"
							className="btn btn-primary"
							style={{ width: "100%" }}
							onClick={this.startSearch}
						>
							<FontAwesomeIcon icon={icon} />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

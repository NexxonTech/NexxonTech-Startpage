import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class CentralComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userSearch: "",
			hour: "00:00:00",
			date: "01/01/2000",
		};
	}

	currentTime = () => {
		const date = new Date();

		const hour = this.updateTime(date.getHours());
		const min = this.updateTime(date.getMinutes());
		const sec = this.updateTime(date.getSeconds());
		const day = this.updateTime(date.getDate());
		const month = this.updateTime(date.getMonth() + 1);
		const year = date.getFullYear();

		this.setState({
			hour: hour + ":" + min + ":" + sec,
			date: day + "/" + month + "/" + year,
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
		if (this.props.engine === "0") {
			const ddgurl = "https://duckduckgo.com/?t=nexxontech_Startpage&q=";
			window.location = ddgurl + this.state.userSearch;
		} else {
			const gurl =
				"https://www.google.com/search?source=nexxontech_Startpage&q=";
			window.location = gurl + this.state.userSearch;
		}
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
		var placeholder =
			this.props.engine === "0" ? "Cerca con DuckDuckGo" : "Cerca con Google";

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
							onKeyPress={(e) => {
								if (e.charCode === 13) {
									this.startSearch();
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
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

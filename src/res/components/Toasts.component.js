import React from "react";

import { StartPageStore } from "../../store.js";
import getString from "../locale/getString";

import Toast from "react-bootstrap/Toast";

export default class Toasts extends React.Component {
	static contextType = StartPageStore;

	constructor(props, context) {
		super(props);

		var toastStatuses = {
			welcomeToast: true,
			cookieToast: true,
			reminderToast: false,
		};
		if (localStorage.getItem("toastStatuses")) {
			toastStatuses = {
				...toastStatuses,
				...JSON.parse(localStorage.getItem("toastStatuses")),
			};
		}

		toastStatuses.reminderToast =
			context.quickNote.reminder === "true" ? true : false;

		this.state = {
			toastStatuses,
		};
	}
	render() {
		console.log(this.context.settings.language);
		return (
			<div id="toastArea">
				<Toast
					show={this.state.toastStatuses.welcomeToast}
					onClose={() => {
						var newStatuses = {
							...this.state.toastStatuses,
							welcomeToast: false,
						};
						localStorage.setItem("toastStatuses", JSON.stringify(newStatuses));
						this.setState({ toastStatuses: newStatuses });
					}}
				>
					<Toast.Header>
						<div style={{ width: "100%" }}>
							{
								getString(this.context.settings.language, "toasts", "welcome")
									.title
							}
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
								getString(this.context.settings.language, "toasts", "welcome")
									.paragraphs[0]
							}
						</p>
						<p>
							{
								getString(this.context.settings.language, "toasts", "welcome")
									.paragraphs[1]
							}
						</p>
						<p style={{ marginBottom: 0 }}>
							{
								getString(this.context.settings.language, "toasts", "welcome")
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
						localStorage.setItem("toastStatuses", JSON.stringify(newStatuses));
						this.setState({ toastStatuses: newStatuses });
					}}
				>
					<Toast.Header>
						<div style={{ width: "100%" }}>
							{
								getString(this.context.settings.language, "toasts", "cookie")
									.title
							}
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
								getString(this.context.settings.language, "toasts", "cookie")
									.paragraphs[0]
							}
						</p>
						<p>
							{
								getString(this.context.settings.language, "toasts", "cookie")
									.paragraphs[1]
							}
						</p>
						<p style={{ marginBottom: 0 }}>
							{
								getString(this.context.settings.language, "toasts", "cookie")
									.paragraphs[2]
							}
						</p>
					</Toast.Body>
				</Toast>
				<Toast
					show={this.state.toastStatuses.reminderToast}
					onClose={() => {
						var newStatuses = {
							...this.state.toastStatuses,
							reminderToast: false,
						};
						this.setState({ toastStatuses: newStatuses });
					}}
				>
					<Toast.Header className="bg-warning text-dark">
						<div style={{ width: "100%" }}>
							{getString(
								this.context.settings.language,
								"quickNotes",
								"reminderToastTitle"
							)}
							<img
								src="holder.js/20x20?text=%20"
								className="rounded mr-2"
								alt=""
								style={{ float: "right" }}
							/>
						</div>
					</Toast.Header>
					<Toast.Body>
						<p className="mb-0">{this.context.quickNote.text}</p>
					</Toast.Body>
				</Toast>
			</div>
		);
	}
}

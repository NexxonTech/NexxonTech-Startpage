import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faStickyNote } from "@fortawesome/free-solid-svg-icons";

import { StartPageStore } from "../../store.js";

import Sidebar from "./Sidebar.component";

import getString from "../locale/getString";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class BrandBar extends React.Component {
	static contextType = StartPageStore;

	constructor(props, context) {
		super(props);

		var quickNote = { ...context.quickNote };
		quickNote.reminder = quickNote.reminder === "true" ? true : false;

		this.state = {
			showSidebar: false,
			quickNote,
		};
	}

	render() {
		return (
			<div id="branding" className="mt-2 w-100">
				<h1>
					{this.context.settings.startpageTitle}
					<sup>
						<span style={{ fontSize: "15px" }}>StartPage</span>
					</sup>
				</h1>
				<Button
					onClick={() => this.setState({ showSidebar: true })}
					style={{
						padding: 0,
						border: "none",
						background: "none",
						margin: "10px",
						color: "white",
						float: "right",
					}}
				>
					<FontAwesomeIcon icon={faBars} />
				</Button>
				<Button
					id="buttonNote"
					onClick={() => this.setState({ quickNoteShow: true })}
					style={{
						padding: 0,
						border: "none",
						background: "none",
						margin: "10px",
						color: "white",
					}}
				>
					<FontAwesomeIcon icon={faStickyNote} />
				</Button>

				<Modal
					show={this.state.quickNoteShow}
					onHide={() => this.setState({ quickNoteShow: false })}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>
							{getString(this.context.settings.language, "quickNotes", "title")}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Control
									as="textarea"
									value={this.state.quickNote.text}
									onChange={(e) => {
										this.setState({
											quickNote: {
												...this.state.quickNote,
												text: e.target.value,
											},
										});
									}}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Check
									type="switch"
									id="custom-switch"
									onChange={(e) => {
										this.setState({
											quickNote: {
												...this.state.quickNote,
												reminder: e.target.checked,
											},
										});
									}}
									checked={
										this.state.quickNote.text !== "" &&
										this.state.quickNote.reminder
									}
									disabled={this.state.quickNote.text === ""}
									label={getString(
										this.context.settings.language,
										"quickNotes",
										"reminderCheckBox"
									)}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="primary"
							onClick={() => {
								var quickNote = { ...this.state.quickNote };
								quickNote.reminder =
									this.state.quickNote.text !== "" && quickNote.reminder
										? "true"
										: "false";
								localStorage.setItem(
									"quickNoteData",
									JSON.stringify(quickNote)
								);
								this.context.changeNote(quickNote);
								this.setState({ quickNoteShow: false });
							}}
						>
							{getString(this.context.settings.language, "quickNotes", "save")}
						</Button>
					</Modal.Footer>
				</Modal>
				<Sidebar
					show={this.state.showSidebar}
					onClose={() => this.setState({ showSidebar: false })}
				/>
			</div>
		);
	}
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faStickyNote } from "@fortawesome/free-solid-svg-icons";

import { StartPageStore } from "../../store.js";

import Sidebar from "./Sidebar.component";

import locales from "../locale";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class BrandBar extends React.Component {
	static contextType = StartPageStore;

	constructor(props, context) {
		super(props);

		var quickNote = "";
		if (localStorage.getItem("quickNote")) {
			quickNote = localStorage.getItem("quickNote");
		}

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
							{locales[this.context.settings.language].quickNotes.title}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Control
									as="textarea"
									value={this.state.quickNote}
									onChange={(e) => {
										this.setState({
											quickNote: e.target.value,
										});
									}}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="primary"
							onClick={() => {
								localStorage.setItem("quickNote", this.state.quickNote);
								this.setState({ quickNoteShow: false });
							}}
						>
							{locales[this.context.settings.language].quickNotes.save}
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

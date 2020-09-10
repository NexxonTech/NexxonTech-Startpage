import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faCogs,
	faPlusCircle,
	faTrash,
	faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default class BrandBar extends React.Component {
	constructor(props) {
		super(props);

		var bookmarks = [
			{ key: uuidv4(), title: "DuckDuckGo", url: "http://duckduckgo.com" },
			{ key: uuidv4(), title: "NexxonTech", url: "http://www.nexxontech.it" },
			{ key: uuidv4(), title: "Wikipedia", url: "http://it.wikipedia.org" },
		];
		if (localStorage.getItem("bookmarks")) {
			bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		}

		var settings = { searchEngine: "0" };
		if (localStorage.getItem("settings")) {
			settings = JSON.parse(localStorage.getItem("settings"));
		}

		this.state = {
			bookmarks,
			modalShow: false,
			settingsShow: false,
			settings,
		};
	}

	render() {
		var bookmarksList = [];
		bookmarksList = this.state.bookmarks.map((bookmark) => {
			return (
				<Dropdown.Item key={bookmark.key} href={bookmark.url}>
					<img
						src={"https://www.google.com/s2/favicons?domain=" + bookmark.url}
						alt=""
					/>
					&nbsp;
					{bookmark.title}
				</Dropdown.Item>
			);
		});

		var formRows = [];
		formRows = this.state.bookmarks.map((bookmark, index) => {
			return (
				<Form.Row
					key={bookmark.key}
					style={{ paddingTop: "10px", paddingBottom: "10px" }}
				>
					<Col xs={4} style={{ paddingRight: "5px" }}>
						<Form.Label>Titolo del segnalibro</Form.Label>
						<Form.Control
							value={bookmark.title}
							onChange={(e) => {
								var newBookmarks = [...this.state.bookmarks];
								newBookmarks[index].title = e.target.value;
								this.setState({ bookmarks: newBookmarks });
							}}
							placeholder="Titolo del segnalibro"
						/>
					</Col>
					<Col xs={7} style={{ paddingLeft: "5px" }}>
						<Form.Label>URL del segnalibro</Form.Label>
						<Form.Control
							value={bookmark.url}
							onChange={(e) => {
								var newBookmarks = [...this.state.bookmarks];
								newBookmarks[index].url = e.target.value;
								this.setState({ bookmarks: newBookmarks });
							}}
							placeholder="URL del segnalibro"
						/>
					</Col>
					<Col xs={1}>
						<Button
							style={{
								padding: 0,
								border: "none",
								background: "none",
								color: "red",
								float: "right",
							}}
							onClick={() => {
								var newBookmarks = [...this.state.bookmarks];
								newBookmarks.splice(index, 1);
								this.setState({ bookmarks: newBookmarks });
							}}
						>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</Col>
				</Form.Row>
			);
		});

		return (
			<div id="branding" className="mt-2 w-100">
				<h1>
					<b>Nexxon</b>Tech
					<sup>
						<span style={{ fontSize: "15px" }}>StartPage</span>
					</sup>
				</h1>
				<Dropdown id="menuPreferiti">
					<Dropdown.Toggle
						style={{
							padding: 0,
							border: "none",
							background: "none",
							margin: "10px",
							color: "white",
						}}
					>
						<FontAwesomeIcon icon={faBars} />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{bookmarksList}
						<Dropdown.Divider />
						<Dropdown.Item onClick={() => this.setState({ modalShow: true })}>
							<FontAwesomeIcon icon={faBookmark} /> Gestione segnalibri
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => this.setState({ settingsShow: true })}
						>
							<FontAwesomeIcon icon={faCogs} /> Impostazioni
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Modal
					show={this.state.modalShow}
					onHide={() => this.setState({ modalShow: false })}
				>
					<Modal.Header closeButton>
						<Modal.Title>Modifica i segnalibri</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Button
							variant="primary"
							size="sm"
							style={{ marginBottom: "20px" }}
							onClick={() => {
								this.setState({
									bookmarks: [
										...this.state.bookmarks,
										{
											key: uuidv4(),
											title: "",
											url: "",
										},
									],
								});
							}}
						>
							<FontAwesomeIcon icon={faPlusCircle} />
							&nbsp;Nuovo
						</Button>
						<Form>{formRows}</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="primary"
							onClick={() => {
								localStorage.setItem(
									"bookmarks",
									JSON.stringify(this.state.bookmarks)
								);
								this.setState({ modalShow: false });
							}}
						>
							Salva
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={this.state.settingsShow}
					onHide={() => this.setState({ settingsShow: false })}
				>
					<Modal.Header closeButton>
						<Modal.Title>Impostazioni</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Motore di ricerca</Form.Label>
								<Form.Control
									value={this.state.settings.searchEngine}
									selectedvalue={this.state.settings.searchEngine}
									onChange={(e) =>
										this.setState({
											settings: {
												...this.state.settings,
												searchEngine: e.target.value,
											},
										})
									}
									as="select"
								>
									<option value="0">DuckDuckGo (Consigliato)</option>
									<option value="1">Google</option>
								</Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="primary"
							onClick={() => {
								localStorage.setItem(
									"settings",
									JSON.stringify(this.state.settings)
								);
								this.props.changeSettings(this.state.settings);
								this.setState({ settingsShow: false });
							}}
						>
							Salva
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

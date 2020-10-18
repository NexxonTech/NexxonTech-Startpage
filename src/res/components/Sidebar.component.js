import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCogs,
	faBookmark,
	faTrash,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import bookmarkIllustration from "../img/bookmark.png";

import locales from "../locale";
import config from "../../config/default";
import { StartPageStore } from "../../store.js";

import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default class Sidebar extends React.Component {
	static contextType = StartPageStore;

	constructor(props, context) {
		super(props);

		var settings = context.settings;

		var bookmarks = config.bookmarks;
		if (localStorage.getItem("bookmarks")) {
			bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		}

		this.state = {
			modalShow: false,
			settingsShow: false,
			showSidebar: false,
			settings,
			bookmarks,
		};
	}

	render() {
		var bookmarksList = [];
		bookmarksList = this.state.bookmarks.map((bookmark) => {
			return (
				<ListGroup.Item key={bookmark.key} href={bookmark.url} action>
					<img
						src={"https://www.google.com/s2/favicons?domain=" + bookmark.url}
						alt=""
						style={{ marginRight: "2px" }}
					/>
					&nbsp; {bookmark.title}
				</ListGroup.Item>
			);
		});

		var formRows = [];
		formRows = this.state.bookmarks.map((bookmark, index) => {
			var disableBookmarkEdit = false;
			if (bookmark.locked === "true") {
				disableBookmarkEdit = true;
			}

			return (
				<Form.Row
					key={bookmark.key}
					style={{ paddingTop: "10px", paddingBottom: "10px" }}
				>
					<Col xs={4} style={{ paddingRight: "5px" }}>
						<Form.Label>
							{
								locales[this.state.settings.language].bookmarksManagement
									.bookmarkTitle
							}
						</Form.Label>
						<Form.Control
							value={bookmark.title}
							onChange={(e) => {
								if (!disableBookmarkEdit) {
									var newBookmarks = [...this.state.bookmarks];
									newBookmarks[index].title = e.target.value;
									this.setState({ bookmarks: newBookmarks });
								}
							}}
							placeholder={
								locales[this.state.settings.language].bookmarksManagement
									.bookmarkTitle
							}
							disabled={disableBookmarkEdit}
							title={
								disableBookmarkEdit
									? locales[this.state.settings.language].bookmarksManagement
											.editDisabled
									: ""
							}
						/>
					</Col>
					<Col xs={7} style={{ paddingLeft: "5px" }}>
						<Form.Label>
							{locales[this.state.settings.language].bookmarksManagement.url}
						</Form.Label>
						<Form.Control
							value={bookmark.url}
							onChange={(e) => {
								if (!disableBookmarkEdit) {
									var newBookmarks = [...this.state.bookmarks];
									newBookmarks[index].url = e.target.value;
									this.setState({ bookmarks: newBookmarks });
								}
							}}
							placeholder={
								locales[this.state.settings.language].bookmarksManagement.url
							}
							disabled={disableBookmarkEdit}
							title={
								disableBookmarkEdit
									? locales[this.state.settings.language].bookmarksManagement
											.editDisabled
									: ""
							}
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
								if (!disableBookmarkEdit) {
									var newBookmarks = [...this.state.bookmarks];
									newBookmarks.splice(index, 1);
									this.setState({ bookmarks: newBookmarks });
								}
							}}
							disabled={disableBookmarkEdit}
							title={
								disableBookmarkEdit
									? locales[this.state.settings.language].bookmarksManagement
											.editDisabled
									: ""
							}
						>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</Col>
				</Form.Row>
			);
		});

		const sidebarTitle =
			this.state.settings.yourName !== "" ? (
				<span>
					{locales[this.state.settings.language].greetings.withName}{" "}
					{this.state.settings.yourName}!
				</span>
			) : (
				<span>
					{locales[this.state.settings.language].greetings.withoutName}!
				</span>
			);

		if (this.props.show) {
			return (
				<div
					id="sidebarContainer"
					onClick={(e) => {
						if (e.target.id === "sidebarContainer") {
							this.props.onClose();
						}
					}}
				>
					<div id="sidebar" className="d-flex flex-column">
						<div className="text-center p-3">
							<img
								src={bookmarkIllustration}
								style={{ height: "150px" }}
								alt="Rocket"
							/>
							<p className="h4 pt-2">{sidebarTitle}</p>
						</div>
						<ListGroup variant="flush" style={{ overflowY: "scroll", flex: 1 }}>
							{bookmarksList}
						</ListGroup>
						<ListGroup
							variant="flush"
							style={{
								width: "100%",
							}}
						>
							<ListGroup.Item
								variant="primary"
								action
								onClick={() => this.setState({ modalShow: true })}
							>
								<FontAwesomeIcon icon={faBookmark} />
								&nbsp;{" "}
								{
									locales[this.state.settings.language].sidebarBottom
										.manageBookmarks
								}
							</ListGroup.Item>
							<ListGroup.Item
								variant="secondary"
								action
								onClick={() => this.setState({ settingsShow: true })}
							>
								<FontAwesomeIcon icon={faCogs} />
								&nbsp;{" "}
								{locales[this.state.settings.language].sidebarBottom.settings}
							</ListGroup.Item>
						</ListGroup>
					</div>

					<Modal
						show={this.state.modalShow}
						onHide={() => this.setState({ modalShow: false })}
					>
						<Modal.Header closeButton>
							<Modal.Title>
								{
									locales[this.state.settings.language].bookmarksManagement
										.title
								}
							</Modal.Title>
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
												locked: "false",
											},
										],
									});
								}}
							>
								<FontAwesomeIcon icon={faPlusCircle} />
								&nbsp;
								{locales[this.state.settings.language].bookmarksManagement.new}
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
								{locales[this.state.settings.language].bookmarksManagement.save}
							</Button>
						</Modal.Footer>
					</Modal>
					<Modal
						show={this.state.settingsShow}
						onHide={() => this.setState({ settingsShow: false })}
					>
						<Modal.Header closeButton>
							<Modal.Title>
								{locales[this.state.settings.language].settings.title}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
							>
								<Form.Group>
									<Form.Label>
										{locales[this.state.settings.language].settings.yourName}
									</Form.Label>
									<Form.Control
										type="text"
										value={this.state.settings.yourName}
										onChange={(e) => {
											this.setState({
												settings: {
													...this.state.settings,
													yourName: e.target.value,
												},
											});
										}}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										{
											locales[this.state.settings.language].settings
												.searchEngine
										}
									</Form.Label>
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
										<option value="0">
											DuckDuckGo (
											{
												locales[this.state.settings.language].settings
													.recommended
											}
											)
										</option>
										<option value="1">Google</option>
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										{locales[this.state.settings.language].settings.languages}
									</Form.Label>
									<Form.Control
										value={this.state.settings.language}
										selectedvalue={this.state.settings.language}
										onChange={(e) =>
											this.setState({
												settings: {
													...this.state.settings,
													language: e.target.value,
												},
											})
										}
										as="select"
									>
										<option value="en">English</option>
										<option value="it">Italiano</option>
										<option value="pt">Português</option>
										<option value="fr">Français</option>
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										{locales[this.state.settings.language].settings.twelveHours}
									</Form.Label>
									<Form.Control
										value={this.state.settings.twelveHours}
										selectedvalue={this.state.settings.twelveHours}
										onChange={(e) =>
											this.setState({
												settings: {
													...this.state.settings,
													twelveHours: e.target.value,
												},
											})
										}
										as="select"
									>
										<option value="false">24h</option>
										<option value="true">12h</option>
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										{
											locales[this.state.settings.language].settings
												.secondsInClock
										}
									</Form.Label>
									<Form.Control
										value={this.state.settings.secondsInClock}
										selectedvalue={
											this.state.settings.secondsInClocksecondsInClock
										}
										onChange={(e) =>
											this.setState({
												settings: {
													...this.state.settings,
													secondsInClock: e.target.value,
												},
											})
										}
										as="select"
									>
										<option value="true">On</option>
										<option value="false">Off</option>
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										{locales[this.state.settings.language].settings.dateFormat}
									</Form.Label>
									<Form.Control
										value={this.state.settings.dateFormat}
										selectedvalue={this.state.settings.dateFormat}
										onChange={(e) =>
											this.setState({
												settings: {
													...this.state.settings,
													dateFormat: e.target.value,
												},
											})
										}
										as="select"
									>
										<option value="DMY">DD/MM/YYYY (DMY)</option>
										<option value="YMD">YYYY/MM/DD (YMD)</option>
										<option value="MDY">MM/DD/YYYY (MDY)</option>
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										{
											locales[this.state.settings.language].settings
												.startpageTitle
										}
									</Form.Label>
									<Form.Control
										type="text"
										value={this.state.settings.startpageTitle}
										onChange={(e) => {
											this.setState({
												settings: {
													...this.state.settings,
													startpageTitle: e.target.value,
												},
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
									localStorage.setItem(
										"settings",
										JSON.stringify(this.state.settings)
									);
									this.context.changeSettings(this.state.settings);
									this.setState({ settingsShow: false });
								}}
							>
								{locales[this.state.settings.language].settings.save}
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			);
		} else {
			return null;
		}
	}
}

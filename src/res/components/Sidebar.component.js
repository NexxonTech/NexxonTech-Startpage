import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faBookmark } from "@fortawesome/free-solid-svg-icons";

import bookmarkIllustration from "../img/bookmark.png";

import config from "../../config/default";

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		var bookmarks = config.bookmarks;
		if (localStorage.getItem("bookmarks")) {
			bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		}

		this.state = {
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
							<p className="h4 pt-2">Ciao, Riccardo!</p>
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
							<ListGroup.Item variant="primary" action>
								<FontAwesomeIcon icon={faBookmark} />
								&nbsp; Bookmarks
							</ListGroup.Item>
							<ListGroup.Item variant="secondary" action>
								<FontAwesomeIcon icon={faCogs} />
								&nbsp; Settings
							</ListGroup.Item>
						</ListGroup>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

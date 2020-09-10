import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default class Footer extends React.Component {
	render() {
		const photoData = this.props.photoData;

		return (
			<div id="footer">
				<p id="credit">
					Foto di{" "}
					<a
						href={
							photoData.user.links.html +
							"?utm_source=nexxontech_startPage&utm_medium=referral"
						}
					>
						{photoData.user.name}
					</a>{" "}
					su{" "}
					<a href="https://unsplash.com/?utm_source=nexxontech_startPage&utm_medium=referral">
						Unsplash
					</a>
				</p>
				<p id="poweredBy" style={{ float: "right" }}>
					Powered with <FontAwesomeIcon icon={faHeart} /> by{" "}
					<a href="https://www.nexxontech.it">NexxonTech</a>
				</p>
			</div>
		);
	}
}

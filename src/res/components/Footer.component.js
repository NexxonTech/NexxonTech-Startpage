import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { StartPageStore } from "../../store.js";
import locales from "../locale";

export default class Footer extends React.Component {
	static contextType = StartPageStore;

	render() {
		const photoData = this.context.unsplashImageData;

		return (
			<div id="footer">
				<p id="credit">
					{locales[this.context.settings.language].footer.photoBy + " "}
					<a
						href={
							photoData.user.links.html +
							"?utm_source=nexxontech_startPage&utm_medium=referral"
						}
					>
						{photoData.user.name}
					</a>{" "}
					{locales[this.context.settings.language].footer.on + " "}
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

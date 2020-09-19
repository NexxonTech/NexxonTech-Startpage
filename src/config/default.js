import { v4 as uuidv4 } from "uuid";

export default {
	bookmarks: [
		{
			key: uuidv4(),
			title: "DuckDuckGo",
			url: "http://duckduckgo.com",
		},
		{
			key: uuidv4(),
			title: "NexxonTech",
			url: "http://www.nexxontech.it",
		},
		{
			key: uuidv4(),
			title: "Wikipedia",
			url: "http://www.wikipedia.org",
		},
	],
	settings: {
		searchEngine: "0",
		language: "en",
		startpageTitle: "NexxonTech",
		twelveHours: "false",
	},
};

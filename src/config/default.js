import { v4 as uuidv4 } from "uuid";

export default {
	bookmarks: [
		{
			key: uuidv4(),
			title: "DuckDuckGo",
			url: "http://duckduckgo.com",
			locked: "false",
		},
		{
			key: uuidv4(),
			title: "NexxonTech",
			url: "http://www.nexxontech.it",
			locked: "false",
		},
		{
			key: uuidv4(),
			title: "Wikipedia",
			url: "http://www.wikipedia.org",
			locked: "false",
		},
	],
	settings: {
		searchEngine: "0",
		language: "en",
		startpageTitle: "NexxonTech",
		twelveHours: "false",
		secondsInClock: "true",
		dateFormat: "DMY",
	},
	unsplashApiUrl: "https://apis.nexxontech.it/unsplash-random.php",
};

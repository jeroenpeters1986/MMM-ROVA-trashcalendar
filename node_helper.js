const axios = require('axios');
const node_helper = require("node_helper");

module.exports = node_helper.create({
	socketNotificationReceived: function (notification, payload) {
		const self = this;

		if (notification == "GET_TRASH_DATA") {

			let returnData = {error: true};

			axios.get("https://www.rova.nl/api/TrashCalendar/GetCalendarItems?portal=inwoners", {
				headers: {
					Cookie: "RovaLc_inwoners=" + payload.cookieContent
				}
			})
			.then(function (response) {

				console.log(response);
				// TODO: handle bad responses
				if (!error && response.statusCode == 200)
				{
					console.log("MOOI");
					returnData = JSON.parse(response);
				}
				self.sendSocketNotification("TRASH_DATA", returnData);
			})
			.catch(function (error) {
				console.log("ERRORR");
				console.log(error);
				self.sendSocketNotification("TRASH_DATA", returnData);
			});
		}
	}
});
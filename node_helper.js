const request = require('request');
const node_helper = require("node_helper");

module.exports = node_helper.create({
	socketNotificationReceived: function(notification, payload)
	{
		const self = this;

		if(notification === "GET_TRASH_DATA")
		{
			const rova_url = 'https://www.rova.nl/api/TrashCalendar/GetCalendarItems?portal=inwoners';
			const cookiejar = request.jar();
			const cookie = request.cookie('RovaLc_inwoners=' + payload.cookieContent);
			console.log(cookie);
			cookiejar.setCookie(cookie, rova_url);

			let returnData = {error: true};

			request({
				method: 'GET',
				uri: rova_url,
				jar: cookiejar
			}, function (error, response, body)
			{
				console.log(body);
				if (!error && response.statusCode == 200)
				{
					returnData = JSON.parse(body);
				}

				self.sendSocketNotification("TRASH_DATA", returnData);
			});
		}
	},
});

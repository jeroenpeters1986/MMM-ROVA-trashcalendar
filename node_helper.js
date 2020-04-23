const request = require('request');
const node_helper = require("node_helper");

module.exports = node_helper.create({
	socketNotificationReceived: function(notification, payload)
	{
		const self = this;

		if(notification === "GET_TRASH_DATA")
		{
			const rova_url = 'https://www.rova.nl/api/TrashCalendar/GetCalendarItems?portal=inwoners';
			let returnData = {error: true};

			request.cookie('RovaLc_inwoners=' + payload.cookieContent);
			request({
				method: 'GET',
				uri: rova_url,
			}, function (error, response, body)
			{
				console.log(response);
				if (!error && response.statusCode == 200)
				{
					returnData = JSON.parse(body);
				}

				self.sendSocketNotification("TRASH_DATA", returnData);
			});
		}
	},
});

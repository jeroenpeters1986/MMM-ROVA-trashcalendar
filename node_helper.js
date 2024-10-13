const node_helper = require("node_helper");

module.exports = node_helper.create({
	socketNotificationReceived: function(notification, payload) {
		const self = this;

		if(notification === "GET_TRASH_DATA") {
			const rovaApiUrl = 'https://www.rova.nl/api/waste-calendar/upcoming?postalcode=' + payload.config.zipCode + '&houseNumber=' + payload.config.houseNr + '&addition=' + payload.config.houseNrAddition + '&take=3';
			const errorResponse = {error: true};

			fetch(rovaApiUrl)
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Kon geen gegevens ophalen, werkt het internet?');
				})
				.then(data => {
					self.sendSocketNotification("TRASH_DATA", data);
				})
				.catch(error => {
					console.error("Fout bij ophalen: ", error);
					self.sendSocketNotification("TRASH_DATA", errorResponse); // Send error response
				});
		}
	},
});

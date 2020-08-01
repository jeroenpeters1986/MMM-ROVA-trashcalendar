/*
 * Magic Mirror module for displaying the dates (and which) the trashbin is emptied by ROVA
 * By Jeroen Peters (jeroenpeters1986) https://github.com/jeroenpeters1986/MMM-ROVA-trashcalendar
 * MIT Licensed
 */

Module.register("MMM-ROVA-trashcalendar", {
    defaults: {
        zipCode: "8016AA",
        houseNr: 29,
        houseNrAddition: "",
        dateFormat: "dddd D MMMM",
        updateInterval: 4 * 60 * 60 * 1000 // Defaults to 4 hours
    },

    // Start the module
    start: function() {
        this.trashDays = [];
        this.loaded = false;
        this.getTrashCollectionDays();
        this.scheduleUpdate();
    },

    // Import additional CSS Styles
    getStyles: function() {
        return ['MMM-ROVA-trashcalendar.css']
    },

    // Contact node_helper for the trash collection days
    getTrashCollectionDays: function() {
        this.sendSocketNotification("GET_TRASH_DATA", {
            config: this.config
        });
    },

    // Schedule the update interval and update
    scheduleUpdate: function(delay) {
        let nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        const self = this;
        setInterval(function() {
            self.getTrashCollectionDays();
        }, nextLoad);
    },

    // Handle node_helper response
    socketNotificationReceived: function(notification, payload) {
        if (notification === "TRASH_DATA") {
            this.trashDays = payload;
            this.loaded = true;
            this.updateDom(1000);
        }
    },

    // Create icons
    getIconByTrashtype: function (trash_type) {

        let color = "#64656a";

        switch (trash_type) {
            case 'REST':
            case 'RESTAFVAL':
                color = "#64656a";
                break;
            case 'GFT':
                color = "#418740";
                break;
            case 'PLASTIC':
            case 'PMD':
            case 'PLASTICPLUS':
                color = "#e96c29";
                break;
            case 'PAPIER':
                color = "#2a70b8";
                break;
            case 'DHM':
                color = "#7c6a61";
                break;
            case 'BTG':
                color = "#9a51bb";
                break;
            case 'PPBTG':
                color = "#346dc3";
                break;
            case 'GROF':
                color = "#e84c5e";
                break;
            case 'PTG':
                color = "#4f936f";
                break;
            case 'KRINGLOOP':
                color = "#7cbf6e";
                break;
            case 'KCA':
                color = "#e64e61";
                break;
            case 'GLAS':
                color = "#ffc729";
                break;
            default:
                color = "#64656a";
                break;
        }

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, "class", "binday-icon");
        svg.setAttributeNS(null, "style", "fill: " + color);

        let use = document.createElementNS('http://www.w3.org/2000/svg', "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.file("bin_icon.svg#bin"));
        svg.appendChild(use);

        return (svg);
    },

    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // Construct the DOM objects for this module
    getDom: function() {
        let wrapper = document.createElement("div");

        if (this.loaded === false) {
            wrapper.innerHTML = this.translate("Bezig met laden...");
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        for (i = 0; i < this.trashDays.length; i++) {

            let trashDay = this.trashDays[i];

            let pickupContainer = document.createElement("div");
            pickupContainer.classList.add("binday-container");

            let dateContainer = document.createElement("span");
            dateContainer.classList.add("binday-date");

            moment.locale();
            let today = moment().startOf("day");
            let pickUpDate = moment(trashDay.Date);
            if (today.isSame(pickUpDate)) {
                dateContainer.innerHTML = "Vandaag";
            } else if (moment(today).add(1, "days").isSame(pickUpDate)) {
                dateContainer.innerHTML = "Morgen";
            } else if (moment(today).add(7, "days").isAfter(pickUpDate)) {
                dateContainer.innerHTML = this.capitalize(pickUpDate.format("dddd"));
            } else {
                dateContainer.innerHTML = this.capitalize(pickUpDate.format(this.config.dateFormat));
            }
            dateContainer.innerHTML += ": " + trashDay.GarbageType;

            pickupContainer.appendChild(dateContainer);

            let iconContainer = document.createElement("span");
            iconContainer.classList.add("binday-icon-container");
            iconContainer.appendChild(this.getIconByTrashtype(trashDay.GarbageTypeCode));

            pickupContainer.appendChild(iconContainer);
            wrapper.appendChild(pickupContainer);
        }

        return wrapper;
    }
});

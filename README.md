# MMM-ROVA-trashcalendar
A simple module for MagicMirror2 designed to show when your trash will be collected
by the ROVA trash service in the Netherlands.
It uses the same layout as hdurdle/MMM-WestBerksBinDay

## Dependencies
  * A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) installation

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository and install the dependencies:
````
git clone https://github.com/jeroenpeters1986/MMM-ROVA-trashcalendar.git
````

Add the module to the modules array in the `config/config.js` file
and insert your own postal code, housenumber and, if applicable, your 
house number addition:

```
 {
    module: 'MMM-ROVA-trashcalendar',
	position: 'middle_center',
	config: {
		zipCode: "8012AR",
		houseNr: "90",
		houseNrAddition: "a"
	}
 },
```
**Note:** If you do not have an addition on your housenumber, you can omit the last line

## Sample screenshot
![MMM-ROVA-trashcalendar module for MagicMirror](https://raw.githubusercontent.com/jeroenpeters1986/MMM-ROVA-trashcalendar/master/MMM-ROVA-trashcalendar.png "MMM-ROVA-trashcalendar module for MagicMirror")


## Optional Config
| **Option** | **Description** |
| --- | --- |
| `dateFormat` | dddd D MMMM |
| `updateInterval` | Time to update the next pickup dates, in milliseconds |


## Support
If you like this module and want to thank, please buy me a coffee.

<a href="https://ko-fi.com/jeroenpeters" target="_blank"><img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/64f1a9ddd0246590df69ea01_kofi_long_button_blue%25402x-p-500.png" alt="Buy Me A Coffee" ></a>


## Changelog
Oct 13, 2024: Replaced requests module with native fetch
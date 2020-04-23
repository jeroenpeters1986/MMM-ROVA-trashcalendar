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

Clone this repository:
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

## Sample
![MMM-SolarEdgeLite module for MagicMirror](https://raw.githubusercontent.com/jeroenpeters1986/MMM-SolarEdgeLite/master/SolarEdgeLite.png "MMM-SolarEdgeLite module for MagicMirror")

## Optional Config
| **Option** | **Description** |
| --- | --- |
| `dateFormat` | dddd D MMMM |

## API Key
Use of this module requires
  1. An API Key, which you can obtain by emailing SolarEdge support (e.g support-uk@solaredge.com )
  2. The Site ID of the SolarEdge system you wish to monitor, which can be found in the Dashboard https://monitoring.solaredge.com

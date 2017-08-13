# financeWidget

This was an experiment in passing the partial state of an application through a websocket connection in order to reduce the work the browser would have to do when it came to calculating and recalculating positioning, color changes, data changes when receiving new data through a websocket connection.

The position of an asset button on the screen is calculated server side then stored in an object with other data to do with a specific asset. That object is stored in an array of other asset objects and the whole array is sent through the websocket connection. On receiving the new array in a websocket message; React loops through the array and positions an AssetButton component according to each object in that Array.

First ```git clone``` the project

Then: ```cd financeWidget; npm run proto```

Open up on ```localhost:3000``` in your browser

Select an asset tile from the selection presented to you or select all by clicking ```Select All```

Hit ```Add Asset``` to select and remove assets from the top screen - each asset tile will toggle that assets appearance in the screen

Hit ```Select Filter``` to select a filter to filter assets by. Selecting a filter will arrange assets into columns by the assets filter value for that filter key e.g. ```Filter Key = Region, Asset Filter Value = Africa```

Hit ```Select Measure``` to select a performance measure for all selected assets. Assets will then be sorted and arranged vertically dependent on their performance measure. With a filter selected, each filter column is sorted arranged individually for the assets in that filter column. The length of time for the perfomance measure can also be changed by hitting ```-``` or ```+``` to decrement or increment the time frame by 10s. Future versions will add more to the timeframe aspect as for now it only deals with seconds.

Hit ```Hide``` to show only the asset screen and have the Asset, Filter and Measure selections hidden below the screen

Hit ```Show``` to unhide the Asset, Filter, and Measure selections

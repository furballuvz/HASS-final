 var viz3 = {
     "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
     "title": {
       "text": ["Daily Flight Arrivals and Departures", "Mar 2019 - Jul 2019"],
       "frame": "group"
     },
     "data": {
       "url": "https://furballuvz.github.io/HASS-final/flight_2019_sep.csv"
     },
     "vconcat": [
     {
     "width": 500,
     "height": 250,
     "encoding": {
           "x": {
             "field": "Day",
             "axis": {
               "title": null,
               "titlePadding": 25
             }, 
             "sort": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
           },
           "y": {
             "type": "quantitative",
             "axis": {"title": "Average No. of Flights"}
           }
         },
       "layer": [
       {
         "params": [{
           "name": "day",
           "select": {"type": "point", "encodings": ["x"]}
         }],
         "transform": [
         {"calculate": "1*datum.Arrivals + 1*datum.Departures", "as": "total"},
         {
             "joinaggregate": [{
                 "op": "sum", 
                 "field": "total",
                 "as": "sum_total"
           }],
             "groupby": ["Date"]
          } 
          ,{
             "aggregate": [{
              "op": "mean",
              "field": "sum_total",
              "as": "avg_total"
             }],
             "groupby": ["Day"]
           }        
          ],
          "mark": {"type": "bar", "width": {"band": 0.5}},
          "encoding": {
               "y": {"field": "avg_total", "type": "quantitative"},
               "color": {
                 "condition": {
                   "param": "day",
                   "value": "steelblue"
                 },
                 "value": "grey"
               }
           }  
         },{
         "transform": [
         {
             "joinaggregate": [{
                 "op": "sum", 
                 "field": "Arrivals",
                 "as": "sum_arr"
           }],
             "groupby": ["Date"]
          } 
          ,{
             "aggregate": [{
              "op": "mean",
              "field": "sum_arr",
              "as": "avg_arr"
             }],
             "groupby": ["Day"]
           }      
          ],
          "mark": {"type": "bar", "width": {"band": 0.5}},
          "encoding": {
               "y": {"field": "avg_arr", "type": "quantitative"},
               "color": {
                 "condition": {
                   "param": "day",
                   "value": "orange"
                 },
                 "value": "grey"
               }
           }  
         }
       ]
   },{
       "hconcat": [
       {
       
       "width": 600,"height": 400,
       "encoding": {
           "x": {
             "field": "Hours",
             "axis": {
               "ticks": false,
               "title": null,
               "titlePadding": 25
             }, 
             "bandPosition": 0.5,
             "sort": ["8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM","7PM", "8PM","9PM", "10PM", "11PM"]
           },
           "y": {
             "type": "quantitative",
             "scale": {"domain": [5, 50]},
             "axis": {
                 "title": "No. of Arrivals",
                 "ticks": false
             }
           }
         },
       "layer": [
       {
         "params": [{
         "name": "hover",
         "select": {
           "type": "point",
           "encodings": ["x"],
           "on": "mouseover",
           "nearest": true
         }
       }], 
         "transform": [{
             "filter": {"param": "day"}
         }],
         "mark": {"type": "bar", "size": 5, "color": "#bbb"},
         "encoding": {
           "y": {"aggregate": "min", "field": "Arrivals", "type": "quantitative"},
           "y2": {"aggregate": "max", "field": "Arrivals", "type": "quantitative"},
           "tooltip": [
               {"field": "Arrivals", "aggregate": "min", "title": "Min"},
               {"field": "Arrivals", "aggregate": "max", "title": "Max"},
               {"field": "Arrivals", "aggregate": "q1", "title": "25 Percentile"},
               {"field": "Arrivals", "aggregate": "q3", "title": "75 Percentile"},
               {"field": "Arrivals", "aggregate": "median", "title": "Mean"}
           ],
           "opacity": {
               "condition": {
                   "param": "hover", "empty": false, "value": 1
                   }, 
                   "value": 0.7
           }
         }
       },{
         "transform": [{
             "filter": {"param": "day"}
         }],
         "mark": {"type": "bar", "size": 20, "color": "orange"},
         "encoding": {
           "y": {"aggregate": "q1", "field": "Arrivals", "type": "quantitative"},
           "y2": {"aggregate": "q3", "field": "Arrivals", "type": "quantitative"},
           "opacity": {
               "condition": {
                   "param": "hover", "empty": false, "value": 1
                   }, 
                   "value": 0.7
           }
         }
       },{
          "transform": [{
             "filter": {"param": "day"}
         }],  
             "mark": {"type": "tick", "color": "#224d94"},
             "encoding": {
               "y": {"aggregate": "median", "field": "Arrivals", "type": "quantitative"}
             }
       
       }
      ]  
       
       
       },{
       
       
       "width": 600,"height": 400,
       "encoding": {
           "x": {
             "field": "Hours",
             "axis": {
               "ticks": false,
               "title": null,
               "titlePadding": 25
             }, 
             "bandPosition": 0.5,
             "sort": ["8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM","7PM", "8PM","9PM", "10PM", "11PM"]
           },
           "y": {
             "type": "quantitative",
             "scale": {"domain": [5, 50]},
             "axis": {
                 "title": "No. of Departures",
                 "ticks": false
             }
           }
         },
       "layer": [
       {
         "params": [{
         "name": "hover",
         "select": {
           "type": "point",
           "encodings": ["x"],
           "on": "mouseover",
           "nearest": true
         }
       }], 
         "transform": [{
             "filter": {"param": "day"}
         }],
         "mark": {"type": "bar", "size": 5, "color": "#bbb"},
         "encoding": {
           "y": {"aggregate": "min", "field": "Departures", "type": "quantitative"},
           "y2": {"aggregate": "max", "field": "Departures", "type": "quantitative"},
           "tooltip": [
               {"field": "Departures", "aggregate": "min", "title": "Min"},
               {"field": "Departures", "aggregate": "max", "title": "Max"},
               {"field": "Departures", "aggregate": "q1", "title": "25 Percentile"},
               {"field": "Departures", "aggregate": "q3", "title": "75 Percentile"},
               {"field": "Departures", "aggregate": "median", "title": "Mean"}
           ],
           "opacity": {
               "condition": {
                   "param": "hover", "empty": false, "value": 1
                   }, 
                   "value": 0.7
           }
         }
       },{
         "transform": [{
             "filter": {"param": "day"}
         }],
         "mark": {"type": "bar", "size": 20, "color": "steelblue"},
         "encoding": {
           "y": {"aggregate": "q1", "field": "Departures", "type": "quantitative"},
           "y2": {"aggregate": "q3", "field": "Departures", "type": "quantitative"},
           "opacity": {
               "condition": {
                   "param": "hover", "empty": false, "value": 1
                   }, 
                   "value": 0.7
           }
         }
       },{
          "transform": [{
             "filter": {"param": "day"}
         }],  
             "mark": {"type": "tick", "color": "#872343"},
             "encoding": {
               "y": {"aggregate": "median", "field": "Departures", "type": "quantitative"}
             }
       
       }
      ]  
       
       }
      ]
    }
  ]
};
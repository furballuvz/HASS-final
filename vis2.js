var viz2 = 
 {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {"url": "https://furballuvz.github.io/HASS-final/flight_jun2019.csv"},
  "title": {
       "text": ["Total Flight Arrivals by Heading", "Mar 2019 - Jul 2019"],
       "frame": "group",
       "align": "left",
       "anchor": "start"
     },
  "hconcat": [
  {
    "width": 600, "height": 400,
    "transform": [
      {"fold": ["North", "South", "East", "West"]}
    ],
    "encoding": {
      "x": {
      "field": "Hours",
      "sort": ["8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM","7PM", "8PM","9PM", "10PM", "11PM"]
    },
    "y": {
      "aggregate": "median", "field": "value", "type": "quantitative", "title": "Average No. of Arrivals"
    },
    "color": {
      "field": "key",
      "scale": {"scheme": "category20","domain": ["North", "South", "East", "West"]}
    },
    "order":{"aggregate": "sum","field":"key"},
    "opacity": {
      "condition": {
        "param": "heading", 
        "value": 1
      },
      "value": 0.3
    },
    "tooltip": [
      {"field": "Hours", "title": "Time"},
      {"aggregate": "median", "field": "North", "title": "North"},
      {"aggregate": "median", "field": "South", "title": "South"},
      {"aggregate": "median", "field": "East", "title": "East"},
      {"aggregate": "median", "field": "West", "title": "West"}
    ]
  },
  "layer": [
    {"mark": "area",
    "params": [{
        "name": "heading",
        "select": {
          "type": "point", 
          "fields": ["key"],
          "on": "mouseover", 
          "clear": "mouseout"
        }
      }]}
  ]
  },{
    "projection": {
      "type": "equirectangular",
      "center": [103.994003,1.35019], 
      "scale": 200,
      "translate": [400, 200]
    },
    "width": 600, "height": 400,
    "layer": [
    {
      "mark": {
        "type": "geoshape",
        "fill": "#ddd",
        "stroke": "lightgray",
        "strokeWidth": 1
      },
      "data": {
        "url": "https://unpkg.com/world-atlas@1/world/110m.json",
        "format": {"type": "topojson", "feature": "countries"}
      }
    },
    {
      "mark": {"type": "rule", "strokeWidth": 3, "opacity": 0.5},
      "data": {"url": "https://furballuvz.github.io/HASS-final/airports_flights.csv"},
      "transform": [
        {"filter": {"or": [{"param": "heading", "empty": false}, {"param": "org", "empty": false}]}},
        {
          "lookup": "origin",
          "from": {
            "data": {"url": "https://furballuvz.github.io/HASS-final/airports.csv"},
            "key": "IATA",
            "fields": ["lat", "long"]
          }
        },
        {
          "lookup": "destination",
          "from": {
            "data": {"url": "https://furballuvz.github.io/HASS-final/airports.csv"},
            "key": "IATA",
            "fields": ["lat", "long"]
          },
          "as": ["lat2", "lon2"]
        }
      ],
      "encoding": {
        "latitude": {"field": "lat"},
        "longitude": {"field": "long"},
        "latitude2": {"field": "lat2"},
        "longitude2": {"field": "lon2"},
        "color": {
          "field": "key",
          "scale": {"scheme": "category20"}
        }
      }
    },
    {
      "mark": {"type": "circle", "color": "lightcoral"},
      "data": {"url": "https://furballuvz.github.io/HASS-final/airports_flights.csv"},
      "transform": [
        {"aggregate": [{"op": "count", "as": "routes"}], "groupby": ["origin"]},
        {
          "lookup": "origin",
          "from": {
            "data": {"url": "https://furballuvz.github.io/HASS-final/airports.csv"},
            "key": "IATA",
            "fields": ["country", "lat", "long"]
          }
        }
      ],
      "encoding": {
        "latitude": {"field": "lat"},
        "longitude": {"field": "long"},
        "size": {"value": 200}
      }
    },
    {
      "mark": {"type": "circle"},
      "data": {"url": "https://furballuvz.github.io/HASS-final/airports_flights.csv"},
      "transform": [
        {
          "lookup": "destination",
          "from": {
            "data": {"url": "https://furballuvz.github.io/HASS-final/airports.csv"},
            "key": "IATA",
            "fields": ["name", "city", "country", "lat", "long"]
          }
        }
      ],
      "params": [{
        "name": "org",
        "select": {
          "type": "point",
          "on": "mouseover",
          "nearest": true,
          "fields": ["key"],
          "clear": "mouseout"
        }
      }],
      "encoding": {
        "latitude": {"field": "lat"},
        "longitude": {"field": "long"},
        "size": {"value": 25},
        "tooltip": [
          {"field": "name", "title": "Airport"},
          {"field": "city", "title": "City"},
          {"field": "country", "title": "Country"}
        ],
        "color": {
          "field": "key",
          "scale": {"scheme": "category20"}
        }
      }
    }
  ]
  }],
  "config": {
      "area": {"interpolate": "monotone"},
      "view": {"stroke": null}
  }
};

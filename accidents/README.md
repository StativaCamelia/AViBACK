# Accidents REST API Documentation
## Response structure

The structure of the API responses' body is as follows:

-   for successful responses, a JSON object containing the properties:
    -   `success`: `true`
    -   `data`: An object, structure detailed for each route below.
-   for unsuccessful responses, a JSON object containing the
    properties:
    -   `success`: `false`
    -   `error`: An object containing a `message` property, and
        sometimes additional helpful properties.
	
  # Without Authorization
  ## /accidents
  ###  GET
  **Query parameters**:
  -   type - the type of representation the returned data will be used for(map, pie, line or bar)
  -   any criteria the user wants his data to be filtered by and the value of the criteria
  Get the accidents that meet the conditions in an  appropriate format for the type of representation they will be used for
  
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents?Type=pie&Pie_Criterion=Severity
 
 **Returned data example**:

```JSON
{
  "content": [
    {
      "_id": 2,
      "count": 1993409
    },
    {
      "_id": 3,
      "count": 887619
    },
    {
      "_id": 4,
      "count": 92337
    },
    {
      "_id": 1,
      "count": 970
    }
  ]
}
```


  ## /accidents/byDate
  ###  GET
  Get the number of accidents that happened on this day in any given year
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents/byDate
 
 **Returned data example**:

```JSON
{
  "content": 6793
}
```
  ## /accidents/details
  ###  GET
  Get the details of some accidents for a news feed purpose
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents/byDate
 
 **Returned data example**:

```JSON
{
  "content": "<accidents><accident id= \"1\">Accident on OH-32 State Route 32 Westbound at Dela Palma Rd. Expect delays.</accident><accident id= \"2\">Accident on I-75 Southbound at Exits 52 52B US-35. Expect delays.</accident><accident id= \"3\">Accident on McEwen Rd at OH-725 Miamisburg Centerville Rd. Expect delays.</accident><accident id= \"4\">Accident on I-270 Outerbelt Northbound near Exit 29 OH-3 State St. Expect delays.</accident><accident id= \"5\">Accident on Oakridge Dr at Woodward Ave. Expect delays.</accident><accident id= \"6\">Accident on I-75 Southbound at Exit 54B Grand Ave. Expect delays.</accident><accident id= \"7\">Accident on Notre Dame Ave at Warner Ave. Expect delays.</accident><accident id= \"8\">Right hand shoulder blocked due to accident on I-270 Outerbelt Westbound at Exit 29 OH-3 State St.</accident><accident id= \"9\">Accident on I-270 Outerbelt Northbound at Exits 7 7A 7B US-40 Broad St. Expect delays.</accident><accident id= \"10\">One lane blocked due to accident on I-70 Westbound at Exits 110 110A 110B Brice Rd. Expect delays.</accident></accidents>"
}
```

  ## /accidents/filters
  ###  GET
  Create a database with the location filters and the relationships between them, so the data will  correspond with the actual data from the accidents database
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents/filters
 
 **Returned data example**:

```JSON
{
	"content": "Database succesfully updated"
}
```
  # With Authorization(The following can only be done by an admin account)
  ## /accidents
  ###  DELETE
  Delets all the accidents
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents
 
 **Returned data example**:

```JSON
{
	"content": "null"
}
```

  ## /accidents
  ###  GET
  Returns all the accidents from the database
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents
 
 **Returned data example**:
The content is to large to be displayed

## /accidents
### POST
Creates a new accident

 **Return codes**:

-   201 - Created
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents

  Request body
```JSON
{
    "State" : "OH",
    "Severity" : 2
}
```

**Returned data example**:
```JSON
{
  "content": {
    "_id": "5ede3061cec18d11c82748d8",
    "State": "OH",
    "Severity": 2,
    "__v": 0
  }
}
```

  ## /accidents/{accidentId}
  ###  PUT
  Update an accident from the database
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents/5ec65d04607fb826d4b69279
   Request body
```JSON
{
    "State" : "OH",
    "Severity" : 2
}
```
 **Returned data example**:
 ```JSON
{
  "content": {
    "_id": "5ec65d04607fb826d4b69279",
    "ID": "A-3",
    "Source": "MapQuest",
    "TMC": "201.0",
    "Severity": 2,
    "End_Time": "2016-02-08T05:19:27.000Z",
    "Start_Lat": 39.063148,
    "Start_Lng": -84.032608,
    "End_Lat": null,
    "End_Lng": null,
    "Distance(mi)": "0.01",
    "Description": "Accident on OH-32 State Route 32 Westbound at Dela Palma Rd. Expect delays.",
    "Number": "",
    "Street": "State Route 32",
    "Side": "R",
    "City": "Williamsburg",
    "County": "Clermont",
    "State": "OH",
    "Zipcode": "45176",
    "Country": "US",
    "Timezone": "US/Eastern",
    "Airport_Code": "KI69",
    "Weather_Timestamp": "2016-02-08 06:56:00",
    "Temperature(F)": 36,
    "Wind_Chill(F)": 33.3,
    "Humidity(%)": 100,
    "Pressure(in)": 29.67,
    "Visibility(mi)": 10,
    "Wind_Direction": "SW",
    "Wind_Speed(mph)": 3.5,
    "Weather_Condition": "Overcast",
    "Amenity": "False",
    "Bump": "False",
    "Crossing": "False",
    "Give_Way": "False",
    "Junction": "False",
    "No_Exit": "False",
    "Railway": "False",
    "Roundabout": "False",
    "Station": "False",
    "Stop": "False",
    "Traffic_Calming": "False",
    "Traffic_Signal": "True",
    "Turning_Loop": "False",
    "Sunrise_Sunset": "Night",
    "Civil_Twilight": "Night",
    "Nautical_Twilight": "Day",
    "Astronomical_Twilight": "Day",
    "Start_Date": "2016-02-08",
    "Start_Hour": "06:49:27"
  }
}
```

  ## /accidents/{accidentId}
  ###  DELETE
  Delete an accident by id
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents/5ec65d04607fb826d4b69279
 **Returned data example**:
 ```JSON
{
  "content": {
    "_id": "5ec65d04607fb826d4b69279",
    "ID": "A-3",
    "Source": "MapQuest",
    "TMC": "201.0",
    "Severity": 2,
    "End_Time": "2016-02-08T05:19:27.000Z",
    "Start_Lat": 39.063148,
    "Start_Lng": -84.032608,
    "End_Lat": null,
    "End_Lng": null,
    "Distance(mi)": "0.01",
    "Description": "Accident on OH-32 State Route 32 Westbound at Dela Palma Rd. Expect delays.",
    "Number": "",
    "Street": "State Route 32",
    "Side": "R",
    "City": "Williamsburg",
    "County": "Clermont",
    "State": "OH",
    "Zipcode": "45176",
    "Country": "US",
    "Timezone": "US/Eastern",
    "Airport_Code": "KI69",
    "Weather_Timestamp": "2016-02-08 06:56:00",
    "Temperature(F)": 36,
    "Wind_Chill(F)": 33.3,
    "Humidity(%)": 100,
    "Pressure(in)": 29.67,
    "Visibility(mi)": 10,
    "Wind_Direction": "SW",
    "Wind_Speed(mph)": 3.5,
    "Weather_Condition": "Overcast",
    "Amenity": "False",
    "Bump": "False",
    "Crossing": "False",
    "Give_Way": "False",
    "Junction": "False",
    "No_Exit": "False",
    "Railway": "False",
    "Roundabout": "False",
    "Station": "False",
    "Stop": "False",
    "Traffic_Calming": "False",
    "Traffic_Signal": "True",
    "Turning_Loop": "False",
    "Sunrise_Sunset": "Night",
    "Civil_Twilight": "Night",
    "Nautical_Twilight": "Day",
    "Astronomical_Twilight": "Day",
    "Start_Date": "2016-02-08",
    "Start_Hour": "06:49:27"
  }
}
```

## /accidents/general
  ###  GET
  Get some general data about the change made on the accidents database
  **Return codes**:

-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5004/accidents/general
 **Returned data example**:
 ```JSON
{
  "content": {
    "accidentsNumber": 2974335,
    "newAccidentsNumber": 3,
    "deletedAccidentsNumber": 3,
    "updatedAccidentsNumber": 7
  }
}
```







  
  

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
      
  
  

class FiltresController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  async editFiltres(query) {
    if (Object.keys(query).length !== 0) {
      let parsedQueryString = query;

      let dateObject = {};
      if (parsedQueryString.State) {
        parsedQueryString.State = await this.database.State.getAbbrByName(
          parsedQueryString.State
        );
      }

      if(parsedQueryString.FirstDate && parsedQueryString.SecondDate && parsedQueryString.FirstHour && parsedQueryString.SecondHour){
        const dateOne = new Date(parsedQueryString.FirstDate + "T00:00:00.000Z");
        const dateTwo = new Date(parsedQueryString.SecondDate + "T23:59:59.000Z");

        parsedQueryString.Start_Time = {
          $gte : dateOne,
          $lte : dateTwo
        };

        dateObject.firstDate = parsedQueryString.FirstDate;
        dateObject.secondDate = parsedQueryString.SecondDate;
        dateObject.firstHour = parsedQueryString.FirstHour;
        dateObject.secondHour = parsedQueryString.SecondHour;

        delete parsedQueryString.FirstDate;
        delete parsedQueryString.SecondDate;
        delete parsedQueryString.FirstHour;
        delete parsedQueryString.SecondHour;
      }else{
        if(parsedQueryString.FirstDate && parsedQueryString.SecondDate){
          const dateOne = new Date(parsedQueryString.FirstDate + "T00:00:00Z");
          const dateTwo = new Date(parsedQueryString.SecondDate + "T23:59:59Z");

          parsedQueryString.Start_Time = {
            $gte : dateOne,
            $lte : dateTwo
          };
          delete parsedQueryString.FirstDate;
          delete parsedQueryString.SecondDate;
        }else{
          if(parsedQueryString.FirstHour && parsedQueryString.SecondHour){
            dateObject.firstHour = parsedQueryString.FirstHour;
            dateObject.secondHour = parsedQueryString.SecondHour;

            delete parsedQueryString.FirstHour;
            delete parsedQueryString.SecondHour;
          }else{
            if(parsedQueryString.FirstDate){
              const dateOne = new Date(parsedQueryString.FirstDate + "T00:00:00Z");
              console.log(dateOne)
              parsedQueryString.Start_Time = {
                $gte : dateOne,
              };
              delete parsedQueryString.FirstDate;
            }else{
              if(parsedQueryString.SecondDate){
                const dateTwo = new Date(parsedQueryString.SecondDate + "T23:59:59Z");

                parsedQueryString.Start_Time = {
                  $lte : dateTwo
                };
                delete parsedQueryString.SecondDate;
              }else{
                if(parsedQueryString.FirstHour){
                  dateObject.firstHour = parsedQueryString.FirstHour;
                  delete parsedQueryString.FirstHour;
                }else{
                  if(parsedQueryString.SecondHour){
                    dateObject.secondHour = parsedQueryString.SecondHour;
                    delete parsedQueryString.SecondHour;
                  }
                }
              }
            }
          }
        }
      }
      let type = parsedQueryString.Type;
      delete parsedQueryString.Type;
      return {query : parsedQueryString, type: type, dateObject: dateObject};
    }
  }

  async createFilterDatabase() {
    try {
      const states = await this.database.Accident.getAllStatesEntities();
      for (let stateData of states) {
        this.service.locationController.createStateEntity(stateData);
      }
      const counties = await this.database.Accident.getAllCountiesEntities();
      for (let countyData of counties) {
        const stateData = await this.database.State.findOne({
          name: countyData.state,
        });
        const timezone = stateData.timezone;
        countyData.timezone = timezone;
        this.service.locationController.createCountyEntity(countyData);
      }
      const cities = await this.database.Accident.getAllCitiesEntities();
      for (let cityData of cities) {
        console.log(cityData);
        const countyData = await this.database.County.findOne({
          name: cityData.county,
        });
        cityData.state = countyData.state;
        cityData.timezone = countyData.timezone;
        this.service.locationController.createCityEntity(cityData);
      }
      const streets = await this.database.Accident.getAllStreetsEntities();
      for (let streetData of streets) {
        const cityData = await this.database.City.findOne({
          name: streetData.city,
        });
        streetData.county = cityData.county;
        streetData.state = cityData.state;
        streetData.timezone = cityData.timezone;
        this.service.locationController.createStreetEntity(streetData);
      }
      const content = "Database succesfully updates";
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = FiltresController;

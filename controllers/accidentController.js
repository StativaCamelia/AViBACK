class AccidentController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  //creeaza baza de date pentru filtre
  async createFilterDatabase() {
    try {
      const content = await this.service.filtresController.createFilterDatabase();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //Returneaza numarul de accidente care respecta o serie de criterii
  async getNumberOfAccidentsByCriterias(query) {
    try {
      const { queryStringObject: criteria } = query;
      const content = await this.database.Accident.find(
        criteria
      ).countDocuments();
      console.log(content);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getNumberOfAccidentsByQueryAndGroupBy(query, groupBy) {
    try {
      const { queryStringObject: criteria } = query;
      const groupBy = "County";
      const aggregatorOpts = [
        {
          $match: criteria,
        },
        {
          $unwind: "$" + groupBy,
        },
        {
          $group: {
            _id: "$" + groupBy,
            count: { $sum: 1 },
          },
        },
      ];
      const content = await this.database.Accident.aggregate(aggregatorOpts);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //returneaza numarul de accidente in functie de criterii si de state(pentu colorare mapa)
  async getNumberOfAccidentsByState(query) {
    try {
      const { queryStringObject: criteria } = query;
      const aggregatorOpts = [
        {
          $match: criteria,
        },
        {
          $unwind: "$State",
        },
        {
          $group: {
            _id: "$State",
            count: { $sum: 1 },
          },
        },
      ];
      const content = await this.database.Accident.aggregate(aggregatorOpts);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //adauga un accident in functie de informatiile din body(admin)
  async addAccident(payload) {
    const content = new this.database.Accident(payload);
    try {
      await content.save();
      this.service.userController.getIntrestedUsers({ content });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //sterge toate accidentele(admin)
  async deleteAllAccidents(req, res) {
    try {
      const content = await this.database.Accident.deleteMany({});
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //returneaza toate accidentele din baza de date(admin)
  async getAllAccidents() {
    try {
      const content = await this.database.Accident.find({}).limit(20);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //updateaza datele unui accident cu ajutorul informatiilor primite in body(trebuie pus id-ul accidentului in query string)
  async updateAccident(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const { accidentId, body: newContent } = payload;
      console.log(newContent);
      const content = await this.database.Accident.findOneAndUpdate(
        {
          ID: accidentId,
        },
        { newContent },
        options
      );
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //sterge un accident primit in queryString
  async deleteAccident(payload) {
    try {
      const { accidentId } = payload;
      const content = await this.database.Accident.findOneAndDelete({
        _id: accidentId,
      });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //returneaza accidentele(toate informatiile) in functie de datele din query string(ex. State='OH')
  async getAccidentsByQuery(payload) {
    try {
      const { queryStringObject: query } = payload;
      const content = await this.database.Accident.find(query);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = AccidentController;

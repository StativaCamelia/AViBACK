const { mapPage } = require("../views/index");

class ContactController {
  constructor(database) {
    this.database = database;
  }

  getMapPage(req, res) {
    try {
      const statesValues = [{id : 'AK_li', value : 'Alaska'}, {id : 'AZ_li', value : 'Arizona'}, {id : 'AR_li', value : 'Arkansas'}, {id : 'CA_li', value : 'California'}, {id : 'CO_li', value : 'Colorado'}, {id : 'CT_li', value : 'Connecticut'}, {id : 'DE_li', value : 'Delaware'}, {id : 'DC_li', value : 'District of Columbia'}, {id : 'FL_li', value : 'Florida'}, {id : 'GA_li', value : 'Georgia'}, {id : 'HI_li', value : 'Hawaii'}, {id : 'ID_li', value : 'Idaho'}, {id : 'IL_li', value : 'Illinois'}, {id : 'IN_li', value : 'Indiana'}, {id : 'IA_li', value : 'Iowa'}, {id : 'KS_li', value : 'Kansas'}, {id : 'KY_li', value : 'Kentucky'}, {id : 'LA_li', value : 'Louisiana'}, {id : 'ME_li', value : 'Maine'}, {id : 'MD_li', value : 'Maryland'}, {id : 'MA_li', value : 'Massachusetts'}, {id : 'MI_li', value : 'Michigan'}, {id : 'MN_li', value : 'Minnesota'}, {id : 'MS_li', value : 'Mississippi'}, {id : 'MT_li', value : 'Missouri'}, {id : 'MO_li', value : 'Montana'}, {id : 'NE_li', value : 'Nebraska'}, {id : 'NV_li', value : 'Nevada'}, {id : 'NH_li', value : 'New Hampshire'}, {id : 'NJ_li', value : 'New Jersey'}, {id : 'NM_li', value : 'New Mexico'}, {id : 'NY_li', value : 'New York'}, {id : 'NC_li', value : 'North Carolina'}, {id : 'ND_li', value : 'North Dakota'}, {id : 'OH_li', value : 'Ohio'}, {id : 'OK_li', value : 'Oklahoma'}, {id : 'OR_li', value : 'Oregon'}, {id : 'PA_li', value : 'Pennsylvania'}, {id : 'RI_li', value : 'Rhode Island'}, {id : 'SC_li', value : 'South Carolina'}, {id : 'SD_li', value : 'South Dakota'}, {id : 'TN_li', value : 'Tennessee'}, {id : 'TX_li', value : 'Texas'}, {id : 'UT_li', value : 'Utah'}, {id : 'VT_li', value : 'Vermont'}, {id : 'VA_li', value : 'Virginia'}, {id : 'WA_li', value : 'Washington'}, {id : 'WV_li', value : 'West Virginia'}, {id : 'WI_li', value : 'Wisconsin'}, {id : 'WY_li', value : 'Wyoming'}, {id : 'AS_li', value : 'American Samoa'}, {id : 'GU_li', value : 'Guam'}, {id : 'MP_li', value : 'Northern Mariana Islands'}, {id : 'PR_li', value : 'Puerto Rico'}];
      const countiesValues = ['Autauga', 'Baldwin', 'Barbour', 'Bibb','Blount', 'Bullock','Butler'];
      const citiesValues = ['Juneau', 'Sacramento', 'Santa Fe', 'Salt Lake City', 'Olympia'];
      const streetsValues = ['Right', 'Left'];
      const numbersValues = ['123', '234', '127', '99'];
      const timezoneValues = ['US/Eastern', 'US/Pacific', 'US/Central', 'US/Mountain'];
      const roadSideValues = ['Right', 'Left'];
      const weatherValues = ['Rainy', 'Sunny'];
      const windDirectionValues = ['SE', 'NW'];
      const ids = ['','','active','',''];
      const { content, contentType } = mapPage.getMapPage(statesValues, countiesValues, citiesValues, streetsValues, numbersValues, timezoneValues, roadSideValues, weatherValues, windDirectionValues, ids);
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = ContactController;

import DATA from './libs/data';

class Part2List {
  constructor(utils) {
    this.utils = utils;
    this.createCountryList();
  }

  createCountryList() {
    if (!this.utils.getGlobalLoaded()) {
      this.utils.getGlobal().then((result) => {
        this.utils.global = result;
        this.createCountryListExecute(result);
      });
      return false;
    }
    this.createCountryListExecute(this.utils.getGlobalLoaded());
    return true;

    // if (!this.utils.getGlobalLoaded()) {
    //   this.utils.getGlobal().then((result) => {
    //     this.utils.global = result;
    //     this.createCountryListExecute(result);
    //   });
    //   return false;
    // }
    // this.createCountryListExecute(this.utils.getGlobalLoaded());
    // return true;
  }

  createCountryListExecute(result) {
    // const countriesData = result.Countries;
    let countryListHTMLData = '';
    const listWrapper = document.querySelector('.country-list-data');
    let countryNameAndTypeData;
    Object.keys(DATA).some((countrySlug) => {
      // switch (countrySlug) {
      //   case "france":
      //     this.setMarkerCertainCountry('fr');
      //     break;
      //   case "canada":
      //     this.setMarkerCertainCountry('ca');
      //     break;
      //   case "australia":
      //     this.setMarkerCertainCountry('au');
      //     break;
      //   case "china":
      //     this.setMarkerCertainCountry('cn');
      //     break;
      //   default:
      // }
      if (DATA[countrySlug].Lon) {
        countryNameAndTypeData = this.getCountryName(result, DATA[countrySlug].ISO2);
        countryListHTMLData += `<div data-country="${DATA[countrySlug].ISO2}" class="country-list-data-unit"><span class="number">${countryNameAndTypeData[1]}</span>
        <span class="span country">${countryNameAndTypeData[0]}</span></div>`;
      }
      listWrapper.innerHTML = countryListHTMLData;
      return false;
    });
  }

  getCountryName(countriesData, countrySlug, type = 'cases') {
    const countryNameTypeData = ['', '', ''];
    countriesData.some((countryObject) => {
      if (countryObject.countryInfo.iso2 === countrySlug) {
        countryNameTypeData[0] = countryObject.country;
        countryNameTypeData[1] = countryObject[type];
        return true;
      }
      return false;
    });
    return countryNameTypeData;
  }
}
export default Part2List;

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
  }

  createCountryListExecute(result) {
    // const countriesData = result.Countries;
    let countryListHTMLData = '';
    const countryDataArray = [];
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
        countryDataArray.push(countryNameAndTypeData);
      }
      return false;
    });
    countryDataArray.sort((a, b) => b[1] - a[1]).some((object) => {
      countryListHTMLData += `<div data-country="${object[2]}" class="country-list-data-unit"><span class="number">${object[0]}</span>
      <span class="span country">${object[1]}</span></div>`;
      listWrapper.innerHTML = countryListHTMLData;
      return false;
    });
    // console.log(countryDataArray.sort((a, b) => b[1] - a[1]));
  }

  getCountryName(countriesData, countrySlug, type = 'cases') {
    const countryNameTypeData = ['', '', ''];
    countriesData.some((countryObject) => {
      if (countryObject.countryInfo.iso2 === countrySlug) {
        countryNameTypeData[0] = countryObject.country;
        countryNameTypeData[1] = countryObject[type];
        countryNameTypeData[2] = countryObject.countryInfo.iso2;
        return true;
      }
      return false;
    });
    return countryNameTypeData;
  }
}
export default Part2List;

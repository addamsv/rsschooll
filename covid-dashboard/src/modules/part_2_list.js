import DATA from './libs/data';

class Part2List {
  constructor(utils) {
    this.utils = utils;
    this.createCountryList();
  }

  setDataByCase(caseName) {
    this.createCountryList();
    console.log(`part2 case: ${caseName}`);
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
    let countryInputListHTMLData = '';
    const countryDataArray = [];
    const LIST_WRAPPER = document.querySelector('.country-list-data');
    const INPUT_LIST_WRAPPER = document.getElementById('countriesList');
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
        countryNameAndTypeData = this.getCountryDataByName(result, DATA[countrySlug].ISO2);
        if (countryNameAndTypeData.length !== 0) {
          countryDataArray.push(countryNameAndTypeData);
        }
      }
      return false;
    });
    countryDataArray.sort((a, b) => b[1] - a[1]).some((object) => {
      countryListHTMLData += `<div data-country="${object[2]}" class="country-list-data-unit"><span class="number">${object[1]}</span>
      <span class="span country">${object[0]}</span><img class="country-flag" style="width:27px;height:auto;" src="${object[3]}" alt="${object[2]}"></div>`;

      countryInputListHTMLData += `<option value="${object[0]}">${object[0]}</option>`;
      return false;
    });
    LIST_WRAPPER.innerHTML = countryListHTMLData;
    INPUT_LIST_WRAPPER.innerHTML = countryInputListHTMLData;
  }

  getCountryDataByName(countriesData, countrySlug) {
    const countryNameTypeData = [];
    countriesData.some((countryObject) => {
      if (countryObject.countryInfo.iso2 === countrySlug) {
        /* Country Name */
        countryNameTypeData[0] = countryObject.country;
        /* Mount of Cases etc */
        countryNameTypeData[1] = this.getMountByType(countryObject); // countryObject[type];
        /* Country Name ISO2 format */
        countryNameTypeData[2] = countryObject.countryInfo.iso2;
        /* Country Flag (URL) */
        countryNameTypeData[3] = countryObject.countryInfo.flag;
        return true;
      }
      return false;
    });
    return countryNameTypeData;
  }

  getMountByType(object) {
    switch (this.utils.typeOfCase) {
      case 'casesAll':
        return object.cases;
      case 'deathsAll':
        return object.deaths;
      case 'recoveredAll':
        return object.recovered;

      case 'casesDay':
        return object.todayCases;
      case 'deathsDay':
        return object.todayDeaths;
      case 'recoveredDay':
        return object.todayRecovered;

      case 'casesDay100':
        return (object.todayCases / object.population) * 100000;
      case 'deathsDay100':
        return (object.todayDeaths / object.population) * 100000;
      case 'recoveredDay100':
        return (object.todayRecovered / object.population) * 100000;

      case 'casesAll100':
        return (object.cases / object.population) * 100000;
      case 'deathsAll100':
        return (object.deaths / object.population) * 100000;
      case 'recoveredAll100':
        return (object.recovered / object.population) * 100000;
      default:
        return false;
    }
  }
}
export default Part2List;

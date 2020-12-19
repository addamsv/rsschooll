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
    const countriesData = result.Countries;
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
        countryNameAndTypeData = this.getCountryName(countriesData, countrySlug);
        countryListHTMLData += `<div class="country-list-data-unit"><span class="number">${countryNameAndTypeData[1]}</span>
        <span class="span country">${countryNameAndTypeData[0]}</span></div>`;
        // countryData = this.getCountryData(countriesData, countrySlug);
        // const myIcon = L.icon({
        //   iconUrl: './assets/images/ok.png',
        //   iconSize: this.getMarkerSize(countryData),
        // });
        // const markerOptions = {
        //   title: `${countryData.Country} confirmed: ${countryData.TotalConfirmed}`,
        //   clickable: true,
        //   icon: myIcon,
        // };
        // const marker = L.marker([DATA[countrySlug].Lat, DATA[countrySlug].Lon], markerOptions);
        // marker.bindPopup(`${countryData.Country} Deaths: ${countryData.TotalDeaths}; Cases: ${countryData.TotalConfirmed}`).openPopup();
        // marker.addTo(this.map);
      }
      listWrapper.innerHTML = countryListHTMLData;
      return false;
    });
  }

  getCountryName(countriesData, countrySlug, type = 'TotalConfirmed') {
    console.log();
    const countryNameTypeData = ['', ''];
    Object.keys(countriesData).some((countryObject) => {
      if (countriesData[countryObject].Slug === countrySlug) {
        countryNameTypeData[0] = countriesData[countryObject].Country;
        countryNameTypeData[1] = countriesData[countryObject][type];
        return true;
      }
      return false;
    });
    return countryNameTypeData;
  }
}
export default Part2List;

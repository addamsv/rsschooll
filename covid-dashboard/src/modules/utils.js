class Utils {
  constructor() {
    this.global = null;
    this.countryData = {};
    this.worldData = null;
    this.dailyWorldData = null;
    this.forGlobalCasesPart = null;
    this.typeOfCase = 'cases';
  }

  getCountryDataLoaded(country) {
    return this.countryData[country] ? this.countryData[country] : false;
  }

  getDailyWorldDataLoaded() {
    return this.dailyWorldData ? this.dailyWorldData : false;
  }

  getGlobalLoaded() {
    return this.global ? this.global : false;
  }

  getForGlobalCasesPartLoaded() {
    return this.forGlobalCasesPart ? this.forGlobalCasesPart : false;
  }

  async getDataForGlobalCasesPart() {
    const url = `https://disease.sh/v3/covid-19/all`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async getCountryData(country) {
    const url = `https://api.covid19api.com/dayone/country/${country.toLowerCase()}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async getWorldData() {
    const currentDate = new Date();
    const url = `https://api.covid19api.com/world?from=2020-04-13T00:00:00Z&to=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}T00:00:00Z;`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async getGlobal() {
    const url = `https://disease.sh/v3/covid-19/countries`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
    // const url = `https://api.covid19api.com/summary`;
    // const res = await fetch(url);
    // const data = await res.json();
    // return data;
  }

  async getDailyWorldData() {
    const url = `https://disease.sh/v3/covid-19/historical/all?lastdays=366`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  setEventOfChangeCountry(countryName) {
    const ELEMENT = document.querySelector('[data-set-country]');
    ELEMENT.dataset.setCountry = countryName;
    ELEMENT.click();
  }

  setTypeOfCase(type = 'cases') {
    switch (type) {
      case 'deaths':
        this.typeOfCase = 'deaths';
        break;
      case 'recovered':
        this.typeOfCase = 'recovered';
        break;
      default:
        this.typeOfCase = 'cases';
    }
  }
}

export default Utils;
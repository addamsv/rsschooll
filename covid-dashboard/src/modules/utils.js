class Utils {
  constructor() {
    this.global = null;
    this.countryData = {};
    this.worldData = null;
    this.dailyWorldData = null;
    this.forGlobalCasesPart = null;
    this.typeOfCase = 'casesAll';
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

  async getDailyCountryData(country) {
    const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  setEventOfChangeCountry(countryName) {
    const ELEMENT = document.querySelector('[data-set-country]');
    ELEMENT.dataset.setCountry = countryName;
    ELEMENT.click();
  }

  setTypeOfCase(type = 'casesAll') {
    const ELEMENT = document.querySelector('[data-set-case]');
    switch (type) {
      case 'deathsAll':
        this.typeOfCase = 'deathsAll';
        break;
      case 'deathsAll100':
        this.typeOfCase = 'deathsAll100';
        break;
      case 'deathsDay':
        this.typeOfCase = 'deathsDay';
        break;
      case 'deathsDay100':
        this.typeOfCase = 'deathsDay100';
        break;
      case 'recoveredAll':
        this.typeOfCase = 'recoveredAll';
        break;
      case 'recoveredAll100':
        this.typeOfCase = 'recoveredAll100';
        break;
      case 'recoveredDay':
        this.typeOfCase = 'recoveredDay';
        break;
      case 'recoveredDay100':
        this.typeOfCase = 'recoveredDay100';
        break;
      case 'casesAll':
        this.typeOfCase = 'casesAll';
        break;
      case 'casesAll100':
        this.typeOfCase = 'casesAll100';
        break;
      case 'casesDay':
        this.typeOfCase = 'casesDay';
        break;
      case 'casesDay100':
        this.typeOfCase = 'casesDay100';
        break;
      default:
        this.typeOfCase = 'casesAll';
    }
    ELEMENT.dataset.setCase = this.typeOfCase;
    ELEMENT.click();
  }
}

export default Utils;

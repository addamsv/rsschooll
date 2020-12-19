class Utils {
  constructor() {
    this.global = null;
    this.countryData = {};
    this.worldData = null;
    this.dailyWorldData = null;
  }

  getCountryDataLoaded(country) {
    if (this.countryData[country]) {
      return this.countryData[country];
    }
    return false;
  }

  getDailyWorldDataLoaded() {
    if (this.dailyWorldData) {
      return this.dailyWorldData;
    }
    return false;
  }

  getGlobalLoaded() {
    if (this.global) {
      return this.global;
    }
    return false;
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
    const url = `https://api.covid19api.com/summary`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async getDailyWorldData() {
    const url = `https://disease.sh/v3/covid-19/historical/all?lastdays=366`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

export default Utils;
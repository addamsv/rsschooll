class Utils {
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
}

export default Utils;
import Utils from './utils';
import a from './libs/data';
class Part1Table {
  constructor() {
    this.utils = new Utils();
    this.countriesTable = document.querySelector('.countries-table');
    // this.fillTable();
  }

  /* fillTable() {
    for (const country in a) {

      const formattedCounty = country.slice(0, 1).toUpperCase() + country.slice(1);
      this.utils.getCountryData(country).then((countryData) => {
        const countryRow = `
        <tr>
          <td colspan="3" class="coutries-table__country-name">${formattedCounty}</td>
        </tr>
        <tr>
          <td class="cases">${countryData.slice(-1).Confirmed}</td>
          <td class="deaths">${countryData.slice(-1).Deaths}</td>
          <td class="recovered">${countryData.slice(-1).Recovered}</td>
        </tr>
        `;
        this.countriesTable.innerHTML += countryRow;
      });
    }
  }

/*   addTableRow(country) {
    const countriesTable = document.querySelector('.countries-table');
    countriesTable.append(this.getTableRow(country));
  }

  fillTable() {
    for (let country in a) {
      this.addTableRow(country);
    }
  } */


}

export default Part1Table;
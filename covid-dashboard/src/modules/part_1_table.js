class Part1Table {
  constructor(utils) {
    this.utils = utils;
    this.currentTable = 0;
    this.currentTableGlobalType = 'world';
    this.tableTypes = [
      {
        tableType: 'casesAll',
        tableName: 'Cumulative Confirmed',
        indicatorW: 'cases',
        populationType: 'all',
        period: 'all',
        indicator: 'cases',

      },
      {
        tableType: 'casesAll100',
        tableName: 'Cumulative Confirmed per 100k',
        indicatorW: 'cases',
        populationType: '100k',
        period: 'all',
        indicator: 'cases',
      },
      {
        tableType: 'casesDay',
        tableName: 'Daily Confirmed',
        indicatorW: 'todayCases',
        populationType: 'all',
        period: 'last',
        indicator: 'cases',
      },
      {
        tableType: 'casesDay100',
        tableName: 'Daily Confirmed per 100k',
        indicatorW: 'todayCases',
        populationType: '100k',
        period: 'last',
        indicator: 'cases',
      },
      {
        tableType: 'deathsAll',
        tableName: 'Cumulative Deaths',
        indicatorW: 'deaths',
        populationType: 'all',
        period: 'all',
        indicator: 'deaths',
      },
      {
        tableType: 'deathsAll100',
        tableName: 'Cumulative Deaths per 100k',
        indicatorW: 'deaths',
        populationType: '100k',
        period: 'all',
        indicator: 'deaths',
      },
      {
        tableType: 'deathsDay',
        tableName: 'Daily Deaths',
        indicatorW: 'todayDeaths',
        populationType: 'all',
        period: 'last',
        indicator: 'deaths',
      },
      {
        tableType: 'deathsDay100',
        tableName: 'Daily Deaths per 100k',
        indicatorW: 'todayDeaths',
        populationType: '100k',
        period: 'last',
        indicator: 'deaths',
      },
      {
        tableType: 'recoveredAll',
        tableName: 'Cumulative Recovered',
        indicatorW: 'recovered',
        populationType: 'all',
        period: 'all',
        indicator: 'recovered',
      },
      {
        tableType: 'recoveredAll100',
        tableName: 'Cumulative Recovered per 100k',
        indicatorW: 'recovered',
        populationType: '100k',
        period: 'all',
        indicator: 'recovered',
      },
      {
        tableType: 'recoveredDay',
        tableName: 'Daily Recovered',
        indicatorW: 'todayRecovered',
        populationType: 'all',
        period: 'last',
        indicator: 'recovered',
      },
      {
        tableType: 'recoveredDay100',
        tableName: 'Daily Recovered per 100k',
        indicatorW: 'todayRecovered',
        populationType: '100k',
        period: 'last',
        indicator: 'recovered',
      },
    ];
    this.activateEvents();
    this.createWorldTable(0);
  }

  createWorldTable(tableIndex) {
    let value;
    this.utils.getDataForGlobalCasesPart().then((worldData) => {
      if (this.tableTypes[tableIndex].populationType === 'all') {
        value = worldData[this.tableTypes[tableIndex].indicatorW];
      } else if (this.tableTypes[tableIndex].populationType === '100k') {
        value = +((worldData[this.tableTypes[tableIndex].indicatorW] / worldData.population) * 100000).toFixed(6);
      }
      this.fillTable(this.tableTypes[tableIndex].indicator, value, this.tableTypes[tableIndex].tableName);
      document.querySelector('.right-table').querySelector('h3').textContent = `Global statistics`;
    });
  }

  createCountryTable(tableIndex, countryISO) {
    let value;
    this.utils.getGlobal().then((dailyCountryData) => {
      dailyCountryData.forEach((country) => {
        if (country.countryInfo.iso2 === countryISO) {
          const countryData = country;
          if (this.tableTypes[tableIndex].populationType === 'all') {
            value = countryData[this.tableTypes[tableIndex].indicatorW];
          } else if (this.tableTypes[tableIndex].populationType === '100k') {
            value = +((countryData[this.tableTypes[tableIndex].indicatorW] / countryData.population) * 100000).toFixed(6);
          }
          this.fillTable(this.tableTypes[tableIndex].indicator, value, this.tableTypes[tableIndex].tableName);
          document.querySelector('.right-table').querySelector('h3').textContent = `${country.country} statistics`;
        }
      });
    });
  }

  fillTable(indicator, value, tableName) {
    const tableNameField = document.querySelector('.table-name');
    tableNameField.textContent = tableName;
    const tableindicatorField = document.querySelector('.table-key');
    tableindicatorField.textContent = indicator;
    const tableValueField = document.querySelector('.table-value');
    tableValueField.textContent = value;
  }

  getNextTable() {
    this.currentTable = (this.currentTable + 1) % 12;
    if (this.currentTableGlobalType === 'world') {
      this.createWorldTable(this.currentTable);
    } else {
      this.createCountryTable(this.currentTable, this.currentTableGlobalType);
    }
  }

  getPreviousTable() {
    this.currentTable = (this.currentTable + 12 - 1) % 12;
    if (this.currentTableGlobalType === 'world') {
      this.createWorldTable(this.currentTable);
    } else {
      this.createCountryTable(this.currentTable, this.currentTableGlobalType);
    }
  }

  activateEvents() {
    const leftTableArrow = document.querySelector('.left-table-arrow');
    const rightTableArrow = document.querySelector('.right-table-arrow');
    leftTableArrow.addEventListener('click', () => this.getPreviousTable());
    rightTableArrow.addEventListener('click', () => this.getNextTable());
  }
}

export default Part1Table;

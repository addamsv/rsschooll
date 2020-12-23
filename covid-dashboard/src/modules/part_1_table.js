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
        tableName: 'Confirmed For The Last Day',
        indicatorW: 'todayCases',
        populationType: 'all',
        period: 'last',
        indicator: 'cases',
      },
      {
        tableType: 'casesDay100',
        tableName: 'Confirmed per 100k For The Last Day',
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
        tableName: 'Deaths For The Last Day',
        indicatorW: 'todayDeaths',
        populationType: 'all',
        period: 'last',
        indicator: 'deaths',
      },
      {
        tableType: 'deathsDay100',
        tableName: 'Deaths per 100k For The Last Day',
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
        tableName: 'Recovered For The Last Day',
        indicatorW: 'todayRecovered',
        populationType: 'all',
        period: 'last',
        indicator: 'recovered',
      },
      {
        tableType: 'recoveredDay100',
        tableName: 'Recovered per 100k For The Last Day',
        indicatorW: 'todayRecovered',
        populationType: '100k',
        period: 'last',
        indicator: 'recovered',
      },
    ];
    this.currentISO2Name = null;
    this.activateEvents();
    this.createWorldTable(0);
  }

  setDataByCountry(ISO2) {
    this.currentISO2Name = ISO2;
    this.createCountryTable(this.getIndexByCase(this.utils.typeOfCase), ISO2);
  }

  setDataByCase(caseName) {
    this.tableTypes.some((type, index) => {
      if (type.tableType === caseName) {
        if (this.currentTableGlobalType === 'world') {
          this.createWorldTable(index);
        } else {
          this.createCountryTable(index, this.currentISO2Name);
        }
        return true;
      }
      return false;
    });
  }

  getIndexByCase(caseName) {
    let outIndex = 0;
    this.tableTypes.some((type, index) => {
      if (type.tableType === caseName) {
        outIndex = index;
        return true;
      }
      return false;
    });
    return outIndex;
  }

  createWorldTable(tableIndex) {
    if (!this.utils.getForGlobalCasesPartLoaded()) {
      this.utils.getDataForGlobalCasesPart().then((worldData) => {
        this.utils.forGlobalCasesPart = worldData;
        this.createWorldTableExecute(tableIndex, worldData);
      });
    } else {
      this.createWorldTableExecute(tableIndex, this.utils.getForGlobalCasesPartLoaded());
    }
    this.currentTableGlobalType = 'world';
  }

  createWorldTableExecute(tableIndex, worldData) {
    let value;
    if (this.tableTypes[tableIndex].populationType === 'all') {
      value = worldData[this.tableTypes[tableIndex].indicatorW];
    } else if (this.tableTypes[tableIndex].populationType === '100k') {
      value = +((worldData[this.tableTypes[tableIndex].indicatorW] / worldData.population) * 100000).toFixed(3);
    }
    this.fillTable(this.tableTypes[tableIndex].indicator, value, this.tableTypes[tableIndex].tableName);
    document.querySelector('.right-table').querySelector('h3').textContent = `Global Statistics`;
  }

  createCountryTable(tableIndex, countryISO) {
    if (!this.utils.getGlobalLoaded()) {
      this.utils.getGlobal().then((dailyCountryData) => {
        this.utils.global = dailyCountryData;
        this.createCountryTableExecute(tableIndex, countryISO, dailyCountryData);
      });
    } else {
      this.createCountryTableExecute(tableIndex, countryISO, this.utils.getGlobalLoaded());
    }
    this.currentTableGlobalType = countryISO;
  }

  createCountryTableExecute(tableIndex, countryISO, dailyCountryData) {
    let value;
    dailyCountryData.forEach((country) => {
      if (country.countryInfo.iso2 === countryISO) {
        const countryData = country;
        if (this.tableTypes[tableIndex].populationType === 'all') {
          value = countryData[this.tableTypes[tableIndex].indicatorW];
        } else if (this.tableTypes[tableIndex].populationType === '100k') {
          value = +((countryData[this.tableTypes[tableIndex].indicatorW] / countryData.population) * 100000).toFixed(3);
        }
        this.fillTable(this.tableTypes[tableIndex].indicator, value, this.tableTypes[tableIndex].tableName);
        document.querySelector('.right-table').querySelector('h3').textContent = `${country.country} Statistics`;
      }
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
    this.utils.setTypeOfCase(this.tableTypes[this.currentTable].tableType);
  }

  getPreviousTable() {
    this.currentTable = (this.currentTable + 12 - 1) % 12;
    if (this.currentTableGlobalType === 'world') {
      this.createWorldTable(this.currentTable);
    } else {
      this.createCountryTable(this.currentTable, this.currentTableGlobalType);
    }
    this.utils.setTypeOfCase(this.tableTypes[this.currentTable].tableType);
  }

  activateEvents() {
    const leftTableArrow = document.querySelector('.left-table-arrow');
    const rightTableArrow = document.querySelector('.right-table-arrow');
    leftTableArrow.addEventListener('click', () => this.getPreviousTable());
    rightTableArrow.addEventListener('click', () => this.getNextTable());
  }
}

export default Part1Table;

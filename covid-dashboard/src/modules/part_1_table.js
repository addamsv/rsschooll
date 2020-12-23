import Utils from './utils';
import a from './libs/data';
class Part1Table {
  constructor() {
    this.utils = new Utils();
    this.countriesTable = document.querySelector('.countries-table');
    this.diagramNameField = document.querySelector('.table-name');
    this.currentTable = 0;
    this.currentTableGlobalType = 'world';
    this.tableTypes = [
      {
        tableName: 'Total Confirmed',
        indicatorW: 'cases',
        indicatorC: 'Confirmed',
        period: 2, // 2 - all period, 1 last day
        population: 2, // 2 - all population, 1 - 100k
      },
      {
        tableName: 'Total Confirmed per 100k population',
        indicatorW: 'cases',
        indicatorC: 'Confirmed',
        period: 2,
        population: 1,
      },
      {
        tableName: 'Confirmed for the last day',
        indicatorW: 'cases',
        indicatorC: 'Confirmed',
        period: 1,
        population: 2,
      },
      {
        tableName: 'Confirmed per 100k population for the last day',
        indicatorW: 'cases',
        indicatorC: 'Confirmed',
        period: 1,
        population: 1,
      },
      {
        tableName: 'Total Deaths',
        indicatorW: 'deaths',
        indicatorC: 'Deaths',
        period: 2, 
        population: 2,
      },
      {
        tableName: 'Total Deaths per 100k population',
        indicatorW: 'deaths',
        indicatorC: 'Deaths',
        period: 2,
        population: 1,
      },
      {
        tableName: 'Deaths for the last day',
        indicatorW: 'deaths',
        indicatorC: 'Deaths',
        period: 1,
        population: 2,
      },
      {
        tableName: 'Deaths per 100k population for the last day',
        indicatorW: 'deaths',
        indicatorC: 'Deaths',
        period: 1,
        population: 1,
      },
      {
        tableName: 'Total Recovered',
        indicatorW: 'recovered',
        indicatorC: 'Recovered',
        period: 2,
        population: 2,
      },
      {
        tableName: 'Total Recovered per 100k population',
        indicatorW: 'recovered',
        indicatorC: 'Recovered',
        period: 2,
        population: 1,
      },
      {
        tableName: 'Recovered for the last day',
        indicatorW: 'recovered',
        indicatorC: 'Recovered',
        period: 1,
        population: 2,
      },
      {
        tableName: 'Recovered per 100k population for the last day',
        indicatorW: 'recovered',
        indicatorC: 'Recovered',
        period: 1,
        population: 1,
      },
    ];
    this.activateEventListeners();
    this.createWorldTable(0);
  }
  createWorldTable(tableIndex) {
    this.utils.getDailyWorldData().then((dailyWorldData) => {
      const indicator = this.tableTypes[tableIndex].indicatorW;
      document.querySelector('.table-key').textContent = this.tableTypes[tableIndex].indicatorC;
      const value;
      if (this.tableTypes[tableIndex].period === 2) {
        if (this.tableTypes[tableIndex].period.population === 1) {
          value = this.getLastReturnedData(dailyWorldData, indicator) / 1000000 * 100000;
        } else {
          value = this.getLastReturnedData(dailyWorldData, indicator);
        }
      } else {
        if (this.tableTypes[tableIndex].period.population === 1) {
          value = this.getLastReturnedData(dailyWorldData, indicator) / 1000000 * 100000;
        } else {
          
        }
      }

      document.querySelector('.table-value').innerHTML = value;
      this.setTableLabel(tableIndex);
    });
  }
  getNextTable() {
    this.currentTable = (this.currentTable+ 1) % 12;
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
  setTableLabel(tableIndex) {
    const tableLabel = document.querySelector('.table-name');
    tableLabel.textContent = this.tableTypes[tableIndex].tableName;
  }
  setCountryName() {
    document.querySelector('.table-country').textContent = this.currentTableGlobalType;
  }
  activateEventListeners() {
    const leftArrow = document.querySelector('.left-table-arrow');
    const rightArrow = document.querySelector('.right-table-arrow');
    leftArrow.addEventListener('click', () => this.getPreviousTable());
    rightArrow.addEventListener('click', () => this.getNextTable());
    const inputCountryField = document.querySelector('.search-field-input');
    inputCountryField.addEventListener('focus', () => { inputCountryField.textContent = ''; });
    const inputCountryIcon = document.querySelector('.search-field-img');
    inputCountryIcon.addEventListener('click', () => this.checkCountryExists(inputCountryField));
  }
  checkCountryExists(field) {
    if (a[field.textContent.toLowerCase()]) {
      this.createCountryDiagram(this.currentDiagram, field.textContent);
      this.currentDiagramGlobalType = field.textContent;
    } else {
      field.textContent = 'incorrect data';
    }
  }
  getLastReturnedData(dataObject, indicator) {
    const today = new Date();
    const currentDate = `${today.getMonth() + 1}/${today.getDate()}/${`${today.getFullYear()}`.slice(2)}`;
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const previousDate =`${yesterday.getMonth() + 1}/${yesterday.getDate()}/${`${yesterday.getFullYear()}`.slice(2)}`;
    const value = (dataObject[indicator][currentDate] in dataObject[indicator]) ? dataObject[indicator][currentDate] : dataObject[indicator][previousDate];
    return value;
  }
}

export default Part1Table;
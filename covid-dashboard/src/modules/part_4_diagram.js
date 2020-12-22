// import Utils from './utils';
import a from './libs/data';

const Chart = require('./libs/chart');

class Part4Diagram {
  constructor(utils) {
    this.utils = utils; // new Utils();
    this.diagramNameField = document.querySelector('.diagram-name');
    this.currentDiagram = 0;
    this.currentDiagramGlobalType = 'world';
    this.diagramTypes = [
      {
        diagramType: 'casesBar',
        diagramName: 'Daily Cases',
        graphicType: 'bar',
        indicatorW: 'cases',
        indicatorC: 'Confirmed',
      },
      {
        diagramType: 'casesLine',
        diagramName: 'Cumulative Cases',
        graphicType: 'line',
        indicatorW: 'cases',
        indicatorC: 'Confirmed',
      },
      {
        diagramType: 'deathsBar',
        diagramName: 'Daily Deaths',
        graphicType: 'bar',
        indicatorW: 'deaths',
        indicatorC: 'Deaths',
      },
      {
        diagramType: 'deathsLine',
        diagramName: 'Cumulative Deaths',
        graphicType: 'line',
        indicatorW: 'deaths',
        indicatorC: 'Deaths',
      },
      {
        diagramType: 'recoveredBar',
        diagramName: 'Daily Recovered',
        graphicType: 'bar',
        indicatorW: 'recovered',
        indicatorC: 'Recovered',
      },
      {
        diagramType: 'recoveredLine',
        diagramName: 'Cumulative Recovered',
        graphicType: 'line',
        indicatorW: 'recovered',
        indicatorC: 'Recovered',
      },
    ];
    // this.activateEventListeners();
    this.createWorldDiagram(this.currentDiagram);
  }

  /**
   * Common Messages
   */

  setDataByCase(caseName) {
    console.log(`part4 case: ${caseName}`);
  }

  setDataByCountry(iso2) {
    // this.createCountryDiagram(this.currentDiagram, iso2);
    console.log(`Diagram obj: ${iso2}`);
  }

  createWorldDiagram(diagramIndex) {
    if (!this.utils.getDailyWorldDataLoaded()) {
      this.utils.getDailyWorldData().then((dailyWorldData) => {
        this.utils.dailyWorldData = dailyWorldData;
        this.createWorldDiagramExecute(diagramIndex, dailyWorldData);
      });
      return false;
    }
    this.createWorldDiagramExecute(diagramIndex, this.utils.getDailyWorldDataLoaded());
    return true;
  }

  createWorldDiagramExecute(diagramIndex, dailyWorldData) {
    const dates = [];
    const statistics = [];
    const indicator = this.diagramTypes[diagramIndex].indicatorW;
    let totalPrevCases = 0;
    let backgroundColor;
    Object.keys(dailyWorldData[indicator]).some((dayWorldData) => {
      dates.push(dayWorldData);
      if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
        statistics.push(Math.abs(dailyWorldData[indicator][dayWorldData] - totalPrevCases));
        backgroundColor = 'rgb(255, 170, 0)';
      } else {
        statistics.push(dailyWorldData[indicator][dayWorldData]);
      }
      totalPrevCases = dailyWorldData[indicator][dayWorldData];
      return false;
    });
    this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
    this.addDiagramLabel(diagramIndex);
    // for (const dayWorldData in dailyWorldData[indicator]) {
    //   dates.push(dayWorldData);
    //   if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
    //     statistics.push(Math.abs(dailyWorldData[indicator][dayWorldData] - totalPrevCases));
    //     backgroundColor = 'rgb(255, 170, 0)';
    //   } else {
    //     statistics.push(dailyWorldData[indicator][dayWorldData]);
    //   }
    //   totalPrevCases = dailyWorldData[indicator][dayWorldData];
    // }
  }

  createCountryDiagram(diagramIndex, country) {
    if (!this.utils.getCountryDataLoaded(country)) {
      this.utils.getCountryData(country).then((dailyCountryData) => {
        this.utils.countryData[country] = dailyCountryData;
        console.log(dailyCountryData);
        this.createCountryDiagramExecute(diagramIndex, dailyCountryData);
      });
      return false;
    }
    this.createCountryDiagramExecute(diagramIndex, this.utils.getCountryDataLoaded(country));
    return true;
  }

  createCountryDiagramExecute(diagramIndex, dailyCountryData) {
    console.log(dailyCountryData);
    const dates = [];
    const statistics = [];
    const indicator = this.diagramTypes[diagramIndex].indicatorC;
    let backgroundColor;
    let totalPrevCases = 0;
    dailyCountryData.forEach((dailyData) => {
      dates.push(`${dailyData.Date.slice(8, 10)}/${dailyData.Date.slice(5, 7)}/${dailyData.Date.slice(0, 4)}`);
      if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
        statistics.push(dailyData[indicator] - totalPrevCases);
        totalPrevCases = dailyData[indicator];
        backgroundColor = 'rgb(255, 170, 0)';
      } else {
        statistics.push(dailyData[indicator]);
      }
    });
    this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
    this.addDiagramLabel(diagramIndex);
  }

  createDiagram(xData, yData, type, backgroundColor) {
    document.querySelector('.chart').innerHTML = '';
    const canvas = `<canvas id="myChart"></canvas>`;
    document.querySelector('.chart').innerHTML = canvas;
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartOptions = {
      type,
      data: {
        labels: xData,
        datasets: [{
          label: '',
          backgroundColor,
          borderColor: 'rgb(255, 170, 0)',
          data: yData,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true,
            },
            ticks: {
              maxTicksLimit: 5,
              min: 0,
            },

          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],

        },
      },
    };
    return new Chart(ctx, chartOptions);
  }

  addDiagramLabel(diagramIndex) {
    this.diagramNameField.textContent = this.diagramTypes[diagramIndex].diagramName;
  }

  activateEventListeners() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    leftArrow.addEventListener('click', () => this.getPreviousDiagram());
    rightArrow.addEventListener('click', () => this.getNextDiagram());
    const inputCountryField = document.querySelector('.search-field-input');
    inputCountryField.addEventListener('focus', () => { inputCountryField.textContent = ''; });
    const inputCountryIcon = document.querySelector('.search-field-img');
    inputCountryIcon.addEventListener('click', () => this.checkCountryExists(inputCountryField));
  }

  getNextDiagram() {
    this.currentDiagram = (this.currentDiagram + 1) % 6;
    if (this.currentDiagramGlobalType === 'world') {
      this.createWorldDiagram(this.currentDiagram);
    } else {
      this.createCountryDiagram(this.currentDiagram, this.currentDiagramGlobalType);
    }
  }

  getPreviousDiagram() {
    this.currentDiagram = (this.currentDiagram + 6 - 1) % 6;
    if (this.currentDiagramGlobalType === 'world') {
      this.createWorldDiagram(this.currentDiagram);
    } else {
      this.createCountryDiagram(this.currentDiagram, this.currentDiagramGlobalType);
    }
  }

  checkCountryExists(field) {
    const inputField = field;
    if (a[field.textContent.toLowerCase()]) {
      this.createCountryDiagram(this.currentDiagram, field.textContent);
      this.currentDiagramGlobalType = field.textContent;
    } else {
      inputField.textContent = 'incorrect data';
    }
  }
}

export default Part4Diagram;
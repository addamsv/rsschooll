// import Utils from './utils';
import a from './libs/data';

const Chart = require('./libs/chart');

class Part4Diagram {
  constructor(utils) {
    this.utils = utils;
    this.currentDiagram = 0;
    this.currentDiagramGlobalType = 'world';
    this.diagramTypes = [
      {
        diagramType: 'casesAll',
        diagramName: 'Cumulative Confirmed',
        graphicType: 'line',
        indicatorW: 'cases',
        populationType: 'all',
      },
      {
        diagramType: 'casesAll100',
        diagramName: 'Cumulative Confirmed per 100k',
        graphicType: 'line',
        indicatorW: 'cases',
        populationType: '100k',
      },
      {
        diagramType: 'casesDay',
        diagramName: 'Daily Confirmed',
        graphicType: 'bar',
        indicatorW: 'cases',
        populationType: 'all',
      },
      {
        diagramType: 'casesDay100',
        diagramName: 'Daily Confirmed per 100k',
        graphicType: 'bar',
        indicatorW: 'cases',
        populationType: '100k',
      },
      {
        diagramType: 'deathsAll',
        diagramName: 'Cumulative Deaths',
        graphicType: 'line',
        indicatorW: 'deaths',
        populationType: 'all',
      },
      {
        diagramType: 'deathsAll100',
        diagramName: 'Cumulative Deaths per 100k',
        graphicType: 'line',
        indicatorW: 'deaths',
        populationType: '100k',
      },
      {
        diagramType: 'deathsDay',
        diagramName: 'Daily Deaths',
        graphicType: 'bar',
        indicatorW: 'deaths',
        populationType: 'all',
      },
      {
        diagramType: 'deathsDay100',
        diagramName: 'Daily Deaths per 100k',
        graphicType: 'bar',
        indicatorW: 'deaths',
        populationType: '100k',
      },
      {
        diagramType: 'recoveredAll',
        diagramName: 'Cumulative Recovered',
        graphicType: 'line',
        indicatorW: 'recovered',
        populationType: 'all',
      },
      {
        diagramType: 'recoveredAll100',
        diagramName: 'Cumulative Recovered per 100k',
        graphicType: 'line',
        indicatorW: 'recovered',
        populationType: '100k',
      },
      {
        diagramType: 'recoveredDay',
        diagramName: 'Daily Recovered',
        graphicType: 'bar',
        indicatorW: 'recovered',
        populationType: 'all',
      },
      {
        diagramType: 'recoveredDay100',
        diagramName: 'Daily Recovered per 100k',
        graphicType: 'bar',
        indicatorW: 'recovered',
        populationType: '100k',
      },
    ];
    this.diagramNameField = document.querySelector('.diagram-name');
    this.createWorldDiagram(0);
  }

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
    if (this.diagramTypes[diagramIndex].populationType === 'all') {
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
    } else if (this.diagramTypes[diagramIndex].populationType === '100k') {
      this.utils.getDataForGlobalCasesPart().then((data) => {
        const population = data.population;
        console.log(population);
        Object.keys(dailyWorldData[indicator]).some((dayWorldData) => {
          dates.push(dayWorldData);
          if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
            statistics.push(+((Math.abs(dailyWorldData[indicator][dayWorldData] - totalPrevCases) / population) * 100000).toFixed(6));
            backgroundColor = 'rgb(255, 170, 0)';
          } else {
            statistics.push(+((dailyWorldData[indicator][dayWorldData] / population) * 100000).toFixed(6));
          }
          totalPrevCases = dailyWorldData[indicator][dayWorldData];
          return false;
        });
        this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
      });
    }
    this.addDiagramLabel(diagramIndex);
  }

  createCountryDiagram(diagramIndex, country) {
    this.utils.getDailyCountryData(country).then((dailyCountryData) => {
      dailyCountryData = dailyCountryData.timeline;
      const dates = [];
      const statistics = [];
      const indicator = this.diagramTypes[diagramIndex].indicatorW;
      let totalPrevCases = 0;
      let backgroundColor;
      if (this.diagramTypes[diagramIndex].populationType === 'all') {
        Object.keys(dailyCountryData[indicator]).some((dayCountryData) => {
          dates.push(dayCountryData);
          if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
            statistics.push(Math.abs(dailyCountryData[indicator][dayCountryData] - totalPrevCases));
            backgroundColor = 'rgb(255, 170, 0)';
          } else {
            statistics.push(dailyCountryData[indicator][dayCountryData]);
          }
          totalPrevCases = dailyCountryData[indicator][dayCountryData];
          return false;
        });
        this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
      } else if (this.diagramTypes[diagramIndex].populationType === '100k') {
        this.utils.getDataForGlobalCasesPart().then((data) => {
          const population = data.population;
          Object.keys(dailyCountryData[indicator]).some((dayCountryData) => {
            dates.push(dayCountryData);
            if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
              statistics.push(+((Math.abs(dailyCountryData[indicator][dayCountryData] - totalPrevCases) / population) * 100000).toFixed(6));
              backgroundColor = 'rgb(255, 170, 0)';
            } else {
              statistics.push(+((dailyCountryData[indicator][dayCountryData] / population) * 100000).toFixed(6));
            }
            totalPrevCases = dailyCountryData[indicator][dayCountryData];
            return false;
          });
          this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
        });
      }
      this.addDiagramLabel(diagramIndex);
    });
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
    this.currentDiagram = (this.currentDiagram + 1) % 12;
    if (this.currentDiagramGlobalType === 'world') {
      this.createWorldDiagram(this.currentDiagram);
    } else {
      this.createCountryDiagram(this.currentDiagram, this.currentDiagramGlobalType);
    }
  }

  getPreviousDiagram() {
    this.currentDiagram = (this.currentDiagram + 12 - 1) % 12;
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

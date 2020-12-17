import Utils from './utils';
import a from './data';

const Chart = require('./libs/chart');


class Part4Diagram {
  constructor() {
    this.utils = new Utils();
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
    this.activateEventListeners();
    this.createWorldDiagram(this.currentDiagram);
  }


  createWorldDiagram(diagramIndex) {    
    this.utils.getDailyWorldData().then((dailyWorldData) => {
      const dates = [];
      const statistics = [];
      const indicator = this.diagramTypes[diagramIndex].indicatorW;
      let totalPrevCases = 0;
      let backgroundColor;
      for (let dayWorldData in dailyWorldData[indicator]) {
        dates.push(dayWorldData);
        if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
          statistics.push(Math.abs(dailyWorldData[indicator][dayWorldData] - totalPrevCases));
          backgroundColor = 'rgb(255, 170, 0)';
        } else {
          statistics.push(dailyWorldData[indicator][dayWorldData]);
        }
        totalPrevCases = dailyWorldData[indicator][dayWorldData];
      }
      this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
      this.addDiagramLabel(diagramIndex);
    });
  }
 
  createCountryDiagram(diagramIndex, country) {
    this.utils.getCountryData(country).then((dailyCountryData) => {
      console.log(dailyCountryData);
      const dates = [];
      const statistics = [];
      const indicator = this.diagramTypes[diagramIndex].indicatorC;
      let backgroundColor;
      let totalPrevCases = 0;
      dailyCountryData.forEach((dailyData, index) => {
        dates.push(`${dailyData.Date.slice(8, 10)}/${dailyData.Date.slice(5, 7)}/${dailyData.Date.slice(0, 4)}`);
        if (this.diagramTypes[diagramIndex].graphicType === 'bar') {
          statistics.push(dailyData[indicator] - totalPrevCases);
          totalPrevCases = dailyData[indicator];
          backgroundColor = 'rgb(255, 170, 0)';
        } else {

          statistics.push(dailyData[indicator]);
        }
      })
      this.createDiagram(dates, statistics, this.diagramTypes[diagramIndex].graphicType, backgroundColor);
      this.addDiagramLabel(diagramIndex);
    });
  }; 

  createDiagram(xData, yData, type, backgroundColor) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: type,
      data: {
        labels: xData,
        datasets: [{
          label: '',
          backgroundColor,
          borderColor: 'rgb(255, 170, 0)',
          data: yData,
        }]
       },
      options: {
        legend: {
           display: false,
         }
       }
    });
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
    inputCountryField.addEventListener('focus', () => inputCountryField.textContent = '');
    const inputCountryIcon = document.querySelector('.search-field-img');
    inputCountryIcon.addEventListener('click', () => this.checkCountryExists(inputCountryField));
  }

  getNextDiagram() {
    this.currentDiagram = (this.currentDiagram + 1) % 6;
    if (this.currentDiagramGlobalType == 'world') {
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
    if (a[field.textContent.toLowerCase()]) {
      this.createCountryDiagram(this.currentDiagram, field.textContent);
      this.currentDiagramGlobalType = field.textContent;
    } else {
      field.textContent = 'incorrect data';
    }
  }

}

export default Part4Diagram;
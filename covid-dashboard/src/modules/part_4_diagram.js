import Utils from './utils';

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
        indicator: 'cases',
      },
      {
        diagramType: 'casesLine',
        diagramName: 'Cumulative Cases',
        graphicType: 'line',
        indicator: 'cases',
      },
      {
        diagramType: 'deathsBar',
        diagramName: 'Daily Deaths',
        graphicType: 'bar',
        indicator: 'deaths',
      },
      {
        diagramType: 'deathsLine',
        diagramName: 'Cumulative Deaths',
        graphicType: 'line',
        indicator: 'deaths',
      },
      {
        diagramType: 'recoveredBar',
        diagramName: 'Daily Recovered',
        graphicType: 'bar',
        indicator: 'recovered',
      },
      {
        diagramType: 'recoveredLine',
        diagramName: 'Cumulative Recovered',
        graphicType: 'line',
        indicator: 'recovered',
      },
    ];
    this.activateArrows();
    this.createWorldDiagram(this.currentDiagram);
  }


  createWorldDiagram(diagramIndex) {    
    this.utils.getDailyWorldData().then((dailyWorldData) => {
      const dates = [];
      const statistics = [];
      const indicator = this.diagramTypes[diagramIndex].indicator;
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
  createCountryDiagram(diagramIndex) {
    return;
  }

  createDiagram(xData, yData, type, backgroundColor){
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

  activateArrows() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    leftArrow.addEventListener('click', () => this.getPreviousDiagram());
    rightArrow.addEventListener('click', () => this.getNextDiagram());
  }

  getNextDiagram() {
    this.currentDiagram = (this.currentDiagram + 1) % 6;
    if (this.currentDiagramGlobalType == 'world') {
      this.createWorldDiagram(this.currentDiagram);
    } else {
      this.createCountryDiagram(this.currentDiagram);
    }
  }

  getPreviousDiagram() {
    this.currentDiagram = (this.currentDiagram + 6 - 1) % 6;
    if (this.currentDiagramGlobalType === 'world') {
      this.createWorldDiagram(this.currentDiagram);
    } else {
      this.createCountryDiagram(this.currentDiagram);
    }
  }

}

export default Part4Diagram;
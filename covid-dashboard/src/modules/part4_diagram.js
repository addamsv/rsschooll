import Utils from './utils';

const Chart = require('./libs/chart');


class Diagram {
  constructor() {
    this.utils = new Utils();
    this.createWorldDiagram();
  }

  createWorldDiagram() {
    const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const death = [345, 765, 123, 567, 876, 234, 567, 987, 345];
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: '',
          backgroundColor: 'rgb(255, 170, 0)',
          borderColor: 'rgb(255, 170, 0)',
          data: death,
        }]
      },
      options: {}
    });
  }
}

export default Diagram;
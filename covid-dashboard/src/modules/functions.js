export default class Functions {
  init() {
    return true;
  }

  activateStretchingEvent() {
    const GLOBAL_CASES = document.querySelector('.global-cases');
    const MAP = document.querySelector('.map');
    const LIST = document.querySelector('.cases-list');
    const TABLE = document.querySelector('.right-table');
    const CHART = document.querySelector('.right-chart');
    GLOBAL_CASES.querySelector('.close').addEventListener('click', () => {
      GLOBAL_CASES.classList.toggle('all-window');
      MAP.classList.toggle('disabled');
      LIST.classList.toggle('disabled');
      TABLE.classList.toggle('disabled');
      CHART.classList.toggle('disabled');
    });

    MAP.querySelector('.close').addEventListener('click', () => {
      MAP.classList.toggle('all-window');
      GLOBAL_CASES.classList.toggle('disabled');
      LIST.classList.toggle('disabled');
      TABLE.classList.toggle('disabled');
      CHART.classList.toggle('disabled');
    });

    LIST.querySelector('.close').addEventListener('click', () => {
      MAP.classList.toggle('disabled');
      GLOBAL_CASES.classList.toggle('disabled');
      LIST.classList.toggle('all-window');
      document.querySelector('.cases-list').classList.toggle('height100');
      TABLE.classList.toggle('disabled');
      CHART.classList.toggle('disabled');
    });

    TABLE.querySelector('.close').addEventListener('click', () => {
      MAP.classList.toggle('disabled');
      GLOBAL_CASES.classList.toggle('disabled');
      LIST.classList.toggle('disabled');
      TABLE.classList.toggle('all-window');
      CHART.classList.toggle('disabled');
    });

    CHART.querySelector('.close').addEventListener('click', () => {
      MAP.classList.toggle('disabled');
      GLOBAL_CASES.classList.toggle('disabled');
      LIST.classList.toggle('disabled');
      TABLE.classList.toggle('disabled');
      CHART.classList.toggle('all-window');
    });
  }
}
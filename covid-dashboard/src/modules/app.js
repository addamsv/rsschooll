import Functions from "./functions";
import Part1Table from './part_1_table';
import Part3Map from './part_3_map';
import Part2List from './part_2_list';
import Part4Diagram from './part_4_diagram';
import Utils from "./utils";
import RSSKeyBoard from "./libs/virtual-keyboard/script";

const leftDiagramArrow = document.querySelector('.diagram-left-arrow');
const rightDiagramArrow = document.querySelector('.diagram-right-arrow');
const GLOBAL_CASES = document.querySelector('.global-cases');
const MAP = document.querySelector('.map');
const LIST = document.querySelector('.cases-list');
const TABLE = document.querySelector('.right-table');
const CHART = document.querySelector('.right-chart');
console.log(TABLE, CHART);
export default class App extends Functions {
  constructor() {
    super();
    this.initEvents();
    this.utils = new Utils();
    this.part3Map = new Part3Map(this.utils);
    this.part4Diagram = new Part4Diagram(this.utils);
    this.part2List = new Part2List(this.utils);
    this.part1Table = new Part1Table(this.utils);
    this.rssKeyBoard = new RSSKeyBoard();
  }

  initEvents() {
    const CONTEXT = this;
    function checkEvent(event) {
      /* countries */
      if (event.target && event.target.dataset && event.target.dataset.setCountry) {
        const ISO2 = event.target.dataset.setCountry;
        CONTEXT.part3Map.setDataByCountry(ISO2);
        CONTEXT.part4Diagram.setDataByCountry(ISO2);
        CONTEXT.part1Table.setDataByCountry(ISO2);
      }
      if (event.target && event.target.dataset && event.target.dataset.country) {
        const ISO2 = event.target.dataset.country;
        CONTEXT.utils.setEventOfChangeCountry(ISO2);
      }
      if (event.target && event.target.parentElement && event.target.parentElement.dataset.country) {
        const ISO2 = event.target.parentElement.dataset.country;
        CONTEXT.utils.setEventOfChangeCountry(ISO2);
      }
      /* cases */
      if (event.target && event.target.dataset && event.target.dataset.setCase) {
        CONTEXT.part2List.setDataByCase(event.target.dataset.setCase);
        CONTEXT.part3Map.setDataByCase(event.target.dataset.setCase);
        CONTEXT.part4Diagram.setDataByCase(event.target.dataset.setCase);
        CONTEXT.part1Table.setDataByCase(event.target.dataset.setCase);
      }
    }
    function checkSelect(event) {
      if (event.target && event.target.dataset && event.target.dataset.case) {
        event.stopPropagation();
        const CASE = event.target[event.target.selectedIndex].value;
        CONTEXT.utils.setTypeOfCase(CASE);
      }
    }
    function setSearchingCountry(event) {
      if (event.target.id === 'countriesSearch' && (event.keyCode === 13)) {
        console.log(event.keyCode);
      }
    }
    function getPreviousDiagram() {
      CONTEXT.part4Diagram.getPreviousDiagram();
    }
    function getNextDiagram() {
      CONTEXT.part4Diagram.getNextDiagram();
    }

    document.addEventListener('change', checkSelect);
    document.addEventListener('click', checkEvent);
    document.addEventListener('keyup', setSearchingCountry);
    leftDiagramArrow.addEventListener('click', () => getPreviousDiagram());
    rightDiagramArrow.addEventListener('click', () => getNextDiagram());

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

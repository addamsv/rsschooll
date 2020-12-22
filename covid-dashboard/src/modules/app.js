import Functions from "./functions";
import Part3Map from './part_3_map';
import Part2List from './part_2_list';
import Part4Diagram from './part_4_diagram';
import Utils from "./utils";

// const EVENT_ELEMENT = document.querySelector('[data-set-country]');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const inputCountryField = document.querySelector('.search-field-input');
const inputCountryIcon = document.querySelector('.search-field-img');
export default class App extends Functions {
  constructor() {
    super();
    this.initEvents();
    this.utils = new Utils();
    this.part3Map = new Part3Map(this.utils);
    this.part4Diagram = new Part4Diagram(this.utils);
    this.part2List = new Part2List(this.utils);
  }

  initEvents() {
    const CONTEXT = this;
    function checkEvent(event) {
      /* countries */
      if (event.target && event.target.dataset && event.target.dataset.setCountry) {
        const ISO2 = event.target.dataset.setCountry;
        // CONTEXT.part2List.setDataByCountry(event.target.dataset.setCountry);
        CONTEXT.part3Map.setDataByCountry(ISO2);
        CONTEXT.part4Diagram.setDataByCountry(ISO2);
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
        // CONTEXT.part2List.setDataByCase(event.target.dataset.setCase);
        CONTEXT.part3Map.setDataByCase(event.target.dataset.setCase);
        CONTEXT.part4Diagram.setDataByCase(event.target.dataset.setCase);
      }
    }
    function checkSelect(event) {
      if (event.target && event.target.dataset && event.target.dataset.case) {
        event.stopPropagation();
        // console.log(event.target[event.target.selectedIndex].value);//+ ' '+ event.target[event.target.selectedIndex].value
        const CASE = event.target[event.target.selectedIndex].value;
        CONTEXT.utils.setTypeOfCase(CASE);
      }
    }
    function getPreviousDiagram() {
      CONTEXT.part4Diagram.getPreviousDiagram();
    }
    function getNextDiagram() {
      CONTEXT.part4Diagram.getNextDiagram();
    }
    function checkCountryExists() {
      CONTEXT.part4Diagram.checkCountryExists(inputCountryField);
    }
    /**
     * Add Event Listeners
     */
    document.addEventListener('change', checkSelect);
    document.addEventListener('click', checkEvent);
    leftArrow.addEventListener('click', () => getPreviousDiagram());
    rightArrow.addEventListener('click', () => getNextDiagram());
    inputCountryField.addEventListener('focus', () => { inputCountryField.textContent = ''; });
    inputCountryIcon.addEventListener('click', () => checkCountryExists(inputCountryField));
  }
}
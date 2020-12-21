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
    this.Part3Map = new Part3Map(this.utils);
    this.Part4Diagram = new Part4Diagram(this.utils);
    this.Part2List = new Part2List(this.utils);
  }

  initEvents() {
    const CONTEXT = this;
    function checkEvent(event) {
      if (event.target && event.target.dataset && event.target.dataset.setCountry) {
        // CONTEXT.Part2List.setDataByCase(event.target.dataset.setCountry);
        CONTEXT.Part3Map.setDataByCase(event.target.dataset.setCountry);
        // CONTEXT.Part4Diagram.setDataByCase(event.target.dataset.setCountry);
      }
      if (event.target && event.target.dataset && event.target.dataset.country) {
        // CONTEXT.Part2List.setDataByCase(event.target.dataset.country);
        CONTEXT.Part3Map.setDataByCase(event.target.dataset.country);
        // CONTEXT.Part4Diagram.setDataByCase(event.target.dataset.country);
      }
      if (event.target && event.target.parentElement && event.target.parentElement.dataset.country) {
        // CONTEXT.Part2List.setDataByCase(event.target.parentElement.country);
        CONTEXT.Part3Map.setDataByCase(event.target.parentElement.dataset.country);
        // CONTEXT.Part4Diagram.setDataByCase(event.target.parentElement.country);
      }
    }
    function getPreviousDiagram() {
      CONTEXT.Part4Diagram.getPreviousDiagram();
    }
    function getNextDiagram() {
      CONTEXT.Part4Diagram.getNextDiagram();
    }
    function checkCountryExists() {
      CONTEXT.Part4Diagram.checkCountryExists(inputCountryField);
    }
    /**
     * Add Event Listeners
     */
    // document.addEventListener('click', checkEvent);
    document.addEventListener('click', checkEvent);
    leftArrow.addEventListener('click', () => getPreviousDiagram());
    rightArrow.addEventListener('click', () => getNextDiagram());
    inputCountryField.addEventListener('focus', () => { inputCountryField.textContent = ''; });
    inputCountryIcon.addEventListener('click', () => checkCountryExists(inputCountryField));
  }
}
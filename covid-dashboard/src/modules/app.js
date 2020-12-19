import Functions from "./functions";
import Part3Map from './part_3_map';
import Part2List from './part_2_list';
import Part4Diagram from './part_4_diagram';
import Utils from "./utils";

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
    // function checkEvent(event) {
    //   console.log(event);
    // }
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
    leftArrow.addEventListener('click', () => getPreviousDiagram());
    rightArrow.addEventListener('click', () => getNextDiagram());
    inputCountryField.addEventListener('focus', () => { inputCountryField.textContent = ''; });
    inputCountryIcon.addEventListener('click', () => checkCountryExists(inputCountryField));
  }
}
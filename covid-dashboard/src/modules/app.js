import Functions from "./functions";
import Part3Map from './part_3_map';
import Part4Diagram from './part4_diagram';

export default class App extends Functions {
  constructor() {
    super();
    this.initEvents();
    this.Part3Map = new Part3Map();
    this.Part4Diagram = new Part4Diagram();
  }

  initEvents() {
    function checkEvent(event) {
      console.log(event);
    }
    /**
     * Add Event Listeners
     */
    // document.addEventListener('click', checkEvent);
  }
}
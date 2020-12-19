import Functions from "./functions";
import Part1Table from "./part_1_table";


export default class App extends Functions {
  constructor() {
    super();
    this.Part1Table = new Part1Table()
    this.initEvents();

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
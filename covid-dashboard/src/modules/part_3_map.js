import Utils from './utils';

const L = require('./libs/leaflet');

class Part3Map {
  constructor() {
    this.createMap();
    this.utils = new Utils();
    console.log(this.utils.getCountryData('Belarus'));
  }

  /**
  * Interface (@public)
  */
  createMap() {
    this.map = null;
    this.makeMap();
    this.makeLayer();
    this.makeMarker();
  }

  /**
  * Realization (@private)
  */

  makeMap() {
    const MAP_OPTIONS = {
      center: [53.9, 27.56667],
      zoom: 2,
    };
    // eslint-disable-next-line new-cap
    this.map = new L.map('map', MAP_OPTIONS);
  }

  makeLayer() {
    const LAYER = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.map.addLayer(LAYER);
  }

  makeMarker() {
    /**
     * Creating a marker:
     * also has iconAnchor: [22, 94], popupAnchor: [-3, -76], shadowUrl: 'ok.png', shadowSize: [68, 95], shadowAnchor: [22, 94]
     */
    let marker;
    const myIcon = L.icon({
      iconUrl: './assets/images/ok.png',
      iconSize: [50, 50],
    });
    const MARKER_OPTIONS = {
      title: "Интенсивность 0",
      clickable: true,
      icon: myIcon,
    };
    marker = L.marker([53.9, 27.56667], MARKER_OPTIONS);
    marker.bindPopup('can put whatever we want').openPopup();
    marker.addTo(this.map);

    marker = L.marker([56.9, 27.56667], MARKER_OPTIONS).addTo(this.map);
    marker = L.marker([56.9, 30.56667], MARKER_OPTIONS).addTo(this.map);
  }
}

export default Part3Map;
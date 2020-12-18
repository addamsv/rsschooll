import Utils from './utils';
import DATA from './libs/data';
import GEO_JSON_COUNTRY_LAYERS_DATA from './libs/geoJsonLib';

const L = require('./libs/leaflet');

class Part3Map {
  constructor() {
    this.utils = new Utils();
    this.createMap();
  }

  /**
  * Interface (@public)
  */
  createMap() {
    this.map = null;
    this.makeMap();
    this.makeLayer();
    this.makeMarker();
    this.setCountryLayer();
  }

  /**
  * Realization (@private)
  */

  makeMap() {
    const MAP_OPTIONS = {
      center: [23, 57],
      zoom: 2,
    };
    // eslint-disable-next-line new-cap
    this.map = new L.map('map', MAP_OPTIONS);
  }

  makeLayer() {
    const LAYER = new L.TileLayer('https://{s}.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}.png');
    this.map.addLayer(LAYER);
  }

  setMarkerCertainCountry(certainCountryName) {
    this.utils.getCountryData(certainCountryName).then((result) => {
      const LAST_DAY_CANADIAN_DATA = this.getLastDayCertainCountryData(result);
      // console.log(LAST_DAY_CANADIAN_DATA);
      Object.keys(LAST_DAY_CANADIAN_DATA).some((provinceName) => {
        if (LAST_DAY_CANADIAN_DATA[provinceName].Lat) {
          const myIcon = L.icon({
            iconUrl: './assets/images/ok.png',
            iconSize: this.getMarkerSizeCertainCountry(LAST_DAY_CANADIAN_DATA[provinceName]),
          });
          const markerOptions = {
            title: `${LAST_DAY_CANADIAN_DATA[provinceName].Province} confirmed: ${LAST_DAY_CANADIAN_DATA[provinceName].Confirmed}`,
            clickable: true,
            icon: myIcon,
          };
          const marker = L.marker([LAST_DAY_CANADIAN_DATA[provinceName].Lat, LAST_DAY_CANADIAN_DATA[provinceName].Lon], markerOptions);
          // Deaths: ${LAST_DAY_CANADIAN_DATA[provinceName].Deaths};
          marker.bindPopup(`${LAST_DAY_CANADIAN_DATA[provinceName].Province} Cases: ${LAST_DAY_CANADIAN_DATA[provinceName].Confirmed}`).openPopup();
          marker.addTo(this.map);
        }
        return false;
      });
    });
  }

  getLastDayCertainCountryData(data) {
    const returnData = {};
    data.some((provinceObject) => {
      if (!returnData[provinceObject.Province]) {
        returnData[provinceObject.Province] = {};
        returnData[provinceObject.Province] = provinceObject;
        return false;
      }
      if (returnData[provinceObject.Province] && returnData[provinceObject.Province].Confirmed < provinceObject.Confirmed) {
        returnData[provinceObject.Province] = provinceObject;
      }
      return false;
    });
    return returnData;
  }

  getMarkerSizeCertainCountry(provinceObject) {
    if (!provinceObject.Confirmed) {
      return [5, 5];
    }
    const CONSTRAIN = [[1, 5], [1000, 7], [3000, 9], [20000, 12], [50000, 14], [100000, 16], [250000, 18],
      [400000, 20], [500000, 22], [1000000, 24], [5000000, 25], [10000000, 30], [15000000, 40]];
    const DEFAULT_SIZE = 27;
    let markerSize;
    CONSTRAIN.some((constrainElement) => {
      if (constrainElement[0] >= provinceObject.Confirmed) {
        markerSize = [constrainElement[1], constrainElement[1]];
        return true;
      }
      return false;
    });
    return (markerSize) || [DEFAULT_SIZE, DEFAULT_SIZE];
  }

  makeMarker() {
    /**
     * Creating a marker:
     * also has iconAnchor: [22, 94], popupAnchor: [-3, -76], shadowUrl: 'ok.png', shadowSize: [68, 95], shadowAnchor: [22, 94]
     */

    let countriesData = [];
    let countryData = [];

    this.utils.getGlobal().then((result) => {
      // document.getElementById('allCases').innerHTML = '';
      document.getElementById('allCases').innerHTML = `<p style="color:#aaa; text-align: center;">${result.Global.TotalConfirmed}</p>`;
      countriesData = result.Countries;
      Object.keys(DATA).some((countrySlug) => {
        switch (countrySlug) {
          case "france":
            this.setMarkerCertainCountry('fr');
            break;
          case "canada":
            this.setMarkerCertainCountry('ca');
            break;
          case "australia":
            this.setMarkerCertainCountry('au');
            break;
          case "china":
            this.setMarkerCertainCountry('cn');
            break;
          default:
        }
        if (DATA[countrySlug].Lon) {
          countryData = this.getCountryData(countriesData, countrySlug);
          const myIcon = L.icon({
            iconUrl: './assets/images/ok.png',
            iconSize: this.getMarkerSize(countryData),
          });
          const markerOptions = {
            title: `${countryData.Country} confirmed: ${countryData.TotalConfirmed}`,
            clickable: true,
            icon: myIcon,
          };
          const marker = L.marker([DATA[countrySlug].Lat, DATA[countrySlug].Lon], markerOptions);
          marker.bindPopup(`${countryData.Country} Deaths: ${countryData.TotalDeaths}; Cases: ${countryData.TotalConfirmed}`).openPopup();
          marker.addTo(this.map);
        }
        return false;
      });
    });
  }

  getCountryData(objArray, countrySlug) {
    let data = {};
    if (!objArray) {
      return false;
    }
    objArray.some((innerObject) => {
      if (innerObject.Slug === countrySlug || innerObject.Province === countrySlug) {
        data = innerObject;
        return true;
      }
      return false;
    });
    return data;
  }

  getMarkerSize(countryData) {
    if (!countryData.TotalConfirmed) {
      return [5, 5];
    }
    const CONSTRAIN = [
      [1, 5], [1000, 7], [3000, 9], [20000, 12], [50000, 14], [100000, 16], [250000, 18], [400000, 20],
      [500000, 22], [1000000, 24], [5000000, 25], [10000000, 30], [15000000, 40]];
    const DEFAULT_SIZE = 27;
    let markerSize;
    CONSTRAIN.some((constrainElement) => {
      if (constrainElement[0] >= countryData.TotalConfirmed) {
        markerSize = [constrainElement[1], constrainElement[1]];
        return true;
      }
      return false;
    });
    return (markerSize) || [DEFAULT_SIZE, DEFAULT_SIZE];
  }

  setCountryLayer() {
    // eslint-disable-next-line new-cap
    const gpsMarker = new L.geoJson(GEO_JSON_COUNTRY_LAYERS_DATA, {
      onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent, { closeButton: false, offset: L.point(0, 0) });
          layer.on('mouseover', () => { console.log(feature.properties.popupContent); });
          layer.on('mouseout', () => { console.log('something'); });
        }
      },
      color: 'red',
      weight: 1,
      opacity: 0.2,
      fillOpacity: 0.1,
      fillColor: "red",
    });
    gpsMarker.addTo(this.map);
  }
}

export default Part3Map;
import DATA from './libs/data';

const L = require('./libs/leaflet');

class Part3Map {
  constructor(utils) {
    /* means 1-1000: 5px, 1000-3000: 9px... */
    this.constrain = [
      [1, 2], [1000, 5], [3000, 9], [20000, 12], [50000, 14], [100000, 16], [250000, 18], [400000, 20],
      [500000, 22], [1000000, 24], [5000000, 26], [10000000, 28], [15000000, 30]];
    this.utils = utils;
    this.createMap();
    this.setLegend();
    this.setHint();
  }

  setDataByCountry(countryName) {
    this.moveViewTo(this.getCountryCoordinates(countryName));
  }

  setDataByCase() {
    this.removeAllMarkers();
    this.makeMarker();
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
    this.markers = [];
    this.polygonDevelopmentKitMarkersArray = [];
    this.setAllCases();
    this.setSelectOfCasesTypes();
  }

  /**
  * Realization (@private)
  */

  makeMap() {
    const MAP_OPTIONS = {
      center: [0, 57],
      zoom: 2,
    };
    // eslint-disable-next-line new-cap
    this.map = new L.map('map', MAP_OPTIONS);
  }

  makeLayer() {
    const LAYER = new L.TileLayer('https://{s}.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}.png');
    this.map.addLayer(LAYER);
  }

  setAllCases() {
    if (!this.utils.getForGlobalCasesPartLoaded()) {
      this.utils.getDataForGlobalCasesPart().then((result) => {
        this.utils.forGlobalCasesPart = result;
        this.setAllCasesExecute(result);
      });
      return false;
    }
    this.setAllCasesExecute(this.utils.getForGlobalCasesPartLoaded());
    return true;
  }

  setAllCasesExecute(result) {
    const DATE = new Date();
    document.querySelector('.all-cases').innerHTML = `${result.cases}
    <p style="color:#aaa; text-align: center; font-size: 14px">Last Updated: ${DATE.getDate()} ${DATE.getMonth()} ${DATE.getFullYear()}</p>`;
  }

  setMarkerCertainCountry(certainCountryName) {
    if (!this.utils.getCountryDataLoaded(certainCountryName)) {
      this.utils.getCountryData(certainCountryName).then((result) => {
        this.utils.countryData[certainCountryName] = result;
        this.setMarkerCertainCountryExecute(result);
      });
      return false;
    }
    this.setMarkerCertainCountryExecute(this.utils.getCountryDataLoaded(certainCountryName));
    return true;
  }

  setMarkerCertainCountryExecute(result) {
    const LAST_DAY_CANADIAN_DATA = this.getLastDayCertainCountryData(result);
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
        marker.addTo(this.map);
      }
      return false;
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
    const CONSTRAIN = this.constrain;
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
    if (!this.utils.getGlobalLoaded()) {
      this.utils.getGlobal().then((result) => {
        this.utils.global = result;
        this.makeMarkerExecute(result);
      });
      return false;
    }
    this.makeMarkerExecute(this.utils.getGlobalLoaded());
    return true;
  }

  makeMarkerExecute(result) {
    let countryData = [];
    Object.keys(DATA).some((countrySlug) => {
      if (DATA[countrySlug].Lon && DATA[countrySlug].ISO2) {
        countryData = this.getCountryData(result, DATA[countrySlug].ISO2);
        const myIcon = L.icon({
          iconUrl: './assets/images/ok.png',
          iconSize: this.getMarkerSize(countryData),
        });
        const markerOptions = {
          title: `${countryData.country} Cases: ${countryData.cases}`,
          clickable: true,
          icon: myIcon,
        };
        const marker = L.marker([DATA[countrySlug].Lat, DATA[countrySlug].Lon], markerOptions);
        this.markers.push(marker);
        marker.bindPopup(`${countryData.country} Deaths: ${countryData.deaths}; Cases: ${countryData.cases}`).openPopup();
        marker.addTo(this.map);
      }
      return false;
    });
  }

  getCountryData(array, countrySlug) {
    let data = {};
    if (!array) {
      return false;
    }
    array.some((innerObject) => {
      if (innerObject.countryInfo.iso2 === countrySlug) {
        data = innerObject;
        return true;
      }
      return false;
    });
    return data;
  }

  getMarkerSize(countryData) {
    if (!this.getMountByType(countryData)) {
      return [2, 2];
    }
    const CONSTRAIN = this.constrain;
    const DEFAULT_SIZE = 27;
    let markerSize;
    CONSTRAIN.some((constrainElement) => {
      if (constrainElement[0] >= this.getMountByType(countryData)) {
        markerSize = [constrainElement[1], constrainElement[1]];
        return true;
      }
      return false;
    });
    return (markerSize) || [DEFAULT_SIZE, DEFAULT_SIZE];
  }

  getMountByType(object) {
    switch (this.utils.typeOfCase) {
      case 'casesAll':
        return object.cases;
      case 'deathsAll':
        return object.deaths;
      case 'recoveredAll':
        return object.recovered;

      case 'casesDay':
        return object.todayCases;
      case 'deathsDay':
        return object.todayDeaths;
      case 'recoveredDay':
        return object.todayRecovered;

      case 'casesDay100':
        return (object.todayCases / object.population) * 100000;
      case 'deathsDay100':
        return (object.todayDeaths / object.population) * 100000;
      case 'recoveredDay100':
        return (object.todayRecovered / object.population) * 100000;

      case 'casesAll100':
        return (object.cases / object.population) * 100000;
      case 'deathsAll100':
        return (object.deaths / object.population) * 100000;
      case 'recoveredAll100':
        return (object.recovered / object.population) * 100000;
      default:
        return false;
    }
  }

  setCountryLayer() {
    if (!this.utils.getGlobalLoaded()) {
      this.utils.getGlobal().then((result) => {
        this.utils.global = result;
        this.setCountryLayerExecute(this.getCountryGeoJsonDataExecute(result));
      });
      return false;
    }
    this.setCountryLayerExecute(this.getCountryGeoJsonDataExecute(this.utils.getGlobalLoaded()));
    return true;
  }

  getCountryGeoJsonDataExecute(countriesData) {
    let polygon;
    const GEO_JSON_POLYGONS = {
      type: "FeatureCollection",
      features: [],
    };
    let countryNameAndTypeData;
    Object.keys(DATA).some((countrySlug) => {
      if (DATA[countrySlug].data.length) {
        countryNameAndTypeData = this.getCountryDataByName(countriesData, DATA[countrySlug].ISO2);
        polygon = {
          type: "Feature",
          properties: {
            popupContent: countrySlug,
            popupISO: DATA[countrySlug].ISO2,
            popupFlag: countryNameAndTypeData[12],

            casesAll: countryNameAndTypeData[8],
            deathsAll: countryNameAndTypeData[0],
            recoveredAll: countryNameAndTypeData[4],

            casesDay: countryNameAndTypeData[10],
            deathsDay: countryNameAndTypeData[2],
            recoveredDay: countryNameAndTypeData[6],

            casesDay100: countryNameAndTypeData[11],
            deathsDay100: countryNameAndTypeData[3],
            recoveredDay100: countryNameAndTypeData[7],

            casesAll100: countryNameAndTypeData[9],
            deathsAll100: countryNameAndTypeData[1],
            recoveredAll100: countryNameAndTypeData[5],
          },
          geometry: {
            type: "MultiPolygon",
            coordinates: DATA[countrySlug].data,
          },
        };
        GEO_JSON_POLYGONS.features.push(polygon);
      }
      return false;
    });
    return GEO_JSON_POLYGONS;
  }

  getCountryDataByName(countriesData, iso2Name) {
    const countryNameTypeData = [];
    countriesData.some((countryObject) => {
      if (countryObject.countryInfo.iso2 === iso2Name) {
        countryNameTypeData[0] = countryObject.deaths;
        countryNameTypeData[1] = (countryObject.deaths / countryObject.population) * 100000;
        countryNameTypeData[2] = countryObject.todayDeaths;
        countryNameTypeData[3] = (countryObject.todayDeaths / countryObject.population) * 100000;
        countryNameTypeData[4] = countryObject.recovered;
        countryNameTypeData[5] = (countryObject.recovered / countryObject.population) * 100000;
        countryNameTypeData[6] = countryObject.todayRecovered;
        countryNameTypeData[7] = (countryObject.todayRecovered / countryObject.population) * 100000;
        countryNameTypeData[8] = countryObject.cases;
        countryNameTypeData[9] = (countryObject.cases / countryObject.population) * 100000;
        countryNameTypeData[10] = countryObject.todayCases;
        countryNameTypeData[11] = (countryObject.todayCases / countryObject.population) * 100000;
        countryNameTypeData[12] = countryObject.countryInfo.flag;
        return true;
      }
      return false;
    });
    return countryNameTypeData;
  }

  setCountryLayerExecute(geoJsonData) {
    const style = {
      default: {
        opacity: 0,
        fillOpacity: 0,
      },
      highlight: {
        opacity: 0.3,
        fillOpacity: 0.2,
      },
    };
    const CONTEXT = this;
    // eslint-disable-next-line new-cap
    const gpsMarker = new L.geoJson(geoJsonData, {
      onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
          layer.on('click', () => {
            CONTEXT.utils.setEventOfChangeCountry(feature.properties.popupISO);
          });
          layer.on('mouseover', () => {
            document.querySelector('.country-name-hint').innerText = `Country: ${CONTEXT.capitalizeFirstLetter(feature.properties.popupContent)}`;
            document.querySelector('.country-data').innerText = `Cases: ${feature.properties[CONTEXT.utils.typeOfCase]}`;
            layer.setStyle(style.highlight);
          });
          layer.on('mouseout', () => {
            document.querySelector('.country-name-hint').innerText = '';
            document.querySelector('.country-data').innerText = '';
            layer.setStyle(style.default);
          });
        }
      },
      color: 'red',
      weight: 1,
      opacity: 0,
      fillOpacity: 0,
      fillColor: "red",
    });
    gpsMarker.addTo(this.map);
  }

  getCountryCoordinates(iso2) {
    const latLon = [];
    Object.keys(DATA).some((country) => {
      if (DATA[country].ISO2 === iso2) {
        latLon[0] = DATA[country].Lat;
        latLon[1] = DATA[country].Lon;
      }
      return false;
    });
    return latLon;
  }

  capitalizeFirstLetter(string) {
    const stringArray = string.split('-');
    if (stringArray.length > 0) {
      stringArray.some((partName, index) => {
        stringArray[index] = partName.charAt(0).toUpperCase() + partName.slice(1);
        return false;
      });
      return stringArray.join(' ');
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  removeAllMarkers() {
    this.markers.some((marker) => {
      this.map.removeLayer(marker);
      return false;
    });
    this.markers = [];
  }

  moveViewTo(coordinates) {
    this.map.setView(new L.LatLng(...coordinates), 4, { animation: true });
  }

  polygonDevelopmentKit() {
    this.map.on("click", (e) => {
      const myIcon = L.icon({
        iconUrl: './assets/images/ok.png',
        iconSize: [6, 6],
      });
      const markerOptions = {
        title: ``,
        clickable: true,
        icon: myIcon,
      };
      this.polygonDevelopmentKitMarkersArray.push([e.latlng.lng, e.latlng.lat]);
      const marker = L.marker([e.latlng.lat, e.latlng.lng], markerOptions);
      marker.bindPopup(`${JSON.stringify(this.polygonDevelopmentKitMarkersArray)}`).openPopup();
      marker.addTo(this.map);
    });
  }

  setLegend() {
    const legend = L.control({ position: 'topright' });
    legend.onAdd = () => {
      const DIV = L.DomUtil.create('div', 'info legend');
      const LABELS = ['<strong class="legend-name">Legend</strong>'];
      const categories = this.constrain;
      let dimension;
      for (let i = categories.length - 1; i >= 0; i--) {
        dimension = i === 0 ? categories[i][1] : categories[i][1];
        DIV.innerHTML += LABELS.push(`<div><div class="legend-mark">
        <img src="./assets/images/ok.png" class="circle" style="width:${dimension}px;height:${dimension}px;}"></div>
        <div class="legend-mark-value"> ${i === 0 ? 0 : categories[i - 1][0]}-${categories[i][0]}</div></div>`);
      }
      DIV.innerHTML = LABELS.join('');
      return DIV;
    };
    legend.addTo(this.map);
  }

  setSelectOfCasesTypes() {
    const legend = L.control({ position: 'topright' });
    legend.onAdd = () => {
      const DIV = L.DomUtil.create('div', 'info type-of-cases');
      DIV.innerHTML += `<strong class="legend-name">Type of Case:</strong>
      <p><select data-case="cases">
      <option disabled>Pick a Case:</option>
      
      <option selected value="casesAll">Cumulative Confirmed</option>
      <option value="deathsAll">Cumulative Deaths</option>
      <option value="recoveredAll">Cumulative Recovered</option>

      <option value="casesDay">Confirmed For The Last Day</option>
      <option value="deathsDay">Deaths For The Last Day</option>
      <option value="recoveredDay">Recovered For The Last Day</option>

      <option value="casesDay100">Confirmed per 100k For The Last Day</option>
      <option value="deathsDay100">Deaths per 100k For The Last Day</option>
      <option value="recoveredDay100">Recovered per 100k For The Last Day</option>

      <option value="casesAll100">Cumulative Confirmed per 100k</option>
      <option value="deathsAll100">Cumulative Deaths per 100k</option>
      <option value="recoveredAll100">Cumulative Recovered per 100k</option>
    </select></p>`;
      return DIV;
    };
    legend.addTo(this.map);
  }

  setHint() {
    const legend = L.control({ position: 'topleft' });
    legend.onAdd = () => {
      const DIV = L.DomUtil.create('div', 'info country-hint');
      const HTML = `<div class="country-name-hint" style="color:#aaa;"></div>
                  <div class="country-data" style="color:#aaa;"></div>`;
      DIV.innerHTML = HTML;
      return DIV;
    };
    legend.addTo(this.map);
  }
}

export default Part3Map;

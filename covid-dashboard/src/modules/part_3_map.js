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
    // this.getGlobal(this.createWorldDiagramNew());
  }

  // getGlobal(fn, context) {
  //   if (!this.utils.getGlobalLoaded()) {
  //     this.utils.getGlobal().then((result) => {
  //       this.utils.global = result;
  //       context.fn(result);
  //     });
  //     return false;
  //   }
  //   this.createWorldDiagramNew(this.utils.getGlobalLoaded());
  //   return true;
  // }

  // createWorldDiagramNew(globalResult) {
  //   if (!this.utils.getDailyWorldDataLoaded()) {
  //     this.utils.getDailyWorldData().then((dailyWorldData) => {
  //       this.utils.dailyWorldData = dailyWorldData;
  //       this.FUNCTION_THAT_YOU_NEED(globalResult, dailyWorldData);
  //     });
  //     return false;
  //   }
  //   this.FUNCTION_THAT_YOU_NEED(globalResult, this.utils.getDailyWorldDataLoaded());
  //   return true;
  // }

  // FUNCTION_THAT_YOU_NEED(globalResult, dailyWorldDataResult) {
  //   console.log(globalResult);
  //   console.log(dailyWorldDataResult);
  // }

  setDataByCountry(countryName) {
    this.moveViewTo(this.getCountryCoordinates(countryName));
    // console.log(`${countryName} ${this.getCountryCoordinates(countryName)}`);
  }

  setDataByCase(caseName) {
    this.removeAllMarkers();
    this.makeMarker();
    console.log(`part3 case: ${caseName}`);
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
    // this.polygonDevelopmentKit();
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
    document.querySelector('.all-cases').innerHTML = `${result.cases}
    <p style="color:#aaa; text-align: center; font-size: 14px">today</p>`;
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

  /**
   * Creating a marker:
   * also has iconAnchor: [22, 94], popupAnchor: [-3, -76], shadowUrl: 'ok.png', shadowSize: [68, 95], shadowAnchor: [22, 94]
   */
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
    // let countriesData = [];
    let countryData = [];
    // document.querySelector('.all-cases').innerHTML = `${result.Global.TotalConfirmed}
    // <p style="color:#aaa; text-align: center; font-size: 14px">api.covid19.com: on ${result.Date}</p>`;
    // countriesData = result.Countries;
    Object.keys(DATA).some((countrySlug) => {
      // switch (countrySlug) {
      //   case "france":
      //     this.setMarkerCertainCountry('fr');
      //     break;
      //   case "canada":
      //     this.setMarkerCertainCountry('ca');
      //     break;
      //   case "australia":
      //     this.setMarkerCertainCountry('au');
      //     break;
      //   case "china":
      //     this.setMarkerCertainCountry('cn');
      //     break;
      //   default:
      // }
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
        countryNameTypeData[0] = countryObject.deaths; // 'deathsAll';
        countryNameTypeData[1] = (countryObject.deaths / countryObject.population) * 100000; // 'deathsAll100';
        countryNameTypeData[2] = countryObject.todayDeaths; // 'deathsDay';
        countryNameTypeData[3] = (countryObject.todayDeaths / countryObject.population) * 100000; // 'deathsDay100';
        countryNameTypeData[4] = countryObject.recovered; // 'recoveredAll';
        countryNameTypeData[5] = (countryObject.recovered / countryObject.population) * 100000; // 'recoveredAll100';
        countryNameTypeData[6] = countryObject.todayRecovered; // 'recoveredDay';
        countryNameTypeData[7] = (countryObject.todayRecovered / countryObject.population) * 100000; // 'recoveredDay100';
        countryNameTypeData[8] = countryObject.cases; // casesAll
        countryNameTypeData[9] = (countryObject.cases / countryObject.population) * 100000; // 'casesAll100';
        countryNameTypeData[10] = countryObject.todayCases; // 'casesDay';
        countryNameTypeData[11] = (countryObject.todayCases / countryObject.population) * 100000; // 'casesDay100';
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
    // eslint-disable-next-line new-cap
    // console.log(GEO_JSON_COUNTRY_LAYERS_DATA);
    // console.log(this.getCountryGeoJsonData());
    const CONTEXT = this;
    console.log(geoJsonData);
    // eslint-disable-next-line new-cap
    const gpsMarker = new L.geoJson(geoJsonData, {
      onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent, { closeButton: true, offset: L.point(0, 0) });
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

        <option selected value="casesAll">casesAll</option>
        <option value="deathsAll">deathsAll</option>
        <option value="recoveredAll">recoveredAll</option>

        <option value="casesDay">casesDay</option>
        <option value="deathsDay">deathsDay</option>
        <option value="recoveredDay">recoveredDay</option>

        <option value="casesDay100">casesDay100</option>
        <option value="deathsDay100">deathsDay100</option>
        <option value="recoveredDay100">recoveredDay100</option>

        <option value="casesAll100">casesAll100</option>
        <option value="deathsAll100">deathsAll100</option>
        <option value="recoveredAll100">recoveredAll100</option>
      </select></p>`;
      return DIV;
    };
    legend.addTo(this.map);
  }

  setHint() {
    const legend = L.control({ position: 'topleft' });
    legend.onAdd = () => {
      const DIV = L.DomUtil.create('div', 'info country-hint');
      const HTML = `<div class="country-name-hint" style="color:#aaa;">Country: Belarus</div>
                  <div class="country-data" style="color:#aaa;">Cases: 1234</div>`;
      DIV.innerHTML = HTML;
      return DIV;
    };
    legend.addTo(this.map);
  }
}

export default Part3Map;

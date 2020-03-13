
import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { GeolocatedProps, geolocated } from 'react-geolocated';
export const GoogleMapsApiKey = 'AIzaSyDCmyHYLT_dFcUvglVGT5BINiLFXwT0GGA';

import Marker from './components/Marker';
import MapRows from './components/MapRows';
import ContactRow from './components/ContactRow';
import MapBox from '../../partials/MapBox';
import MapStyles from './components/MapStyles';
import getUniqMapControls from '../../helpers/getUniqMapControls';
import { number } from 'prop-types';

export interface MapProps {
  mapItems: LooseObject;
  thirdFilter?: boolean;
  addFilterText?: string;
  type: string;
}

export interface MapState {
  countrySelectedValue: string;
  citySelectedValue: string;
  serviceSelectedValue: string;
  addFilterSelectedValue: string;
  mapCenter: {
    lat: number,
    lng: number
  };
  mapZoom: number;
  cities: Array<string>;
  countries: Array<string>;
  addFilters: Array<string>;
  currrentEmail: string;
  currentPhone: string;
  currentAddress: string;
  currentTitle: string;
  currentCountry: string;
  currentCity: string;
  currentService: string;
  showBox: boolean;
  lat: number;
  lng: number;
  web: LooseObject;
  text: string;
  storeChief: string;
  name: string;
  position: string;
}

class Map extends React.Component<MapProps & GeolocatedProps, MapState> {
  constructor(props: MapProps) {
    super(props);

    this.state = {
      countrySelectedValue: 'all',
      citySelectedValue: 'all',
      serviceSelectedValue: 'all',
      addFilterSelectedValue: 'all',
      mapCenter: {
        lat: 50,
        lng: 14
      },
      mapZoom: 5,
      cities: [],
      countries: [],
      addFilters: [],
      currrentEmail: '',
      currentPhone: '',
      currentTitle: '',
      currentAddress: '',
      currentCountry: '',
      currentCity: '',
      currentService: '',
      showBox: false,
      lat: 0,
      lng: 0,
      web: null,
      text: '',
      storeChief: '',
      name: '',
      position: ''
    };
  }
  readLatLng(item: LooseObject) {
    return {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lng)
    };
  }
  
  setMapBox(item: LooseObject) {
    this.setState({
      lat: item.lat,
      lng: item.lng,
      currrentEmail: item.email,
      currentPhone: item.phone,
      currentTitle: item.title,
      currentAddress: item.address,
      currentCountry: item.country,
      currentCity: item.city,
      currentService: item.service,
      web: item.web,
      storeChief: item.storeChief,
      text: item.text,
      name: item.name,
      position: item.position,
      showBox: item ? true : !this.state.showBox,
      mapZoom: 14,
      mapCenter: this.readLatLng(item)
    });
  }

  renderServiceRows(mapItems: LooseObject) {
    const { countries } = getUniqMapControls(mapItems);
    let resultRows = [];

    for (let i = 0; i < countries.length; i++) {
      let composedRows = [];

      for (let j = 0; j < mapItems.length; j++) {
        if (mapItems[j].country === countries[i]) {
          if (mapItems[j].country === this.state.countrySelectedValue || this.state.countrySelectedValue === 'all') {
            if (mapItems[j].city === this.state.citySelectedValue || this.state.citySelectedValue === 'all') {
              if (mapItems[j].addFilter && mapItems[j].addFilter.includes(this.state.addFilterSelectedValue)
              || mapItems[j].addFilter === this.state.addFilterSelectedValue
              || this.state.addFilterSelectedValue === 'all') {
                composedRows.push(
                  {
                    city: mapItems[j].city,
                    service: mapItems[j].service,
                    country: mapItems[j].country,
                    title: mapItems[j].title,
                    text: mapItems[j].text,
                    address: mapItems[j].address,
                    storeChief: mapItems[j].storeChief,
                    email: mapItems[j].email,
                    phone: mapItems[j].phone,
                    web: mapItems[j].web,
                    addFilter: mapItems[j].addFilter
                  }
                );
              }
            }
          }
        }
      }

      if (this.state.countrySelectedValue === countries[i] || this.state.countrySelectedValue === 'all') {
        if (composedRows.some(item => item.addFilter && item.addFilter.includes(this.state.addFilterSelectedValue))
        || mapItems.addFilter === this.state.addFilterSelectedValue
        || this.state.addFilterSelectedValue === 'all') {
          resultRows.push(
            <MapRows key={i} title={countries[i]} items={composedRows.reverse()} />
          );
        }
      }
    }

    return resultRows;
  }

  renderContactRows(mapItems: LooseObject) {
    const { services } = getUniqMapControls(mapItems);
    let resultRows = [];

    for (let i = 0; i < services.length; i++) {
      let composedRows = [];

      for (let j = 0; j < mapItems.length; j++) {
        if (mapItems[j].service === services[i]) {
          if (mapItems[j].service === this.state.serviceSelectedValue || this.state.serviceSelectedValue === 'all') {
            composedRows.push(
              {
                name: mapItems[j].name,
                position: mapItems[j].position,
                email: mapItems[j].email,
                phone: mapItems[j].phone,
                web: mapItems[j].web
              }
            );
          }
        }
      }

      if (this.state.serviceSelectedValue === services[i] || this.state.serviceSelectedValue === 'all') {
        resultRows.push(
          <ContactRow key={i} title={services[i]} rows={composedRows} />
        );
      }
    }

    return resultRows;
  }

  resetFilters = () => {
    this.setState({
      countrySelectedValue: 'all',
      citySelectedValue: 'all',
      serviceSelectedValue: 'all',
      addFilterSelectedValue: 'all',
      showBox: false
    });
  }

  defineLocation(loc: string, type: string, mapItems: LooseObject) {
    for (let i = 0; i < mapItems.length; i++) {
      if (mapItems[i][type] === loc) {
        switch (type) {
          case 'country':
            this.setState({
              citySelectedValue: 'all',
              countrySelectedValue: mapItems[i].country,
              mapZoom: 6
            });
            break;
          case 'city':
            this.setState({
              countrySelectedValue: mapItems[i].country,
              mapZoom: 11
            });
            break;
          case 'service':
            this.setState({
              countrySelectedValue: mapItems[i].country,
              citySelectedValue: mapItems[i].city,
              mapZoom: 15
            });
            break;

          default: break;
        }
        if (mapItems[i].lat > 85) {
          let countryMapItems = mapItems.filter(item => item.country === mapItems[i].country && item.lat < 85);
          if (countryMapItems.length === 0) {
            return this.state.mapCenter;
          }
          return {
            lat: parseFloat(countryMapItems[0].lat),
            lng: parseFloat(countryMapItems[0].lng)
          };
        }
        return {
          lat: parseFloat(mapItems[i].lat),
          lng: parseFloat(mapItems[i].lng)
        };
      }
    }
  }

  filterCities(country: string, mapItems: LooseObject) {
    let filteredCities = [];
    mapItems.forEach(item => {
      // tslint:disable-next-line: no-unused-expression
      item && item.country && item.city && item.country === country ? filteredCities.push(item.city) : '';
    });
    return filteredCities;
  }

  filterCountries(addFilter: string, mapItems: LooseObject) {
    let filteredCountries = [];
    mapItems.forEach(item => {
      item && item.addFilter && item.country && item.addFilter.includes(addFilter) 
      ? filteredCountries.push(item.country) 
      // tslint:disable-next-line: no-unused-expression
      : '';
    });
    const uniqFilteredCountries = Array.from(new Set(filteredCountries));
    return uniqFilteredCountries;
  }

  filterAddFilter(country: string, mapItems: LooseObject, addFilter: LooseObject) {
    let filteredAddFilter = [];
    mapItems.forEach(item => {
      item && item.country && item.addFilter && item.country.trim() === country.trim() 
      ? addFilter.map(i => item.addFilter.includes(i) ? filteredAddFilter.push(i) : null)
      // tslint:disable-next-line: no-unused-expression
      : '';
    });
    const uniqFilteredAddFilter = Array.from(new Set(filteredAddFilter));
    return uniqFilteredAddFilter;
  }

  onSelectChange(event: React.FormEvent<HTMLSelectElement>, mapItems: LooseObject, type?: string) {
    var safeSearchTypeValue: string = event.currentTarget.value;

    switch (type) {
      case 'country':
        this.setState({
          showBox: false,
          countrySelectedValue: safeSearchTypeValue,
          mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
        });
        break;
      case 'city':
        this.setState({
          showBox: false,
          citySelectedValue: safeSearchTypeValue,
          mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
        });
        break;
      case 'service':
        this.setState({
          showBox: true,
          serviceSelectedValue: safeSearchTypeValue,
          mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
        });
        break;
      case 'addFilter':
        this.setState({
          showBox: false,
          addFilterSelectedValue: safeSearchTypeValue,
          // mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
        });
        break;

      default: return;
    }
  }

  renderControls(mapItems: LooseObject) {
    const {
      countries,
      addFilters
    } = getUniqMapControls(mapItems);

    const cities = this.filterCities(this.state.countrySelectedValue, mapItems).sort();

    const filteredCountries = this.filterCountries(this.state.addFilterSelectedValue, mapItems).sort();

    const filteredAddFilter = this.filterAddFilter(this.state.countrySelectedValue, mapItems, addFilters).sort();

    return (
      <div className={'mapControls'}>
        <div className={'container'}>
          <div className="row justify-content-center">
            {this.props.thirdFilter && <div className="col-12 col-md-3">
              <div className={'select'}>
                <select
                  onChange={e => this.onSelectChange(e, mapItems, 'addFilter')}
                  value={this.state.addFilterSelectedValue}
                >
                  {this.state.addFilterSelectedValue === 'all' &&
                    <option key="addFilterSelectedValue">
                      {this.props.addFilterText}
                    </option>}

                  {this.state.countrySelectedValue === 'all'
                  ? addFilters && addFilters.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))
                  : addFilters && this.orderByAlphabet(filteredAddFilter).map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))
                  }
                </select>
              </div>
            </div>}
            <div className="col-12 col-md-4 col-lg-3">
              <div className={'select'}>
                <select
                  value={this.state.countrySelectedValue}
                  onChange={e => {this.onSelectChange(e, mapItems, 'country'); }}
                >
                  {this.state.countrySelectedValue === 'all' &&
                    <option key="countrySelectedValue">
                      Select country
                    </option>}
                  
                  {this.state.addFilterSelectedValue === 'all'
                  ? countries && this.orderByAlphabet(countries).map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))
                  : filteredCountries && this.orderByAlphabet(filteredCountries).map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            { this.state.countrySelectedValue !== 'all' &&
              <div className="col-12 col-md-4 col-lg-3">
                <div className={'select'}>
                  <select
                    onChange={e => this.onSelectChange(e, mapItems, 'city')}
                    value={this.state.citySelectedValue}
                  >
                    {this.state.citySelectedValue === 'all' &&
                      <option key="citySelectedValue">
                        Select city
                      </option>}

                    {cities && cities.map((item, i) => (
                      // item.children === this.state.countrySelectedValue
                      <option key={i} value={item}>{item}</option>
                    ))}
                    {/* {cities && this.orderByAlphabet(cities).map((item, i) => (
                      <option key={i} value={item}>{item}</option>
                    ))} */}
                  </select>
                </div>
              </div>
            }

            <div className="col-12 col-md-4 col-lg-3">
              <button className={'btn'} onClick={() => this.resetFilters()}>reset filters</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  orderByAlphabet(item: LooseObject) {
    item.sort();
    return item;
  }

  render() {
    const { mapItems, type } = this.props;

    // FOR TESTS
    // for (let i = 0; i < mapItems.length; i++) {
    //   mapItems[i].service = mapItems[i].association;
    // }
    return (
      <>
        {this.renderControls(mapItems)}

        <section className={'map'}>
          {this.state.showBox &&
            <MapBox
              web={this.state.web}
              text={this.state.text}
              city={this.state.currentCity}
              service={this.state.currentService}
              storeChief={this.state.storeChief}
              email={this.state.currrentEmail}
              phone={this.state.currentPhone}
              title={this.state.currentTitle}
              address={this.state.currentAddress}
              country={this.state.currentCountry}
              name={this.state.name}
              position={this.state.position}
              onClick={() => this.setState({ showBox: !this.state.showBox })}
            />
          }

          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals={true}
            bootstrapURLKeys={{ key: GoogleMapsApiKey }}
            defaultCenter={{ lat: 50, lng: 14 }}
            center={this.state.mapCenter}
            defaultZoom={5}
            zoom={this.state.mapZoom}
            options={{
              scrollwheel: false,
              styles: MapStyles
            }}
          >
            {mapItems && mapItems
              .filter(item => Math.abs(item.lng) && Math.abs(item.lat)
                && (item.country === this.state.countrySelectedValue || this.state.countrySelectedValue === 'all')
                && (item.city === this.state.citySelectedValue || this.state.citySelectedValue === 'all')
                && (item.addFilter === this.state.addFilterSelectedValue
                  || item.addFilter && item.addFilter.includes(this.state.addFilterSelectedValue) 
                  || this.state.addFilterSelectedValue === 'all'
                  )
                )
              .map((item, i) => {
              return (
                <Marker
                  key={i}
                  lat={parseFloat(item.lat)}
                  lng={parseFloat(item.lng)}
                  onClick={() => this.setMapBox(item)}
                />
              );
            })}
          </GoogleMapReact>
        </section>
        <div className={'mapRows'}>
          {type === 'service' ? this.renderServiceRows(mapItems) : this.renderContactRows(mapItems)}
        </div>
      </>
    );
  }
}

export default geolocated()(Map);

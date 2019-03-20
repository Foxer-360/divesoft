import React, { ChangeEvent } from 'react';
import GoogleMapReact from 'google-map-react';
import { GeolocatedProps, geolocated } from 'react-geolocated';
export const GoogleMapsApiKey = 'AIzaSyCSpatDLsxXguzdvuwbTrK3TulOh10MULI';

import List from '../List';
import Marker from './components/Marker';
import MapStyles from './components/MapStyles';
import ContactRow from './components/ContactRow';

interface MapItem {
  city: string;
  association: string;
  lat: number;
  lng: number;
  name: string;
  country: string;
  position: string;
  email: string;
  phone: string;
  web: LooseObject;
}

export interface ContactsMapProps {
  data: {
    title: string;
    mapItems: MapItem[];
  };
}

export interface ContactsMapState {
  countrySelectedValue: string;
  citySelectedValue: string;
  associationSelectedValue: string;
  mapCenter: { 
    lat: number,
    lng: number
  };
}

class ContactsMap extends React.Component<ContactsMapProps & GeolocatedProps, ContactsMapState> {
  constructor(props: ContactsMapProps) {
    super(props);

    this.state = {
      countrySelectedValue: 'select country',
      citySelectedValue: 'select city',
      associationSelectedValue: 'select association',
      mapCenter: { lat: 50, lng: 14 }
    };
  }

  defineLocation(loc: string, type: string) {
    const { mapItems } = this.props.data;

    for (let i = 0; i < mapItems.length; i++) {
      if (mapItems[i][type] === loc) {
        return {
          lat: mapItems[i].lat,
          lng: mapItems[i].lng
        };
      }
    }

  }
  
  onSelectChange(event: React.FormEvent<HTMLSelectElement>, type?: string) {
    var safeSearchTypeValue: string = event.currentTarget.value;

    switch (type) {
      case 'country':
        this.setState({ countrySelectedValue: safeSearchTypeValue });
        this.setState({ mapCenter: this.defineLocation(safeSearchTypeValue, type) });
        break;
      case 'city':
        this.setState({ citySelectedValue: safeSearchTypeValue });
        this.setState({ mapCenter: this.defineLocation(safeSearchTypeValue, type) });
        break;
      case 'association':
        this.setState({ associationSelectedValue: safeSearchTypeValue });
        this.setState({ mapCenter: this.defineLocation(safeSearchTypeValue, type) });
        break;

      default: return;
    }
  }

  // changeCenter(e: React.MouseEvent<HTMLElement>) {
  //   console.log(e);
  //   return this.setState({ mapCenter: { lat: 35, lng: 35 } });
  // }

  renderControls() {
    let cities = [];
    let countries = [];
    let associations = [];

    const propsToArray = () => {
      for (let i = 0; i < this.props.data.mapItems.length; i++) {
        countries.push(this.props.data.mapItems[i].country);
      }
      for (let i = 0; i < this.props.data.mapItems.length; i++) {
        cities.push(this.props.data.mapItems[i].city);
      }
      for (let i = 0; i < this.props.data.mapItems.length; i++) {
        associations.push(this.props.data.mapItems[i].association);
      }
    };

    const uniqueArray = arr => Array.from(new Set(arr));
    
    propsToArray();
    cities = uniqueArray(cities);
    countries = uniqueArray(countries);
    associations = uniqueArray(associations);

    return (
      <div className={'map__controls'}>
        <div className={'container'}>
          <div className="row">
            <div className="col-12 col-md-4">
              <div className={'select'}>
                <select 
                  onChange={e => this.onSelectChange(e, 'country')} 
                  value={this.state.countrySelectedValue}
                >
                  {countries && countries.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={'select'}>
                <select 
                  onChange={e => this.onSelectChange(e, 'city')} 
                  value={this.state.citySelectedValue}
                >
                  {cities && cities.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={'select'}>
                <select 
                  onChange={e => this.onSelectChange(e, 'association')} 
                  value={this.state.associationSelectedValue}
                >
                  {associations && associations.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public render() {
    const { title, mapItems } = this.props.data;

    return (
      <List data={mapItems}>
        {({ data }) => (
          <>
            <div style={{ width: '100%', position: 'relative' }}>
              {title ? <h2 style={{ paddingBottom: '30px', textAlign: 'center' }}>{title}</h2> : ''}
              
              <section className={'map'}>
                {this.renderControls()}
                
                {mapItems && (
                  <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals={true}  
                    bootstrapURLKeys={{ key: GoogleMapsApiKey }}
                    defaultCenter={{ lat: 50, lng: 14 }}
                    center={this.state.mapCenter}
                    defaultZoom={6}
                    options={{ 
                      scrollwheel: false,
                      styles: MapStyles
                    }}
                  >
                    {data && data.map((item, i) => (
                      <Marker
                        key={i}
                        lat={item.lat}
                        lng={item.lng}
                      />
                    ))}
                  </GoogleMapReact>
                )}
              </section>
            </div>

            {data && data.map((item, i) => 
              <ContactRow key={i} title={'1'} rows={[]} />)}
          </>
        )}
      </List>
    );
  }
}

export default geolocated()(ContactsMap);
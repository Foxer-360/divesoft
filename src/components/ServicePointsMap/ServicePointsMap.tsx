import * as React from 'react';

import Map from '../Map';
import List from '../List';

interface MapItem {
  city: string;
  service: string;
  lat: string;
  lng: string;
  title: string;
  country: string;
  text?: string;
  address?: string;
  storeChief?: string;
  email?: string;
  phone?: string;
  web?: LooseObject;
}

export interface ServicePointsMapProps {
  data: {
    title: string;
    filterByAddress: boolean;
    additionalFilterText: string;
    mapItems: MapItem[];
  };
}

export default function ServicePointsMap(props: ServicePointsMapProps) {
  const { title, filterByAddress, additionalFilterText, mapItems } = props.data;

  return (
    <List data={mapItems}>
      {({ data }) => (
        <div className={'servicePointsMapWrapper'}>
        {title ?
          <div className="container">
            <p className={'textDescription servicePointsMapWrapper__title'}>
              {title}
            </p>
          </div> : ''}

        <Map 
          mapItems={data} 
          filterByAddress={filterByAddress} 
          additionalFilterText={additionalFilterText} 
          type={'service'}
        />
      </div>
      )}
    </List>
  );
}
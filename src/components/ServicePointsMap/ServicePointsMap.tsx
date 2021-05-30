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
  addFilter?: string;
  slugComponents?: string;
  detailsLink?: boolean;
}

export interface ServicePointsMapProps {
  data: {
    title: string;
    thirdFilter: boolean;
    addFilterText: string;
    mapItems: MapItem[];
  };
}

export default function ServicePointsMap(props: ServicePointsMapProps) {
  const { title, thirdFilter, addFilterText, mapItems } = props.data;
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
          thirdFilter={thirdFilter} 
          addFilterText={addFilterText} 
          type={'service'}
        />
      </div>
      )}
    </List>
  );
}
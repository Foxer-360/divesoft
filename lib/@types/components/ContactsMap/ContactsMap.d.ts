import React from 'react';
export declare const GoogleMapsApiKey = "AIzaSyCSpatDLsxXguzdvuwbTrK3TulOh10MULI";
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
}
declare const _default: React.ComponentClass<ContactsMapProps & import("react-geolocated").ExternalProps, any>;
export default _default;

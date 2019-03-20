import React from 'react';
export interface ContactRowState {
    showMore: boolean;
}
interface Contact {
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
interface ContactRowProps {
    title: string;
    rows: Contact[];
}
declare class ContactRow extends React.Component<ContactRowProps, ContactRowState> {
    constructor(props: ContactRowProps);
    render(): JSX.Element;
}
export default ContactRow;

import * as React from 'react';
interface NewsOrEvent {
    img: LooseObject;
    day: string;
    mounthAndYear: string;
    title: string;
    text: string;
    url: LooseObject;
}
export interface NewsAndEventsProps {
    data: {
        title?: string;
        showMore?: boolean;
        newsAndEvents: NewsOrEvent[];
    };
}
export interface NewsAndEventsState {
}
declare class NewsAndEvents extends React.Component<NewsAndEventsProps, NewsAndEventsState> {
    constructor(props: NewsAndEventsProps);
    render(): JSX.Element;
}
export default NewsAndEvents;

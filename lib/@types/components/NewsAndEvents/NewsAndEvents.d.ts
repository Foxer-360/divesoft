import React from 'react';
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
        titleColor?: string;
        backgroundImage?: LooseObject;
        newsAndEvents: NewsOrEvent[];
    };
}
export interface NewsAndEventsState {
    items: any;
    expanded: boolean;
}
declare class NewsAndEvents extends React.Component<NewsAndEventsProps, NewsAndEventsState> {
    constructor(props: NewsAndEventsProps);
    componentWillReceiveProps: (nextProps: any) => void;
    render(): JSX.Element;
}
export default NewsAndEvents;

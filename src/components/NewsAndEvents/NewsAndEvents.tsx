import * as React from 'react';

import Button from '@source/partials/Button';
import Media from '@source/partials/Media';
import Link from '@source/partials/Link';
import List from '../List';

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

export interface NewsAndEventsState {}

class NewsAndEvents extends React.Component<NewsAndEventsProps, NewsAndEventsState> {
  constructor(props: NewsAndEventsProps) {
    super(props);

    this.state = {};
  }  

  public render() {
    const { newsAndEvents, title, showMore } = this.props.data;

    return (
      <List data={newsAndEvents}>
        {({ data }) => (
          <div className={'newsAndEvents'}>
            <div className={'container'}>
              {title && <h3>{title}</h3>}
              <div className={'newsAndEvents__list row'}>
                {data.map((item, i) => (
                  <div key={i} className={'newsAndEvents__list__item col'}>
                    <div className="row">
                      {item.img && <Media type={'image'} data={item.img} />}
                    </div>
                    <div className="row">
                      <div className={'newsAndEvents__list__item__content'}>
                        <p>
                          <span style={{color: '#e50000'}}>{item.day}</span>
                          / {item.mounthAndYear}</p>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                        <Link url={item.url && item.url.url}>
                          More information
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </List>
    );
  }
}

export default NewsAndEvents;
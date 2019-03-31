import React from 'react';

import List from '../../List';
import Link from '@source/partials/Link';

export interface ContactRowState {
  numberOfPage: number;
}

interface Contact {
  name: string;
  position: string;
  email: string;
  phone: string;
  web: LooseObject;
}

interface ContactRowProps {
  title: string;
  rows: Contact[];
}

class ContactRow extends React.Component<ContactRowProps, ContactRowState> {
  constructor(props: ContactRowProps) {
    super(props);

    this.state = {
      numberOfPage: 1
    };
  }

  public render() {
    const { title, rows } = this.props;

    return (
      
      <List data={rows}>
        {({ getPage }) => {
          const { items, lastPage } = getPage(this.state.numberOfPage, 'infinite', 3);

          return (
            <div className={'contactRow'}>
              <div className={'container'}>
                <div className="row contactRow__divider">

                  <div className="col-12 col-md-3">
                    <h3>{title}</h3>

                  {this.state.numberOfPage < lastPage &&
                    <button 
                      className={'contactRow__showMore'} 
                      onClick={() => this.setState({ numberOfPage: this.state.numberOfPage + 1 })}
                    >Show more
                    </button>
                  }

                  </div>
                  
                  <div className="col-12 col-md-9">
                    <div className={'row'}>
                      {items && items.map((item, i) => (
                        <div key={i} className={'contactRow__item col-12 col-md-4'}>
                          <h5>{item.name}</h5>
                          <span>{item.position}</span>
                          <p>W: <Link url={item.url && item.url.url}>
                          {item.urlTitle}</Link></p>
                          <p>M: <a href={`mailto:${item.email}`}>{item.email}</a></p>
                          <p>P: <a href={`tel:${item.phone}`}>{item.phone}</a></p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        }}
      </List>
    );
  }
}

export default ContactRow;
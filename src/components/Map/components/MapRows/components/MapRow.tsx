import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

import Link from '../../../../../partials/Link';

interface MapRowState {
  show: boolean;
}

interface MapRowProps {
  title: string;
  text?: string;
  address?: string;
  storeChief?: string;
  phone?: string;
  email?: string;
  web?: LooseObject;
}

class MapRow extends React.Component<MapRowProps, MapRowState> {
  constructor(props: MapRowProps) {
    super(props);

    this.state = {
      show: false
    };
  }

  public render () {
    const {
      title,
      text,
      address,
      storeChief,
      phone,
      email,
      web
    } = this.props;

    return (
      <div className="row">
        <div className="col-12 col-md-4">
          <h5 onClick={() => this.setState({ show: !this.state.show })}>{title}</h5>
          {this.state.show ?
            <div className={'serviceRow__list__contacts'}>
              {storeChief && <p>Store chief: {storeChief}</p>}
              {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
              {email && <p>Email: <a href={`mailto:${email}`}>{email}</a></p>}
              {web && <p>Web: <Link {...web}>{(web.url && web.url.toString()) || title}</Link></p>}

            </div> : ''}
        </div>
        <div className="col-12 col-md-8">
          <div
            onClick={() => this.setState({ show: !this.state.show })}
            className={`serviceRow__list__show ${this.state.show ? 'serviceRow__list__show--minus' : ''}`}
          />
          <div className={'serviceRow__list__item'}>
            <p onClick={() => this.setState({ show: !this.state.show })}>{address}</p>
            {this.state.show && text && <ReactMarkdown source={text} />}
          </div>
        </div>
        <div className={'serviceRow__list__divider'} />
      </div>
    );
  }
}

export default MapRow;

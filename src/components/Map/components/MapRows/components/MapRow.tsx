import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

interface MapRowProps {
  title: string;
  text?: string;
  city?: string;
  address?: string;
  storeChief?: string;
  phone?: string;
  email?: string;
  web?: LooseObject;
  item: LooseObject;
  open: Function;
  otherCountries: string;
}

interface MapRowState {
  show: boolean;
}

class MapRow extends React.Component<MapRowProps, MapRowState> {
  constructor(props: MapRowProps) {
    super(props);

    this.state = {
      show: false
    };
  }

  renderListItem = () => {
    const {
      address,
      city,
    } = this.props;
    return [ address, city ].filter(item => item && item.trim()).map(item => item.trim()).join(', ');
  }

  rowClick = (item) => {
    if (!this.state.show) {
      this.props.open(item);
    }
    this.setState({ show: !this.state.show });
  }

  public render () {
    const {
      title,
      text,
      storeChief,
      phone,
      email,
      web,
      item,
      otherCountries,
    } = this.props;

    const url = web && web.url && web.url.trim && web.url.trim();

    return (
      <div className="row">
        <div className="col-12 col-md-5">
          <h5 onClick={() => this.rowClick(item)}>{title}</h5>
          {this.state.show ?
            <div className={'mapRow__list__contacts'}>
              {storeChief && <p>Store chief: {storeChief}</p>}
              {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
              {email && <p>Email: <a href={`mailto:${email}`}>{email}</a></p>}
              {url && <p>Web: <a href={url} target={'_blank'}>{String(url)}</a></p>}
              {otherCountries && 
              JSON.parse(otherCountries).length > 0 &&
                <p className="countries">Countries: {`${item.country}, ${JSON.parse(otherCountries).join(', ')}`}</p>
              }

            </div> : ''}
        </div>
        <div className="col-12 col-md-7">
          <div
            onClick={() => this.rowClick(item)}
            className={`mapRow__list__show ${this.state.show ? 'mapRow__list__show--minus' : ''}`}
          />
          <div className={'mapRow__list__item'}>
            <p onClick={() => this.rowClick(item)}>{this.renderListItem()}</p>
            {this.state.show && text && <ReactMarkdown source={text} />}
          </div>
        </div>
        <div className={'mapRow__list__divider'} />
      </div>
    );
  }
}

export default MapRow;

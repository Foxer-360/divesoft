import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { urlize } from 'urlize';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Link from '../../../../../partials/Link';


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
  slugComponents?: string;
  detailsLink?: boolean;
}

interface MapRowState {
  show: boolean;
}

const GET_CONTEXT = gql`
  {
    languageData @client
    pageData @client
    websiteData @client
    languagesData @client
    navigationsData @client
  }
`;

const getLink = (data, slugComponents) => {
  let splitComponents = slugComponents.split('/');
  let dealerLink = splitComponents.pop();
  let prefixes = splitComponents.join('/');
  let link = `/${data.languageData && data.languageData.code}/${prefixes}/${urlize(dealerLink).replace(/\-$/, "")}`;
  let sanitizedLink = link.replace(/\/\//g, "/");
  return sanitizedLink;
};

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
      slugComponents,
      detailsLink,
    } = this.props;

    const url = web && web.url && web.url.trim && web.url.trim();

    return (
      <Query query={GET_CONTEXT}>
        {({ data }) => {
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
                {detailsLink && slugComponents && <div className={'mapRow__list__contacts'}>
                  {this.state.show &&
                    <Link className="mapRow__list__contacts__detailsLink" dynamic={true} url={getLink(data, slugComponents)}>
                    More details
                  </Link>}
                </div>}
              </div>
              <div className={'mapRow__list__divider'} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MapRow;

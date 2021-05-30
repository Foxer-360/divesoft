import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { urlize } from 'urlize';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Link from '../../partials/Link';

export interface MapBoxProps {
  title?: string;
  name?: string;
  country?: string;
  text?: string;
  address?: string;
  city?: string;
  email?: string;
  phone?: string;
  service?: string;
  storeChief?: string;
  keywords?: string;
  web?: LooseObject;
  position?: string;
  url?: LooseObject;
  otherCountries?: string;
  slugComponents?: string;
  detailsLink?: boolean;
  onClick: Function;
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

export function MapBox(props: MapBoxProps) {
  const {
    title,
    country,
    address,
    city,
    email,
    phone,
    service,
    storeChief,
    text,
    web,
    name,
    position,
    keywords,
    otherCountries,
    slugComponents,
    detailsLink,
    onClick
  } = props;

  const url = web && web.url && web.url.trim && web.url.trim();

  return (
    <Query query={GET_CONTEXT}>
      {({ data }) => {
        return (
        <div className={'mapBox'}>
          <div className={'mapBox--close'} onClick={() => onClick()} />

          {title && <h3>{title}</h3>}
          {name && <h3>{name}</h3>}

          {keywords && <p>{keywords}</p>}

          {country && <h4>{country}{' '}
            <span style={{ color: '#6c6c6c', fontSize: '1.6rem' }}>
              {city}
            </span>
          </h4>}

          {address && <h5>{address}</h5>}
          {position && <h5>{position}</h5>}

          <div className={'mapBox__info'}>
            {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
            {email && <p>Email: <a href={`mailto:${email}`}>{email}</a></p>}
            {url && <p>Web: <a href={url} target={'_blank'}>{String(url)}</a></p>}
            {otherCountries && 
            JSON.parse(otherCountries).length > 0 &&
              <p className="countries">Countries: {`${country}, ${JSON.parse(otherCountries).join(', ')}`}</p>
            }
            {storeChief && <p>Store chief: {storeChief}</p>}
            {service && <p>Service: {service}</p>}
            {text && <ReactMarkdown source={text} />}
            {detailsLink && slugComponents && <Link className="mapRow__list__contacts__detailsLink" dynamic={true} url={getLink(data, slugComponents)}>
              More details
            </Link>}
          </div>
        </div>
          );
        }}
      </Query>
  );
}

export default MapBox;

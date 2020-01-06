import * as React from 'react';

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
  onClick: any;
}

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
    onClick
  } = props;

  const url = web && web.url && web.url.trim && web.url.trim();

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
        {storeChief && <p>Store chief: {storeChief}</p>}
        {service && <p>Service: {service}</p>}
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}

export default MapBox;

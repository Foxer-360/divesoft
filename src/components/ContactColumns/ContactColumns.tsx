import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

export interface ContactColumnsProps {
  data: {
    firstTitle: string;
    firstAddress: string;
    firstEmail: string;
    firstAccounts: string;
    secondTitle: string;
    secondAddress: string;
    secondEmail: string;
    secondAccounts: string;
    bottomInfo: string;
  };
}

const ContactColumns = (props: ContactColumnsProps) => {
  const {
    firstTitle,
    firstAddress,
    firstEmail,
    firstAccounts,
    secondTitle,
    secondAddress,
    secondEmail,
    secondAccounts,
    bottomInfo
  } = props.data;

  return (
    <div className={'container'}>
      <div className={'contactColumns'}>
        <div className={'contactColumns__list d-flex justify-content-between'}>
          <div className={'contactColumns__col'}>
            {firstTitle && <h3>{firstTitle}</h3>}
            {firstAddress && <ReactMarkdown className={'contactColumns__col__address'} source={firstAddress} />}
            {firstEmail &&
              <h5>E-mail: <a style={{ color: '#e50000' }} href={`mailto:${firstEmail}`}>{firstEmail}</a></h5>}
            {firstAccounts && <ReactMarkdown source={firstAccounts} />}
          </div>
          <div className={'contactColumns__col'}>
            {secondTitle && <h3>{secondTitle}</h3>}
            {secondAddress && <ReactMarkdown className={'contactColumns__col__address'} source={secondAddress} />}
            {secondEmail &&
              <h5>E-mail: <a style={{ color: '#e50000' }} href={`mailto:${secondEmail}`}>{secondEmail}</a></h5>}
            {secondAccounts && <ReactMarkdown source={secondAccounts} />}
          </div>
        </div>
        {bottomInfo && <p className={'contactColumns__bottomInfo'}>{bottomInfo}</p>}
        <div className={'contactColumns__divider'} />
      </div>
    </div>
  );
};

export default ContactColumns;

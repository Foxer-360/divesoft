import React from 'react';
import ReactMarkdown from 'react-markdown';

import Media from '@source/partials/Media';
import Button from '@source/partials/Button';

export interface NewsProps {
  data: {
    title?: string;
    shareUrl?: LooseObject;
    firstText: string;
    firstImg?: LooseObject;
    secondText?: string;
    secondImg?: LooseObject;
    thirdImg?: LooseObject;
    thirdText?: string;
    buttonUrl?: LooseObject;
  };
}

const News = (props: NewsProps) => {
  const { 
    title,
    shareUrl,
    firstText,
    firstImg,
    secondText,
    secondImg,
    thirdImg,
    thirdText,
    buttonUrl
   } = props.data;

  return (
    <div className={'news'}>
      <div className="container">
        <div className="row">
          <div className="col-10">
            {title && <p className={'news__title'}>{title}</p>}
          </div>
          <div className="col-2">
            {shareUrl && <Button url={shareUrl}>Share</Button>}
          </div>
        </div>
        {firstText && <div className="row">
          {firstText && <ReactMarkdown source={firstText} />}
        </div>}
        {firstImg && <div className="row">
          <Media type={'image'} data={firstImg} />
        </div>}
        {secondText && <div className="row">
          <ReactMarkdown source={secondText} />
        </div>}
        <div className="row">
          <div className="col-12 col-md-6">
            {secondImg && <Media type={'image'} data={secondImg} />}
          </div>
          <div className="col-12 col-md-6">
            {thirdImg && <Media type={'image'} data={thirdImg} />}
          </div>
        </div>
        {thirdText && <div className="row">
          <ReactMarkdown source={thirdText} />
        </div>}
        {buttonUrl && <Button url={buttonUrl}>All news & events</Button>}
      </div>
    </div>
  );
};

export default News;
import * as React from 'react';
import HalfContentCard from './HalfContentCard';
import ProductPreview from './ProductPreview';
import ContentList from './ContentList';
import OrderButton from './OrderButton';
import { DEFAULT_LIST_ITEMS, DEFAULT_SUBTITLE, DEFAULT_TEXT, DEFAULT_TITLE } from './const';

const MicrositeContent = () => {
  return (
    <div className="productMicrosite__content">
      <ProductPreview title={DEFAULT_TITLE} text={DEFAULT_TEXT} />
      <HalfContentCard title={DEFAULT_TITLE} subtitle={DEFAULT_SUBTITLE} text={DEFAULT_TEXT} />
      <HalfContentCard contentSide="right" title={DEFAULT_TITLE} text={DEFAULT_TEXT} />
      <ContentList title={DEFAULT_TITLE} text={DEFAULT_TEXT} listItems={DEFAULT_LIST_ITEMS} />
      <HalfContentCard
        className="productMicrosite__content__orderBox"
        title={DEFAULT_TITLE}
        subtitle={DEFAULT_SUBTITLE}
        text={DEFAULT_TEXT}
      >
        <OrderButton />
      </HalfContentCard>
    </div>
  );
};

export default MicrositeContent;

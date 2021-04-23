import * as React from 'react';
import { IProductMicrositeData } from '../types';
import HalfContentCard from './HalfContentCard';
import ProductPreview from './ProductPreview';
import ContentList from './ContentList';
import OrderButton from './OrderButton';

interface IProps {
  data: IProductMicrositeData;
}

const MicrositeContent = ({ data }: IProps) => {
  const {
    productPrice,
    productUrl,
    firstSectionTitle,
    firstSectionDescription,
    secondSectionTitle,
    secondSectionDescription,
    thirdSectionTitle,
    thirdSectionDescription,
    fourthSectionTitle,
    fourthSectionDescription,
    fifthSectionTitle,
    fifthSectionDescription,
    fifthSectionItems,
    sixthSectionTitle,
    sixthSectionDescription,
  } = data;

  return (
    <div className="productMicrosite__content">
      <ProductPreview title={firstSectionTitle} text={firstSectionDescription} />
      <HalfContentCard title={secondSectionTitle} text={secondSectionDescription} />
      <HalfContentCard contentSide="right" title={thirdSectionTitle} text={thirdSectionDescription} />
      <ProductPreview type="small" title={fourthSectionTitle} text={fourthSectionDescription} />
      <ContentList title={fifthSectionTitle} text={fifthSectionDescription} listItems={fifthSectionItems} />
      <HalfContentCard
        className="productMicrosite__content__orderBox"
        title={sixthSectionTitle}
        text={sixthSectionDescription}
      >
        <OrderButton productPrice={productPrice} productUrl={productUrl} />
      </HalfContentCard>
    </div>
  );
};

export default MicrositeContent;

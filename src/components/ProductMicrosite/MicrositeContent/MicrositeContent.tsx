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
    firstSectionImage,
    secondSectionTitle,
    secondSectionDescription,
    secondSectionBgColor,
    secondSectionImage,
    thirdSectionTitle,
    thirdSectionDescription,
    thirdSectionBgColor,
    thirdSectionImage,
    fourthSectionTitle,
    fourthSectionDescription,
    fourthSectionImage,
    fifthSectionTitle,
    fifthSectionDescription,
    fifthSectionItems,
    sixthSectionTitle,
    sixthSectionDescription,
    sixthSectionBgColor,
    sixthSectionImage,
  } = data;

  return (
    <div className="productMicrosite__content">
      <ProductPreview image={firstSectionImage} title={firstSectionTitle} text={firstSectionDescription} />
      <HalfContentCard title={secondSectionTitle} text={secondSectionDescription} imageBgColor={secondSectionBgColor} />
      <HalfContentCard
        contentSide="right"
        title={thirdSectionTitle}
        text={thirdSectionDescription}
        imageBgColor={thirdSectionBgColor}
      />
      <ProductPreview
        type="small"
        image={fourthSectionImage}
        title={fourthSectionTitle}
        text={fourthSectionDescription}
      />
      <ContentList title={fifthSectionTitle} text={fifthSectionDescription} listItems={fifthSectionItems} />
      <HalfContentCard
        className="productMicrosite__content__orderBox"
        title={sixthSectionTitle}
        text={sixthSectionDescription}
        imageBgColor={sixthSectionBgColor}
      >
        <OrderButton productPrice={productPrice} productUrl={productUrl} />
      </HalfContentCard>
    </div>
  );
};

export default MicrositeContent;

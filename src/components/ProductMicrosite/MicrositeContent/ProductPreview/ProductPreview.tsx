import * as React from 'react';
import ContentCard, { IContentCardProps } from '../ContentCard';

interface IProps extends IContentCardProps {}

const ProductPreview = ({ title, text }: IProps) => {
  return (
    <div className="productMicrosite__productPreview">
      <img
        className="productMicrosite__productPreview__image"
        src="/assets/divesoft/images/freedom.png"
        alt="Product preview"
      />
      <ContentCard title={title} text={text} />
    </div>
  );
};

export default ProductPreview;

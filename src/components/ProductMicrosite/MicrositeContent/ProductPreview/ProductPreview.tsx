import * as React from 'react';
import Container from '@source/partials/Container';
import ContentCard, { IContentCardProps } from '../ContentCard';

enum PRODUCT_PREVIEW_TYPE_ENUM {
  default = 'default',
  small = 'small',
}

interface IProps extends IContentCardProps {
  type?: keyof typeof PRODUCT_PREVIEW_TYPE_ENUM;
}

const ProductPreview = ({ title, text, type = PRODUCT_PREVIEW_TYPE_ENUM.default }: IProps) => {
  return (
    <Container>
      <section className={`productMicrosite__productPreview ${type}`}>
        <div className="productMicrosite__productPreview__imageWrapper">
          <img
            className="productMicrosite__productPreview__image"
            src="/assets/divesoft/images/freedom.png"
            alt="Product preview"
          />
        </div>
        <ContentCard title={title} text={text} />
      </section>
    </Container>
  );
};

export default ProductPreview;

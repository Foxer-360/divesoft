import * as React from 'react';
import Container from '@source/partials/Container';
import Media from '@source/partials/Media';
import ContentCard, { IContentCardProps } from '../ContentCard';

enum PRODUCT_PREVIEW_TYPE_ENUM {
  default = 'default',
  small = 'small',
}

interface IProps extends IContentCardProps {
  image: LooseObject;
  type?: keyof typeof PRODUCT_PREVIEW_TYPE_ENUM;
}

const ProductPreview = ({ image, title, text, type = PRODUCT_PREVIEW_TYPE_ENUM.default }: IProps) => {
  return (
    <Container>
      <section className={`productMicrosite__productPreview ${type}`}>
        <div className="productMicrosite__productPreview__imageWrapper">
          <Media imageClassName="productMicrosite__productPreview__image" className="nevim" type="image" data={image} />
        </div>
        <ContentCard title={title} text={text} />
      </section>
    </Container>
  );
};

export default ProductPreview;

import * as React from 'react';
import Button from '@source/partials/Button';
import Container from '@source/partials/Container';
import ContentCard from './ContentCard';
import HalfContentCard from './HalfContentCard';
import ProductPreview from './ProductPreview';
import { DEFAULT_LIST_ITEMS, DEFAULT_SUBTITLE, DEFAULT_TEXT, DEFAULT_TITLE } from './const';
import ContentList from './ContentList';

const MicrositeContent = () => {
  return (
    <Container className="productMicrosite__content">
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
        <div className="productMicrosite__content__btnWrapper">
          <strong className="productMicrosite__content__price">XXX,-</strong>
          <Button>Objednat</Button>
        </div>
      </HalfContentCard>
    </Container>
  );
};

export default MicrositeContent;

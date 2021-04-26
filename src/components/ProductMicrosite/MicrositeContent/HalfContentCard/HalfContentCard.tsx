import * as React from 'react';
import Container from '@source/partials/Container';
import Media from '@source/partials/Media';
import Paragraph from '../Paragraph';
import Title from '../Title';

enum CONTENT_SIDE_ENUM {
  left = 'left',
  right = 'right',
}

interface IProps {
  title: string;
  text: string;
  imageBgColor: string;
  image: LooseObject;
  children?: React.ReactNode;
  contentSide?: keyof typeof CONTENT_SIDE_ENUM;
  className?: string;
}

const HalfContentCard = (props: IProps) => {
  const { title, text, imageBgColor, image, children, contentSide = CONTENT_SIDE_ENUM.left, className } = props;

  return (
    <Container className={className}>
      <section className={`productMicrosite__halfContentCard ${contentSide}`}>
        <div className="productMicrosite__halfContentCard__item productMicrosite__halfContentCard__content">
          <Title>{title}</Title>
          <Paragraph>{text}</Paragraph>
          {children}
        </div>
        <div className="productMicrosite__halfContentCard__item productMicrosite__halfContentCard__imageWrapper">
          <div style={{ backgroundColor: imageBgColor }} className="productMicrosite__halfContentCard__imageBackground">
            Image background
          </div>
          <Media imageClassName="productMicrosite__halfContentCard__image" type="image" data={image} />
        </div>
      </section>
    </Container>
  );
};

export default HalfContentCard;

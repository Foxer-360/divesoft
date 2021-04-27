import * as React from 'react';
import getImageUrl from '@source/helpers/getImageUrl';
import Container from '@source/partials/Container';
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
  bgColor?: string;
  children?: React.ReactNode;
  contentSide?: keyof typeof CONTENT_SIDE_ENUM;
  className?: string;
}

const HalfContentCard = (props: IProps) => {
  const {
    title,
    text,
    imageBgColor,
    image,
    bgColor,
    children,
    contentSide = CONTENT_SIDE_ENUM.left,
    className = '',
  } = props;
  const { alt: imageAlt } = image;

  return (
    <Container style={{ backgroundColor: bgColor }}>
      <section className={`productMicrosite__halfContentCard ${contentSide} ${className}`}>
        <div className="productMicrosite__halfContentCard__item productMicrosite__halfContentCard__content">
          <Title>{title}</Title>
          <Paragraph>{text}</Paragraph>
          {children}
        </div>
        <div className="productMicrosite__halfContentCard__item productMicrosite__halfContentCard__imageWrapper">
          <div style={{ backgroundColor: imageBgColor }} className="productMicrosite__halfContentCard__imageBackground">
            Background image
          </div>
          <div
            className="productMicrosite__halfContentCard__image"
            style={{ backgroundImage: `url("${getImageUrl(image)}")` }}
          >
            {imageAlt || 'Product image'}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HalfContentCard;

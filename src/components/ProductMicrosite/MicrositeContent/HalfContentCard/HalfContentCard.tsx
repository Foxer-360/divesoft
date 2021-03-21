import * as React from 'react';
import Paragraph from '../Paragraph';
import Subtitle from '../Subtitle';
import Title from '../Title';

enum CONTENT_SIDE_ENUM {
  left = 'left',
  right = 'right',
}

interface IProps {
  title: string;
  text: string;
  subtitle?: string;
  children?: React.ReactNode;
  contentSide?: keyof typeof CONTENT_SIDE_ENUM;
  className?: string;
}

const HalfContentCard = (props: IProps) => {
  const { title, text, subtitle, children, contentSide = CONTENT_SIDE_ENUM.left, className } = props;

  return (
    <section className={`productMicrosite__halfContentCard ${contentSide} ${className}`}>
      <div className="productMicrosite__halfContentCard__item productMicrosite__halfContentCard__content">
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Paragraph>{text}</Paragraph>
        {children}
      </div>
      <div className="productMicrosite__halfContentCard__item productMicrosite__halfContentCard__imageWrapper">
        <img
          className="productMicrosite__halfContentCard__image"
          src="/assets/divesoft/images/freedom.png"
          alt="Content card image"
        />
      </div>
    </section>
  );
};

export default HalfContentCard;

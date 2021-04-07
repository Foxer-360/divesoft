import * as React from 'react';
import Paragraph from '../Paragraph';
import Title from '../Title';

export interface IContentCardProps {
  title: string;
  text: string;
}

const ContentCard = ({ title, text }: IContentCardProps) => {
  return (
    <section className="productMicrosite__contentCard">
      <div className="productMicrosite__contentCard__wrapper">
        <Title className="productMicrosite__contentCard__headline">{title}</Title>
        <Paragraph className="productMicrosite__contentCard__text">{text}</Paragraph>
      </div>
    </section>
  );
};

export default ContentCard;

import * as React from 'react';
import Container from '@source/partials/Container';
import ContentCard, { IContentCardProps } from '../ContentCard';
import Paragraph from '../Paragraph';
import Subtitle from '../Subtitle';

interface ListItem {
  title: string;
  text: string;
}

interface IProps extends IContentCardProps {
  listItems: ListItem[];
}

const ContentList = ({ title, text, listItems }: IProps) => {
  return (
    <Container>
      <section className="productMicrosite__contentList">
        <ContentCard title={title} text={text} />
        <ul className="productMicrosite__contentList__list">
          {listItems.map(({ title: itemTitle, text: itemText }, index) => (
            <li className="productMicrosite__contentList__listItem" key={`content-list-item-${itemTitle}-${index}`}>
              <div className="productMicrosite__contentList__itemTitleWrapper">
                <Subtitle className="productMicrosite__contentList__itemTitle">{itemTitle}</Subtitle>
              </div>
              <Paragraph>{itemText}</Paragraph>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default ContentList;

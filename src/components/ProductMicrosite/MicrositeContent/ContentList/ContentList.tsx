import * as React from 'react';
import getImageUrl from '@source/helpers/getImageUrl';
import Container from '@source/partials/Container';
import Subtitle from '../../Subtitle';
import { IListItem } from '../../types';
import ContentCard, { IContentCardProps } from '../ContentCard';
import Paragraph from '../Paragraph';

interface IProps extends IContentCardProps {
  listItems: IListItem[];
}

const ContentList = ({ title, text, listItems }: IProps) => {
  return (
    <Container>
      <section className="productMicrosite__contentList">
        <ContentCard title={title} text={text} />
        <ul className="productMicrosite__contentList__list">
          {listItems.map(({ title: itemTitle, description: itemText, iconImage }, index) => (
            <li className="productMicrosite__contentList__listItem" key={`content-list-item-${itemTitle}-${index}`}>
              <div className="productMicrosite__contentList__itemTitleWrapper">
                <div
                  className="productMicrosite__contentList__iconImage"
                  style={{ backgroundImage: `url("${getImageUrl(iconImage)}")` }}
                >
                  {iconImage.alt || `Icon image ${itemTitle}`}
                </div>
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

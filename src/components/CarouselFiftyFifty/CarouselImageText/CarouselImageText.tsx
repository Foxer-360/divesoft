import Media from '@source/partials/Media';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown/with-html';
import { BASE_URL } from './const';

interface CarouselImageTextProps {
  mainIndex: number;
  title?: string;
  subtitle?: string;
  image?: LooseObject;
  imagePosition?: string;
  secondaryImage?: LooseObject;
  text?: string;
  centerText?: boolean;
  backgroundColor?: string;
}

interface CarouselImageTextState {
  isVisible: boolean;
}

class CarouselImageText extends React.Component<CarouselImageTextProps, CarouselImageTextState> {
  public state: CarouselImageTextState = {
    isVisible: false,
  };

  public render() {
    const {
      text,
      image,
      secondaryImage,
      title,
      mainIndex,
      imagePosition,
      subtitle,
      centerText,
      backgroundColor,
    } = this.props;

    const { category, hash, filename } = image;

    const originalUrl = BASE_URL + category + hash + '_' + filename;

    return (
      <section
        className={`carouselImageText ${
          imagePosition && imagePosition === 'right' ? 'carouselImageText--right' : 'carouselImageText--left'
        } `}
        id={`imageTextSection--${mainIndex}`}
      >
        <div
          className="carouselImageText__imgHolder"
          style={{ backgroundImage: `url("${originalUrl}")`, backgroundColor: backgroundColor }}
        />
        <div className="carouselImageText__contentHolder">
          <div className="carouselImageText__contentHolder__cornerLogo">
            {secondaryImage && (
              <div
                className={`carouselImageText__contentHolder__image ${
                  centerText ? 'carouselImageText__contentHolder__image--center' : ''
                }`}
              >
                <Media type="image" data={secondaryImage} />
              </div>
            )}

            <div
              className={`carouselImageText__contentHolder__text ${
                centerText ? 'carouselImageText__contentHolder__text--center' : ''
              }`}
            >
              <h2>{title}</h2>
              <h4>{subtitle}</h4>
              <ReactMarkdown source={text} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CarouselImageText;

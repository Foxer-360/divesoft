import * as React from 'react';
import Button from '@source/partials/Button';
import Media from '@source/partials/Media';
import { getBackgroundImageStyle, getTextColor, shouldButtonRender } from './utils';

interface CarouselImageTextProps {
  title?: string;
  subtitle?: string;
  image?: LooseObject;
  imagePosition?: string;
  secondaryImage?: LooseObject;
  text?: string;
  centerText?: boolean;
  imageBackgroundColor?: string;
  textBackgroundColor?: string;
  isTextWhite?: boolean;
  textImage?: LooseObject;
  url?: LooseObject;
  buttonTitle?: string;
}

class CarouselImageText extends React.Component<CarouselImageTextProps> {
  renderSecondaryImage = () => {
    const { secondaryImage, centerText } = this.props;

    if (!secondaryImage) return null;

    return (
      <div
        className={`carouselImageText__contentHolder__image ${
          centerText ? 'carouselImageText__contentHolder__image--center' : ''
        }`}
      >
        <Media width={'100'} height={'100'} type="image" data={secondaryImage} />
      </div>
    );
  };

  renderCallToActionBtn = () => {
    const { centerText, isTextWhite, url, buttonTitle } = this.props;

    if (!shouldButtonRender(url, buttonTitle)) return null;

    return (
      <div
        className={`carouselImageText__contentHolder__btnHolder ${
          centerText ? 'carouselImageText__contentHolder__btnHolder--center' : ''
        }`}
      >
        <Button classes={`${!isTextWhite ? 'btn--bordered' : ''} ${centerText ? 'btn--center' : ''}`} url={url}>
          {buttonTitle}
        </Button>
      </div>
    );
  };

  render() {
    const {
      text,
      image,
      title,
      imagePosition,
      subtitle,
      centerText,
      imageBackgroundColor,
      textBackgroundColor,
      isTextWhite,
      textImage,
    } = this.props;

    return (
      <section
        className={`carouselImageText ${
          imagePosition && imagePosition === 'right' ? 'carouselImageText--right' : 'carouselImageText--left'
        } `}
      >
        <div className={'carouselImageText__imgHolder'} style={getBackgroundImageStyle(image, imageBackgroundColor)} />
        <div
          className={'carouselImageText__contentHolder'}
          style={getBackgroundImageStyle(textImage, textBackgroundColor)}
        >
          {this.renderSecondaryImage()}
          <div
            className={`carouselImageText__contentHolder__text ${
              centerText ? 'carouselImageText__contentHolder__text--center' : ''
            }`}
          >
            {title && <h2 style={getTextColor(isTextWhite)}>{title}</h2>}
            {subtitle && <h4 style={getTextColor(isTextWhite)}>{subtitle}</h4>}
            {text && <p style={getTextColor(isTextWhite)}>{text}</p>}
            {this.renderCallToActionBtn()}
          </div>
        </div>
      </section>
    );
  }
}

export default CarouselImageText;

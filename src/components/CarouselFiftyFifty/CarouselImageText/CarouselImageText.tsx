import * as React from 'react';
import Button from '@source/partials/Button';
import Media from '@source/partials/Media';
import { getImageOriginalUrl, getTextColor, shouldButtonRender } from './utils';

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
      imagePosition,
      subtitle,
      centerText,
      imageBackgroundColor,
      textBackgroundColor,
      isTextWhite,
      textImage,
      url,
      buttonTitle,
    } = this.props;

    return (
      <section
        className={`carouselImageText ${
          imagePosition && imagePosition === 'right' ? 'carouselImageText--right' : 'carouselImageText--left'
        } `}
      >
        <div
          className={'carouselImageText__imgHolder'}
          style={{ backgroundImage: `url("${getImageOriginalUrl(image)}")`, backgroundColor: imageBackgroundColor }}
        />
        <div
          className={'carouselImageText__contentHolder'}
          style={{ backgroundImage: `url("${getImageOriginalUrl(textImage)}")`, backgroundColor: textBackgroundColor }}
        >
          {secondaryImage && (
            <div
              className={`carouselImageText__contentHolder__image ${
                centerText ? 'carouselImageText__contentHolder__image--center' : ''
              }`}
            >
              <Media width={'100'} height={'100'} type="image" data={secondaryImage} />
            </div>
          )}

          <div
            className={`carouselImageText__contentHolder__text ${
              centerText ? 'carouselImageText__contentHolder__text--center' : ''
            }`}
          >
            {title && <h2 style={getTextColor(isTextWhite)}>{title}</h2>}
            {subtitle && <h4 style={getTextColor(isTextWhite)}>{subtitle}</h4>}
            {text && <p style={getTextColor(isTextWhite)}>{text}</p>}
            {shouldButtonRender(url, buttonTitle) && (
              <div
                className={`carouselImageText__contentHolder__btnHolder ${
                  centerText ? 'carouselImageText__contentHolder__btnHolder--center' : ''
                }`}
              >
                <Button classes={`${isTextWhite ? '' : 'btn--bordered'} ${centerText ? 'btn--center' : ''}`} url={url}>
                  {buttonTitle}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default CarouselImageText;

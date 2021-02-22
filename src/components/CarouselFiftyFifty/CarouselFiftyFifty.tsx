import * as React from 'react';
import Slider from 'react-slick';

import List from '../List';
import NextArrow from '../../partials/NextArrow';
import PrevArrow from '../../partials/PrevArrow';
import CarouselImageText from './CarouselImageText';
import { getImagePosition } from './utils';

interface Slide {
  image?: LooseObject;
  title?: string;
  secondaryImage?: LooseObject;
  subTitle?: string;
  description?: string;
  isCentred?: boolean;
  imageOnRight?: boolean;
  backgroundColor?: string;
}

export interface CarouselFiftyFiftyProps {
  data: {
    slides: Slide[];
  };
}

const CarouselFiftyFifty = (props: CarouselFiftyFiftyProps) => (
  <List data={props.data.slides || []}>
    {({ data: slides }) => {
      const arrayOfSlides =
        (slides &&
          slides.map((slide, i) => {
            const {
              title,
              subTitle,
              image,
              description,
              isCentred,
              backgroundColor,
              imageOnRight,
              secondaryImage,
            } = slide;
            return (
              <CarouselImageText
                mainIndex={i}
                title={title}
                subtitle={subTitle}
                image={image}
                secondaryImage={secondaryImage}
                imagePosition={getImagePosition(imageOnRight)}
                text={description}
                centerText={isCentred}
                backgroundColor={backgroundColor}
              />
            );
          })) ||
        [];

      var settings = {
        speed: 1000,
        dots: true,
        arrows: true,
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        nextArrow: <NextArrow classes={'carouselFiftyFifty--nextArrow'} />,
        prevArrow: <PrevArrow classes={'carouselFiftyFifty--prevArrow'} />,
      };

      return (
        <div className={'carouselFiftyFifty'}>
          <Slider {...settings}>{arrayOfSlides}</Slider>
        </div>
      );
    }}
  </List>
);

export default CarouselFiftyFifty;

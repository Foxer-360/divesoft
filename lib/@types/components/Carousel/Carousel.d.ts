import * as React from 'react';
interface Slide {
    image: LooseObject;
    url?: LooseObject;
    title?: string;
    subTitle?: string;
    description?: string;
    buttonTitle?: string;
    isBackgroundBlack: boolean;
    isCentred: boolean;
}
export interface CarouselProps {
    data: {
        slides: Slide[];
    };
}
export interface CarouselState {
}
declare class Carousel extends React.Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps);
    renderSlides(data: any): any[];
    render(): JSX.Element;
}
export default Carousel;
import * as React from 'react';
export interface AboutUsHomeState {
    hover: boolean;
}
export interface AboutUsHomeProps {
    data: {
        leftTitle: string;
        leftSubtitle: string;
        leftText: string;
        leftUrl?: LooseObject;
        leftBtnTitle: string;
        leftImg?: LooseObject;
        rightTitle: string;
        rightSubtitle: string;
        rightText: string;
        rightUrl?: LooseObject;
        rightBtnTitle: string;
        rightImg?: LooseObject;
    };
}
declare class AboutUsHome extends React.Component<AboutUsHomeProps, AboutUsHomeState> {
    constructor(props: AboutUsHomeProps);
    toggleHover: () => void;
    render(): JSX.Element;
}
export default AboutUsHome;

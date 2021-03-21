import * as React from 'react';
import { ITextProps as IProps } from '../types';

const Subtitle = ({ children, className }: IProps) => {
  return <h4 className={`productMicrosite__subtitle ${className}`}>{children}</h4>;
};

export default Subtitle;

import * as React from 'react';
import { ITextProps as IProps } from '../types';

const Paragraph = ({ children, className }: IProps) => {
  return <p className={`productMicrosite__paragraph ${className}`}>{children}</p>;
};

export default Paragraph;

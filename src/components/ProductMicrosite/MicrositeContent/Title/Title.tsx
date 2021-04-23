import * as React from 'react';
import { ITextProps as IProps } from '../../types';

const Title = ({ children, className = '' }: IProps) => {
  return <h2 className={`productMicrosite__title ${className}`}>{children}</h2>;
};

export default Title;

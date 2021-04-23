import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ITextProps as IProps } from '../types';

const Paragraph = ({ children, className = '' }: IProps) => {
  return <ReactMarkdown className={`productMicrosite__paragraph ${className}`}>{children}</ReactMarkdown>;
};

export default Paragraph;

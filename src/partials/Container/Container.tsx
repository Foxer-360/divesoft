import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container = ({ children, className, style }: IProps) => {
  return (
    <div style={style} className={`container ${className}`}>
      {children}
    </div>
  );
};

export default Container;

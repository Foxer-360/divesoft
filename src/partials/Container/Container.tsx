import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container = ({ children, className, style }: IProps) => {
  return (
    <div style={style} className={`containerWrapper ${className}`}>
      <div className="container">{children}</div>
    </div>
  );
};

export default Container;

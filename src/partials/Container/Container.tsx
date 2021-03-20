import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

const Container = ({ children }: IProps) => {
  return <div className="container">{children}</div>;
};

export default Container;

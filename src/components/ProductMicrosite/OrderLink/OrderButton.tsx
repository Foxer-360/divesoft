import * as React from 'react';
import Button from '@source/partials/Button';

interface IProps {
  url: string;
}

const OrderLink = ({ url }: IProps) => {
  return (
    <a href={url} target="__blank">
      <Button>Objednat</Button>
    </a>
  );
};

export default OrderLink;

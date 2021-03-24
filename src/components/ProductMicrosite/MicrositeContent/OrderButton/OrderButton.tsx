import * as React from 'react';
import Button from '@source/partials/Button';

const OrderButton = () => {
  return (
    <div className="productMicrosite__orderBtn">
      <strong className="productMicrosite__orderBtn__price">XXX,-</strong>
      <Button>Objednat</Button>
    </div>
  );
};

export default OrderButton;

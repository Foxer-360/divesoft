import * as React from 'react';
import OrderLink from '../../OrderLink';

interface IProps {
  productPrice: string;
  productUrl: string;
}

const OrderButton = ({ productPrice, productUrl }: IProps) => {
  return (
    <div className="productMicrosite__orderBtn">
      <strong className="productMicrosite__orderBtn__price">{productPrice},-</strong>
      <OrderLink url={productUrl} />
    </div>
  );
};

export default OrderButton;

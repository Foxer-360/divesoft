import * as React from 'react';
import MicrositeHeader from './MicrositeHeader';
import MicrositeContent from './MicrositeContent';
import { IProductMicrositeData } from './types';

interface IProps {
  data: IProductMicrositeData;
}

const ProductMicrosite = ({ data }: IProps) => {
  const { productName, productUrl } = data;

  return (
    <div className="productMicrosite">
      <MicrositeHeader productName={productName} productUrl={productUrl} />
      <MicrositeContent data={data} />
    </div>
  );
};

export default ProductMicrosite;

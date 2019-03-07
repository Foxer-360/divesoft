import * as React from 'react';
import Link from '@source/partials/Link';
import getImageUrl from '@source/helpers/getImageUrl';

interface ProductPreview {
  title: string;
  description: string;
  image: LooseObject;
  url: LooseObject;
}

export interface ProductPreviewsProps {
  data: {
    title: string;
    subTitle: string;
    productPreviews: ProductPreview[];
  };
}

const ProductPreviews = (props: ProductPreviewsProps) => {
  const { title, subTitle, productPreviews } = props.data;

  return (
    <div className={'product-previews'}>
      <div className="container">
        <div>
          {title && <h3>{title}</h3>}
          {subTitle && <p>{subTitle}</p>}
        </div>
        <div className="row">
          <div className={'product-preview__list'}>
            <div className="col">
              {productPreviews[0] && 
                <Link 
                  key={'1'}
                  url={productPreviews[0].url && productPreviews[0].url.url}
                  className={'product-previews__item'}
                  style={productPreviews[0].image ? 
                        { backgroundImage: `url(${getImageUrl(productPreviews[0].image)})`} : {}}
                >
                  {productPreviews[0].description && <p>{productPreviews[0].description}</p>}
                  <div className={'product-previews__item__divider'} />
                  {productPreviews[0].title && <p>{productPreviews[0].title}</p>}
                </Link>
              }
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  {productPreviews[1] && 
                    <Link 
                      key={'2'}
                      url={productPreviews[1].url && productPreviews[1].url.url}
                      className={'product-previews__item'}
                      style={productPreviews[1].image ? 
                            { backgroundImage: `url(${getImageUrl(productPreviews[1].image)})`} : {}}
                    >
                      {productPreviews[1].description && <p>{productPreviews[1].description}</p>}
                      <div className={'product-previews__item__divider'} />
                      {productPreviews[1].title && <p>{productPreviews[1].title}</p>}
                    </Link>
                  }
                </div>
                <div className="col">
                  {productPreviews[2] && 
                    <Link 
                      key={'3'}
                      url={productPreviews[2].url && productPreviews[2].url.url}
                      className={'product-previews__item'}
                      style={productPreviews[2].image ? 
                            { backgroundImage: `url(${getImageUrl(productPreviews[2].image)})`} : {}}
                    >
                      {productPreviews[2].description && <p>{productPreviews[2].description}</p>}
                      <div className={'product-previews__item__divider'} />
                      {productPreviews[2].title && <p>{productPreviews[2].title}</p>}
                    </Link>
                  }
                </div>
              </div>
              <div className="row">
                {productPreviews[3] && 
                  <Link 
                    key={'4'}
                    url={productPreviews[3].url && productPreviews[3].url.url}
                    className={'product-previews__item'}
                    style={productPreviews[3].image ? 
                          { backgroundImage: `url(${getImageUrl(productPreviews[3].image)})`} : {}}
                  >
                    {productPreviews[3].description && <p>{productPreviews[3].description}</p>}
                    <div className={'product-previews__item__divider'} />
                    {productPreviews[3].title && <p>{productPreviews[3].title}</p>}
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviews;
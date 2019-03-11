import React from 'react';

import List from '../List';
import Link from '@source/partials/Link';
import Media from '@source/partials/Media';

interface Component {
  title: string;
  description: string;
  image: LooseObject;
  url: LooseObject;
}

export interface ProductComponentsProps {
  data: {
    title: string;
    description: string;
    components: Component[];
  };
}

const ProductComponents = (props: ProductComponentsProps) => {
  const { title, description, components } = props.data;

  return (
    <List data={components}>
        {({ data }) => (
          <div className={'productComponents'}>
            <div className="container">
              {title && <h2>{title}</h2>}
              {description && 
                <p className={'productComponents__title'}>{description}</p>}
      
              <div className={'productComponents__list row'}>
                {data && data.map((item, i) => (
                  <div key={i} className="col-12 col-md-6 col-lg-4">
                    <div className={'productComponents__list__item'}>
                      <Media type={'image'} data={item.image} />
                      {item.title && <h5>{item.title}</h5>}
                      {item.description && <p>{item.description}</p>}
                      <Link url={item.url && item.url.url}>More information</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </List>
  );
};

export default ProductComponents;
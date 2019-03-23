import React from 'react';

import List from '../../../List';
import ServiceRowItem from './components/ServiceRowItem';

interface FaqProps {
  title: string;
  items: any;
}

const Faq = (props: FaqProps) => {
  const { title, items } = props;

  return (
    <List data={items}>
        {({ data }) => (
          <div className={'faq'}>
            <div className="container">
              <div className="row faq__list">

                <div className="col-12 col-md-3">
                  <h3>{title}</h3>
                </div>
                <div className="col-12 col-md-9">
                  {data && data.map((item, i) => (
                    <ServiceRowItem
                      key={i} 
                      title={item.title} 
                      text={item.text} 
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
      )}
    </List>
  );
};

export default Faq;
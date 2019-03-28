import React from 'react';

import List from '../List';
import getImageUrl from '@source/helpers/getImageUrl';
import GalleryItem from './components/GalleryItem';

export interface PhotoGalleryState {
  showMore: boolean;
  imageUrls: Array<string>;
}

interface Image {
  img: LooseObject;
}

export interface PhotoGalleryProps {
  data: {
    title: string;
    description: string;
    divider: boolean;
    images: Image[];
  };
}

class PhotoGallery extends React.Component<PhotoGalleryProps, PhotoGalleryState> {
  constructor(props: PhotoGalleryProps) {
    super(props);

    this.state = {
      showMore: false,
      imageUrls: this.getImageUrls()
    };
  }

  getImageUrls = () => {
    const { images } = this.props.data;
    if (!images) { return; }
    
    let result = [];
    
    images.map((item, i) => {
      result[i] = getImageUrl(item.img);
    });

    return result;
  }

  public render () {
    const { title, description, divider, images } = this.props.data;

    console.log(this.state.imageUrls);
    
    return (
      <List data={images}>
        {({ data }) =>  (
          <div className="photoGallery">
            <div className={'container'}>
              {title && <h2>{title}</h2>}
              {description && <h4>{description}</h4>}

              <div className="row">
                {data && data.length < 8 && data.map((item, i) => (
                  <GalleryItem 
                    key={i}
                    image={item.img} 
                    wrapperClasses={'col-6 col-md-3'} 
                  />
                ))}

                {data && data.length >= 8 && data.slice(0, 8).map((item, i) => (
                  <GalleryItem 
                    key={i}
                    image={item.img} 
                    wrapperClasses={'col-6 col-md-3'} 
                  />
                ))}
      
                {this.state.showMore &&  
                  data.slice(8, data.length).map((item, i) => (
                    <GalleryItem 
                      key={data.length + i}
                      image={item.img} 
                      wrapperClasses={'col-6 col-md-3'} 
                    />
                ))}
              </div>

              {data && data.length > 8 && 
                <button 
                  className={'btn'} 
                  onClick={() => this.setState({ showMore: !this.state.showMore })}
                >{this.state.showMore ? 'Show less' : 'Show more'}
                </button>}

              {divider && <div className={'photoGallery__divider'} />}
            </div>
          </div>
        )}
      </List>
    );
  }
}

export default PhotoGallery;
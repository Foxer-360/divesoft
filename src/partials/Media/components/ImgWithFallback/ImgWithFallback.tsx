import * as React from 'react';
import { readEnvVariable } from '../../../../helpers';

export interface ImgWithFallbackProps {
  alt?: string;
  originalSrc?: string;
  baseUrl: string;
  hash: string;
  recommendedSizes: LooseObject;
  originalData: LooseObject;
  className?: string;
  nowrapper?: boolean;
}

class ImgWithFallback extends React.Component<ImgWithFallbackProps> {
  createVariantIfDoesNotExist = () => {
    const { recommendedSizes, originalData } = this.props;

    if (recommendedSizes) {
      fetch(`${readEnvVariable('REACT_APP_MEDIA_LIBRARY_SERVER')}/createDimension`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: originalData.id,
          width: parseInt(recommendedSizes.width, 10),
          height: parseInt(recommendedSizes.height, 10),
        }),
      })
        .then((response) => {
          // this.getSizedUrl();
        })
        .catch(() => {
          console.error('There was an error creating variant');
        });
    }
  };

  getSizedUrl = () => {
    const { recommendedSizes: sizes, originalData, baseUrl, hash, originalSrc } = this.props;

    if (sizes && sizes.width && sizes.height) {
      let filename = originalData.filename.split('.');
      filename[0] = filename[0] + '_' + sizes.width + '_' + sizes.height;
      filename = filename.join('.');
      return baseUrl + originalData.category + hash + '_' + filename;
    }

    return originalSrc;
  };

  handleError = (event: any) => {
    const { originalSrc } = this.props;
    this.createVariantIfDoesNotExist();
    event.target.src = originalSrc;
  };

  render() {
    const { alt, recommendedSizes, originalSrc, className } = this.props;
    const resizable = !originalSrc.includes('.svg');

    if (!this.props.nowrapper) {
      return (
        <div
          className="mediaRatio"
          style={{
            paddingTop: `${
              (parseInt(recommendedSizes ? recommendedSizes.width : 1, 10) /
                parseInt(recommendedSizes ? recommendedSizes.height : 1, 10)) *
              100
            }%`,
          }}
        >
          <img
            alt={alt}
            className={`mediaImage inner ${className || ''}`}
            src={resizable ? this.getSizedUrl() : originalSrc}
            onError={this.handleError}
            onErrorCapture={this.handleError}
            onContextMenu={() => {
              this.createVariantIfDoesNotExist();
            }}
          />
        </div>
      );
    } else {
      return (
        <img
          alt={alt}
          className={`mediaImage inner ${className || ''}`}
          src={resizable ? this.getSizedUrl() : originalSrc}
          onError={this.handleError}
          onErrorCapture={this.handleError}
          onContextMenu={() => {
            this.createVariantIfDoesNotExist();
          }}
        />
      )
    }
  }
}

export default ImgWithFallback;

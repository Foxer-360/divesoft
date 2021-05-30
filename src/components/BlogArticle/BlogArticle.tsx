import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as ReactMarkdown from 'react-markdown/with-html';
import { withRouter, RouteComponentProps } from 'react-router';
const moment = require( 'moment' );

import Media from '../../partials/Media';
import Loader from '../../partials/Loader';

const GET_PAGE = gql`
  query($url: String!) {
    frontend(where: { url: $url }) {
      page {
        tags {
          id
          name
        }
        createdAt
      }
    }
  }
`;

export interface IBlogArticleProps {
  languageCode: string;
  location: LooseObject;
  data: {
    title?: string;
    perex?: string;
    content?: string;
    showTags: boolean;
    showDate: boolean;
    tags?: Array<LooseObject>;
    image?: {
      url: string;
      alt: string;
      hash: string;
      filename: string;
      category: string;
    };
  };
}

class BlogArticle extends React.Component<IBlogArticleProps & RouteComponentProps, any> {
  public render() {
    const {
      data: { image, title, perex, content, showTags, showDate },
      languageCode,
      location,
    } = this.props;

    return (
      <section className={'blogDetail'}>
        {title && (
          <h1>
            {title}
            <span>.</span>
          </h1>
        )}

        <div className={'blogDetail__info'}>

          <Query query={GET_PAGE} variables={{ url: location.pathname }}>
            {(result) => {
              const { data, loading, error } = result;
              if (loading) { return <Loader />; }

              if (error) { return `Error: ${error}`; }
              return (
                <>
                  {showTags ?
                    <div>
                      {(data.frontend &&
                        data.frontend.page.tags &&
                        data.frontend.page.tags.map((tag, index) => <button key={index}>{tag.name}</button>)) ||
                        ''}
                    </div> : '' }

                  {showDate ?
                    <p>
                      {data.frontend &&
                      data.frontend.page.createdAt &&
                      moment(data.frontend.page.createdAt).format('L')}
                    </p> : '' }
                </>
              );
            }}
          </Query>
        </div>

        <div className={'blogDetail__content'}>
          {image && <Media data={image} type={'image'} width={'876'} height={'876'} />}

          <div className={'blogDetail__content__text'}>
            {perex && <ReactMarkdown
              source={perex || ''}
              className={'perex'}
              skipHtml={false}
              escapeHtml={false}
            />}
            {content && <ReactMarkdown
              source={content || ''}
              skipHtml={false}
              escapeHtml={false}
            />}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(BlogArticle);
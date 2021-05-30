import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
// import * as LinesEllipsis from 'react-lines-ellipsis';
import * as ReactMarkdown from 'react-markdown/with-html';
const moment = require( 'moment' );

import { findFirst, findAll } from 'obj-traverse/lib/obj-traverse';

import Link from '../../partials/Link';
import Media from '../../partials/Media';
import Loader from '../../partials/Loader';
import TextSearch from '../TextSearch';
import Filter from './components/Filter';
import Button from '../../partials/Button';

const GET_CONTEXT = gql`
  {
    pageData @client
    languageData @client
  }
`;

const GET_ALL_PAGES = gql`
  query localizedPages($languageId: ID!) {
    pages {
      id
      type {
        id
        name
      }
      tags {
        id
        name
      }
      translations(where: { language: { id: $languageId } }) {
        id
        name
        createdAt
        content
        language {
          id
          code
        }
      }
    }
  }
`;

const GET_PAGE = gql`
  query($pageId: ID!) {
    page(where: { id: $pageId }) {
      id
      tags {
        id
        name
      }
    }
  }
`;

const ComposedQuery = adopt({
  getContext: ({ render }) => <Query query={GET_CONTEXT}>{({ data }) => render(data)}</Query>,
  allPages: ({ render, getContext: { languageData } }) => {
    if (!languageData) {
      return render({ loading: true });
    }

    return (
      <div>
        <Query query={GET_ALL_PAGES} variables={{ languageId: languageData.id }}>
          {data => {
            return render(data);
          }}
        </Query>
      </div>
    );
  },
  currentPage: ({ render, getContext: { pageData } }) => (
    <Query query={GET_PAGE} variables={{ pageId: pageData.id }}>
      {data => {
        return render(data);
      }}
    </Query>
  ),
});

export interface BlogHolderProps {
  languageCode: string;
  location: LooseObject;
  data: {
    primaryTags: any;
    secondaryTags: any;
    buttonLink: LooseObject;
    buttonText: string;
    displayFilters: boolean;
    displayItemDetails: boolean;
    blogLinkUrl: LooseObject;
    title: string;
    numberOfItems: string;
    justPerexesWithTagsOfPage: boolean;
  };
}

interface BlogHolderState {
  filter?: string;
  numberOfItems?: number;
  searchQuery?: string;
}

class BlogHolder extends React.Component<BlogHolderProps, BlogHolderState> {
  timeout = null;

  constructor(props: BlogHolderProps) {
    super(props);

    this.state = {
      filter: '',
      numberOfItems: 0,
      searchQuery: '',
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
  }

  componentWillReceiveProps(props: BlogHolderProps) {
    let newNumberOfItems: number;
    if (props && props.data && props.data.numberOfItems) {
      newNumberOfItems = parseInt(props.data.numberOfItems, 10);
    }

    if (newNumberOfItems !== this.state.numberOfItems) {
      this.setState({
        numberOfItems: newNumberOfItems
      });
    }
  }

  componentDidMount() {
    let defaultNumberOfItems = parseInt(this.props.data.numberOfItems, 10);

    this.setState({
      numberOfItems: defaultNumberOfItems,
    });
  }

  componentWillUnmount() {
    this.setState({
      searchQuery: '',
    });
  }

  onChangeNumberOfItems() {
    let defaultNumberOfItems = parseInt(this.props.data.numberOfItems, 10);

    this.setState({
      numberOfItems: this.state.numberOfItems + defaultNumberOfItems,
    });
  }

  onChangeFilter(filter: string) {
    this.setState({
      filter,
    });
  }

  onChangeSearchQuery(query: string) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => this.setState({ searchQuery: query }), 300);
  }

  displayAllArticles(numberOfAllArticles: number) {
    this.setState({
      numberOfItems: numberOfAllArticles,
    });
  }

  public render() {
    const {
      data: {
        primaryTags,
        secondaryTags,
        title,
        buttonLink,
        buttonText,
        displayFilters,
        justPerexesWithTagsOfPage,
        blogLinkUrl
      },
    } = this.props;

    const { filter, searchQuery } = this.state;

    return (
      <section className={'blogHolder'} id="blog">
        <ComposedQuery>
          {({
            allPages: { data: allPagesData, loading: allPagesLoading, error: allPagesError },
            currentPage: { data: currentPageData, loading: currentPageLoading, error: currentPageError },
            getContext: { languageData, pageData },
          }) => {
            if (allPagesLoading || currentPageLoading || !allPagesData || !languageData) {
              return <Loader />;
            }

            if (allPagesError) {
              return `Error...`;
            }

            const { pages } = allPagesData;
            const { page } = currentPageData;

            const articles = pages
              .filter(p => {
                if (
                  !p.translations.find(
                    t =>
                      t.language.code === languageData.code &&
                      findAll(t.content, 'content', { name: 'BlogArticle' }).length > 0
                  )
                ) {
                  return false;
                }

                if (!(p.translations && p.translations.length > 0)) {
                  return false;
                }

                if (filter && !p.tags.some(t => t.id === filter)) {
                  return false;
                }

                if (pageData && p.translations && p.translations[0].id === pageData.id) {
                  return false;
                }

                // TODO: don't work beacause page === undefined (gql query through language mutation)
                if (
                  justPerexesWithTagsOfPage &&
                  page &&
                  page.tags &&
                  !page.tags.some(currentPageTag => p.tags.some(articleTag => articleTag.id === currentPageTag.id))
                ) {
                  return false;
                }

                if (
                  searchQuery &&
                  !JSON.stringify(p.translations)
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return false;
                }

                return true;
              })
              // SORT ARTICLES BY DATE
              .sort((a, b) => {
                a = a.translations[0].createdAt;
                b = b.translations[0].createdAt;

                return a > b ? -1 : a < b ? 1 : 0;
              });

            let articleGroups = [];

            const numberOfArticlesToDisplay =
              this.state.numberOfItems && this.state.numberOfItems < articles.length
                ? this.state.numberOfItems
                : articles.length;

            for (
              let currentArticleIndex = 0;
              currentArticleIndex < numberOfArticlesToDisplay;
              currentArticleIndex = currentArticleIndex + 2
            ) {
              if (this.isArticleEven(currentArticleIndex)) {
                articleGroups.push(
                  <div key={currentArticleIndex} className={`blogHolder__container blogHolder__container--bigLeft`}>
                    <div className={'blogHolder__container__box blogHolder__container__box--big'}>
                      {this.mapArticleToContent(
                        articles[currentArticleIndex],
                        languageData.code,
                        { width: 375, height: 545 }
                      )}
                    </div>

                    {currentArticleIndex + 1 < numberOfArticlesToDisplay && articles[currentArticleIndex + 1] && (
                      <div className={'blogHolder__container__box blogHolder__container__box--small'}>
                        {articles[currentArticleIndex + 1] &&
                          this.mapArticleToContent(
                            articles[currentArticleIndex + 1],
                            languageData.code,
                            { width: 425, height: 197 })}
                      </div>
                    )}
                  </div>
                );
              }

              if (!this.isArticleEven(currentArticleIndex)) {
                articleGroups.push(
                  <div key={currentArticleIndex} className={`blogHolder__container blogHolder__container--bigRight`}>
                    <div className={'blogHolder__container__box blogHolder__container__box--small'}>
                      {this.mapArticleToContent(
                        articles[currentArticleIndex],
                        languageData.code,
                        { width: 425, height: 197 }
                      )}
                    </div>

                    {currentArticleIndex + 1 < numberOfArticlesToDisplay && articles[currentArticleIndex + 1] && (
                      <div className={'blogHolder__container__box blogHolder__container__box--big'}>
                        {this.mapArticleToContent(
                          articles[currentArticleIndex + 1],
                          languageData.code,
                          { width: 375, height: 545 }
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            }

            return (
              <>
                {title && (
                  <ReactMarkdown
                    source={title}
                    renderers={{
                      paragraph: (props: LooseObject) => (
                        <h1>
                          {props.children}
                          <span>.</span>
                        </h1>
                      ),
                    }}
                    skipHtml={false}
                    escapeHtml={false}
                  />
                )}

                <div className={'blogmobileSearch'}>
                  <TextSearch
                    placeholder={
                      languageData.code === 'cs' ?
                      'Vyhledávat v článcích' :
                      'Search articles'
                    }
                    value={this.state.searchQuery}
                    onTextSearchChange={this.onChangeSearchQuery}
                  />
                </div>

                {displayFilters && (
                  <div className={'filtersHolder'}>
                    <Filter
                      tags={primaryTags}
                      filter={filter}
                      type={'primary'}
                      languageCode={languageData.code}
                      onChangeFilter={this.onChangeFilter}

                      searchQuery={searchQuery}
                      onTextSearchChange={this.onChangeSearchQuery}
                    />

                    <Filter
                      tags={secondaryTags}
                      filter={filter}
                      type={'secondary'}
                      languageCode={languageData.code}
                      onChangeFilter={this.onChangeFilter}
                    />
                  </div>
                )}

                <div className={'blogHolder__wrapper'}>
                  {articleGroups.length <= 0 && justPerexesWithTagsOfPage && (
                    <div className="noArticles">
                      {
                        languageData.code === 'cs' ?
                        'Bohužel nebyl nalezen žádný podobný článek.' :
                        'Unfortunately, no similar article was found.'
                      }
                      <p>
                        {
                          languageData.code === 'cs' ?
                          'Více článků naleznete na našem ' :
                          'You can find more articles on our '
                        }
                        <Link {...blogLinkUrl}>
                          {languageData.code === 'cs' ? 'blogu' : 'blog'}
                        </Link>.
                      </p>
                    </div>
                  )}

                  {articleGroups.length <= 0 && !justPerexesWithTagsOfPage && (
                    <div className="noArticles">
                      {
                        languageData.code === 'cs' ?
                        'Bohužel nebyl nalezen žádný článek.' :
                        'Sorry, no article found.'
                      }
                      <p>
                        {
                          languageData.code === 'cs' ?
                          'Více článků naleznete na našem ' :
                          'You can find more articles on our '
                        }
                        <Link {...blogLinkUrl}>
                          {languageData.code === 'cs' ? 'blogu' : 'blog'}
                        </Link>.
                      </p>
                    </div>
                  )}

                  {articleGroups}

                  <div className={'blogHolder__btnHolder'}>
                    {articles.length !== numberOfArticlesToDisplay && (
                      <button className="btn"
                        onClick={() => this.onChangeNumberOfItems()}
                        // onClick={() => this.displayAllArticles(articles.length)}
                      >
                        {languageData.code === 'cs' ? 'více článků' : 'more articles'}
                      </button>
                    )}

                    {buttonLink && buttonLink.url.length > 0 && (
                      <Button url={buttonLink}>{buttonText}</Button>
                    )}
                  </div>
                </div>
              </>
            );
          }}
        </ComposedQuery>
      </section>
    );
  }

  private isArticleEven(currentArticleIndex: number) {
    if (currentArticleIndex === 0) {
      return true;
    }

    return currentArticleIndex && (currentArticleIndex % 2) + 1 === 0;
  }

  private mapArticleToContent(article: LooseObject, languageCode: string, resolution: any) {
    // ! hardoded fallback language
    const content = article.translations.find(t => t.language.code === languageCode || 'cs');

    const tags = article.tags;

    const blogArticleComponentData = findFirst(content.content, 'content', { name: 'BlogArticle' });

    if (blogArticleComponentData) {
      const {
        data: { perex, image, title: name },
      } = findFirst(content.content, 'content', { name: 'BlogArticle' });

      return (
        <>
          <Link pageId={article.id} className="linkOverlay" />

          <div className={'blogHolder__container__box__img'}>
            {image && <Media
                data={image}
                width={`${resolution.width}`}
                height={`${resolution.height}`}
                type={'image'}
            />}
          </div>
          <div className={'blogHolder__container__box__cont'}>
            <h3>{name}</h3>

            {this.props.data.displayItemDetails && (
              <div className={'blogHolderDetails'}>
                <div className="blogHolderDetails__date">{moment(content.createdAt).format('L')}</div>
              </div>
            )}

            {perex && perex.length > 79
                ? <div className="blogHolder__container__box__cont__text">{String(perex).slice(0, 79) + '...'}</div>
                : <div className="blogHolder__container__box__cont__text">{perex}</div>
            }

            <Link pageId={article.id}>
              {languageCode === 'cs' ? 'Zobrazit článek' : 'Read article'}
            </Link>
          </div>
        </>
      );
    }
    return <div />;
  }
}

export default BlogHolder;

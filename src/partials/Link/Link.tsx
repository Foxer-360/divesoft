import * as React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../Loader';
import { adopt } from 'react-adopt';

const isExternalLink = url => {
  const pattern = /^https?|^www|^mailto:|^tel:|^sms:|^call:|(^#$)/gi;
  return pattern.test(url);
};

const GET_CONTEXT = gql`
  {
    languageData @client
    websiteData @client
  }
`;

const ComposedQuery = adopt({
  context: ({ render }) => <Query query={GET_CONTEXT}>{({ data }) => render(data)}</Query>,
  getPagesUrls: ({ render, context: { languageData, websiteData } }) => {
    if (!(languageData && websiteData)) {
      return render({ loading: true });
    }
    return (
      <Query query={GET_PAGES_URLS} variables={{ language: languageData.id, websiteId: websiteData.id }}>
        {data => {
          return render(data);
        }}
      </Query>
    );
  },
});

const GET_PAGES_URLS = gql`
  query pagesUrls($language: ID!, $websiteId: ID!) {
    pagesUrls(where: { language: $language, websiteId: $websiteId }) {
      id
      page
      url
      name
      description
    }
  }
`;

const ComposerLink = props => {
  const { children, urlNewWindow, url, pageId, dynamic, ...args } = props;

  let securedUrl = ''
  if (url && url.includes('http://foxer360-')) {
    securedUrl = url.replace('http://foxer360-', 'https://foxer360-')
  } else {
    securedUrl = url
  }

  return (
    <ComposedQuery>
      {({ getPagesUrls: { loading, error, data } }) => {
        if (loading) {
          return <Loader />;
        }

        if (error) {
          return `Error: ${error}`;
        }
        let pageUrlObj;
        const { pagesUrls } = data;

        if (pagesUrls) {
          pageUrlObj = pagesUrls.find(u => u.page === pageId || u.url === url);
        }
        if (!dynamic && !pageUrlObj && !isExternalLink(securedUrl)) { return ''; }

        if (isExternalLink(securedUrl) || args.forceHtml || urlNewWindow) {
          return (
            <a
              href={(isExternalLink(securedUrl) && securedUrl) || (pageUrlObj && pageUrlObj.url) || '/404'}
              {...args}
              target={urlNewWindow ? '_blank' : ''}
            >
              {children}
            </a>
          );
        } else {
          return (
            <Link to={(dynamic && securedUrl) || (pageUrlObj ? pageUrlObj.url : '/404')} {...args}>
              {children}
            </Link>
          );
        }
      }}
    </ComposedQuery>
  );
};

export default ComposerLink;

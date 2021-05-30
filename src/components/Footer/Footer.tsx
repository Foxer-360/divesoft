import * as React from 'react';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import { Query } from 'react-apollo';

import Link from '../../partials/Link';
import Loader from '../../partials/Loader';
import CookiePopup from './components/CookiePopup';
import TrustBox from './components/TrustBox';

const { Component } = React;

const GET_CONTEXT = gql`
  {
    languageData @client
    pageData @client
    websiteData @client
    languagesData @client
    navigationsData @client
  }
`;

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

const ComposedQuery = adopt({
  context: ({ render }) => <Query query={GET_CONTEXT}>{({ data }) => render(data)}</Query>,
  getPagesUrls: ({ render, context: { languageData, websiteData } }) => {
    if (!(languageData && websiteData)) {
      return render({});
    }
    return (
      <Query query={GET_PAGES_URLS} variables={{ language: languageData.id, websiteId: websiteData.id }}>
        {(data) => {
          return render(data);
        }}
      </Query>
    );
  },
});

export interface FooterProps {
  Helmet: typeof Component;
  data: {
    copyrights: string;
    facebookUrl: LooseObject;
    youtubeUrl: LooseObject;
    instagramUrl: LooseObject;
    contacts: string;
  };
}

export interface FooterState {
  email: string;
  displayThankYou: boolean;
  error: {
    email: boolean;
    emailValid: boolean;
    sending: boolean;
  };
  isTrustBoxLoaded: boolean;
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);

    this.state = {
      email: '',
      displayThankYou: false,
      error: {
        email: false,
        emailValid: false,
        sending: false,
      },
      isTrustBoxLoaded: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isTrustBoxLoaded: true }), 500);
  }

  public render() {
    const { isTrustBoxLoaded } = this.state;
    const { Helmet } = this.props;
    const { copyrights, facebookUrl, youtubeUrl, instagramUrl } = this.props.data;

    return (
      <ComposedQuery>
        {({ getPagesUrls: { _, error, data }, context }) => {
          if (!context.navigationsData || !context.languageData || !context.languagesData || !data || !data.pagesUrls) {
            return <Loader />;
          }

          if (error) {
            return `Error...${error}`;
          }

          const { navigationsData: navigations } = context;

          const transformedNavigations = this.transformNavigationsIntoTree(navigations, data.pagesUrls);

          const firstBottomNav = 'BottomPRODUCTS';

          const firstBottomNavItems =
            transformedNavigations && transformedNavigations[firstBottomNav]
              ? transformedNavigations[firstBottomNav]
              : [];

          const secondBottomNav = 'BottomABOUT';

          const secondBottomNavItems =
            transformedNavigations && transformedNavigations[secondBottomNav]
              ? transformedNavigations[secondBottomNav]
              : [];

          const thirdBottomNav = 'BottomSUPPORT';

          const thirdBottomNavItems =
            transformedNavigations && transformedNavigations[thirdBottomNav]
              ? transformedNavigations[thirdBottomNav]
              : [];

          const fourthBottomNav = 'BottomCONTACTS';

          const fourthBottomNavItems =
            transformedNavigations && transformedNavigations[fourthBottomNav]
              ? transformedNavigations[fourthBottomNav]
              : [];

          return (
            <footer className="footer">
              <Helmet>
                <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" />
              </Helmet>
              <CookiePopup />
              <div className="container">
                <div className="footer__navigation row d-flex justify-content-between align-items-start">
                  <nav className="footer__navigation__item col-12 col-md-6 col-xl">
                    <h6 className="headline">Products</h6>
                    <ul>
                      {firstBottomNavItems &&
                        firstBottomNavItems.map((navItem, i) => (
                          <li key={i}>
                            <Link {...navItem.url}>{navItem.name || navItem.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </nav>
                  <nav className="footer__navigation__item col-12 col-md-6 col-xl">
                    <h6 className="headline">About</h6>
                    <ul>
                      {secondBottomNavItems &&
                        secondBottomNavItems.map((navItem, i) => (
                          <li key={i}>
                            <Link {...navItem.url}>{navItem.name || navItem.title}</Link>
                          </li>
                        ))}
                      <li>
                        <Link url="https://wetnotes.com/">Wetnotes</Link>
                      </li>
                    </ul>
                  </nav>
                  <nav className="footer__navigation__item col-12 col-md-6 col-xl">
                    <h6 className="headline">Support</h6>
                    <ul>
                      {thirdBottomNavItems &&
                        thirdBottomNavItems.map((navItem, i) => (
                          <li key={i}>
                            <Link {...navItem.url}>{navItem.name || navItem.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </nav>
                  <nav className="footer__navigation__item col-12 col-md-6 col-xl">
                    <h6 className="headline">Contacts</h6>
                    <ul>
                      {fourthBottomNavItems &&
                        fourthBottomNavItems.map((navItem, i) => (
                          <li key={i}>
                            <Link {...navItem.url}>{navItem.name || navItem.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </nav>
                </div>
                {isTrustBoxLoaded && (
                  <>
                    <div className="footer__divider" />
                    <TrustBox />
                  </>
                )}
                <div className="footer__divider" />
                <div className="footer__bottom row">
                  <div className="col-12 col-md-6 col-xl">
                    {copyrights && <p className="text-copyright">{copyrights}</p>}
                  </div>
                  <div className="col-12 col-md-6 col-xl">
                    <div className="footer__bottom__social d-flex">
                      <Link {...facebookUrl} className="facebook">
                        <div />
                      </Link>
                      <Link {...youtubeUrl} className="youtube">
                        <div />
                      </Link>
                      <Link {...instagramUrl} className="instagram">
                        <div />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          );
        }}
      </ComposedQuery>
    );
  }

  private transformNavigationsIntoTree(navigation: LooseObject[], urls: LooseObject[]): LooseObject | null {
    const tree = {};

    if (!navigation || navigation.length < 1) {
      return null;
    }

    navigation.forEach((nav: LooseObject) => {
      tree[nav.name] = this.buildNavTree(nav.nodes, null, urls);
    });

    return tree;
  }

  private buildNavTree(nav: LooseObject[], parent: string | null, urls: LooseObject[]): LooseObject[] {
    const res = [] as LooseObject[];

    nav.forEach((node: LooseObject) => {
      if (node.parent === parent) {
        const url = urls.find((u: LooseObject) => u.page === node.page);

        const item = {
          ...node,
          ...url,
        } as LooseObject;

        if (node.page) {
          const children = this.buildNavTree(nav, node.page, urls);
          if (children && children.length > 0) {
            item.children = children;
          }
        }
        if (node.title && node.link) {
          item.url = node.link;
        }

        item.url = {
          url: item.url,
          pageId: item.id,
        };

        res.push(item);
      }
    });

    res.sort((a: LooseObject, b: LooseObject) => a.order - b.order);
    return res;
  }
}

export default Footer;

import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';

import Link from '../../partials/Link';
import Loader from '@source/partials/Loader';
import Button from '@source/partials/Button';

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
  query pagesUrls($language: ID!) {
    pagesUrls(where: { language: $language }) {
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
  getPagesUrls: ({ render, context: { languageData } }) => {
    if (!languageData) {
      return render({});
    }
    return (
      <Query query={GET_PAGES_URLS} variables={{ language: languageData.id }}>
        {data => {
          return render(data);
        }}
      </Query>
    );
  },
});

export interface FooterProps {
  data: {

  };
}

export interface FooterState {}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
  }

  public render() {
    const {} = this.props.data;

    return (
      <ComposedQuery>
        {({ getPagesUrls: { loading, error, data }, context }) => {
          if (
            !context.navigationsData || 
            !context.languageData || 
            !context.languagesData || 
            !data || 
            !data.pagesUrls
          ) {
            return <Loader />;
          }

          if (error) {
            return `Error...${error}`;
          }

          const {
            navigationsData: navigations,
            languageData: { code: languageCode },
          } = context;

          const transformedNavigations = this.transformNavigationsIntoTree(navigations, data.pagesUrls);

          const firstBottomNav = 'firstBottom';

          const firstBottomNavItems =
            transformedNavigations && transformedNavigations[firstBottomNav] ? 
            transformedNavigations[firstBottomNav] : 
            [];

          const secondBottomNav = 'secondBottom';

          const secondBottomNavItems =
            transformedNavigations && transformedNavigations[secondBottomNav] ? 
            transformedNavigations[secondBottomNav] : 
            [];
          
          const thirdBottomNav = 'thirdBottom';

          const thirdBottomNavItems =
            transformedNavigations && transformedNavigations[thirdBottomNav] ? 
            transformedNavigations[thirdBottomNav] : 
            [];
          
          return (
            <div>
              <div style={{paddingTop: 200}} />
              <footer className={'footer'}>
                <div className={'container'}>
                  <div className={'footer__newsletter'}>
                    <h3>Divesoft newsletter</h3>
                    <p>Enter your e-mail to subscribe to our newsletter!</p>
                    <form action="#">
                      <input type="email"/>
                      <button className={'btn'}>OK</button>
                    </form>
                  </div>
                  <div className={'footer__navigation'}>
                    <nav>
                      <ul>
                        {firstBottomNavItems &&
                          firstBottomNavItems.map((navItem, i) => (
                            <li key={i}>
                              <Link url={navItem.url && navItem.url}>
                                {navItem.name || navItem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </nav>
                    <nav>
                      <ul>
                        {secondBottomNavItems &&
                          secondBottomNavItems.map((navItem, i) => (
                            <li key={i}>
                              <Link url={navItem.url && navItem.url}>
                                {navItem.name || navItem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </nav>
                    <nav>
                      <ul>
                        {thirdBottomNavItems &&
                          thirdBottomNavItems.map((navItem, i) => (
                            <li key={i}>
                              <Link url={navItem.url && navItem.url}>
                                {navItem.name || navItem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </nav>
                    <div className={'footer__navigation__contacts'}>
                      <h6>Kontakt</h6>
                      <p>
                        Divesoft, s.r.o.<br/> 
                        Hálkova 2495<br/> 
                        413 01 Roudnice nad Labem<br/><br/>

                        Česká republika<br/> 
                        Tel.: +420 416 857 057<br/> 
                        E-mail: info@divesoft.cz
                      </p>
                    </div>
                  </div>
                  <div className={'footer__bottom'}>
                    <div className={'footer__bottom__social'}>
                      social1
                    </div>
                    <p>Copyright © 2019 Divesoft LLC All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
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
        res.push(item);
      }
    });
    res.sort((a: LooseObject, b: LooseObject) => a.order - b.order);
    return res;
  }
}

export default Footer;
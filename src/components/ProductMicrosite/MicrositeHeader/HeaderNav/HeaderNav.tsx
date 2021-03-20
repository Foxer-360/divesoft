import * as React from 'react';
import Link from '@source/partials/Link';

interface ILink {
  title: string;
  url: string;
}

interface IProps {
  links: ILink[];
}

const HeaderNav = ({ links }: IProps) => {
  return (
    <nav className="productMicrosite__header__nav">
      <ul className="productMicrosite__header__nav__list">
        {links.map(({ title, url }, index) => (
          <li key={`${title}-${url}-${index}`} className="productMicrosite__header__nav__link">
            <Link url={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;

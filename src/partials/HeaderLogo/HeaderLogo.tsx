import * as React from 'react';
import Link from '@source/partials/Link';

interface IProps {
  url: string;
}

const HeaderLogo = ({ url }: IProps) => {
  return (
    <div className="header__logo">
      <Link url={url}>
        <img src="/assets/divesoft/images/logo.svg" alt="logo" />
      </Link>
    </div>
  );
};

export default HeaderLogo;

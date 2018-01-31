import React from 'react';
import { Link } from 'routes';

export default function LogoApp() {
  return (
    <div className="c-logo-app">
      <Link prefetch route="home">
        <a><img src="static/fsci_logo.svg" alt=""/></a>
      </Link>
    </div>
  );
}

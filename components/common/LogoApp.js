import React from 'react';
import { Link } from 'routes';

export default function LogoApp() {
  return (
    <div className="c-logo-app">
      <Link prefetch route="home">
        <a>Financing <br /> Sustainable <br /> Cities</a>
      </Link>
    </div>
  );
}

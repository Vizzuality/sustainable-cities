import React from 'react';
import { Link } from 'routes';
import Layout from 'components/layout/layout';

export default function HomePage() {
  return (
    <Layout title="Home">
      Hi there! Welcome to Sustainable Cities!
      <br />
      <Link route="explore-index">Explore index page</Link>
      <br />
      <Link route="explore-list" params={{ category: 'solutions', subCategory: 'bike-sharing' }}>Explore list page</Link>
      <br />
      <Link route="explore-detail" params={{ category: 'solutions', slug: 'bicimad', id: 1 }}>Explore detail page</Link>
    </Layout>
  );
}

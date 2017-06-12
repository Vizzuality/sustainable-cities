/* eslint-disable */

const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

// EXPLORE
routes.add('explore-index', '/explore/:category?/:subCategory?', 'explore/ExploreIndex');
routes.add('explore-list', '/explore/list/:category/:subCategory', 'explore/ExploreList');
routes.add('explore-detail', '/explore/detail/:category/:slug/:id', 'explore/ExploreDetail');

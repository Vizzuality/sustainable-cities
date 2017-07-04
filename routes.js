/* eslint-disable */

const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

// HOME
routes.add('home', '/', 'homepage/HomepageIndex');

// EXPLORE
routes.add('explore-list', '/explore/list/:category/:subCategory', 'explore/ExploreList');
routes.add('explore-index', '/explore/:category?/:subCategory?', 'explore/ExploreIndex');
routes.add('explore-detail', '/explore-detail/:type/:id', 'explore/ExploreDetail');

// ABOUT
routes.add('about', '/about/:section?', 'about/AboutIndex');

// BUILDER
routes.add('builder', '/builder', 'builder/builderIndex');

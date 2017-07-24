/* eslint-disable */

const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

// HOME
routes.add('home', '/', 'homepage/HomepageIndex');

// EXPLORE
routes.add('explore-index', '/explore/:category?/:subCategory?/:children?', 'explore/ExploreIndex');
routes.add('explore-detail', '/:type/:id', 'explore/ExploreDetail');
routes.add('bme-detail', '/business-model-elements/:id', 'explore/ExploreDetail');
routes.add('solution-detail', '/solutions/:id', 'explore/ExploreDetail');

// ABOUT
routes.add('about', '/about/:section?', 'about/AboutIndex');

// BUILDER
routes.add('builder', '/builder', 'builder/builderIndex');

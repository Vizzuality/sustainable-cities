/* eslint-disable */

const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

// HOME
routes.add('home', '/', 'homepage/HomepageIndex');

// EXPLORE
routes.add('explore-index', '/explore/:category?/:subCategory?/:children?', 'explore/ExploreIndex');
routes.add('bme-detail', '/business-model-elements/:id', 'explore/detail/BmeDetailPage');
routes.add('solution-detail-print', '/solutions/:id/print', 'explore/detail/SolutionDetailPrintPage');
routes.add('solution-detail', '/solutions/:id/:subPage?', 'explore/detail/SolutionDetailPage');
routes.add('city-detail', '/cities/:id/:tab?', 'explore/detail/CityPageDetail');

// ABOUT
routes.add('about', '/about/:section?', 'about/AboutIndex');

// BUILDER
routes.add('builder-project-print', '/builder/:id?/project/print', 'builder/ProjectPrint');
routes.add('builder-project', '/builder/:id?/project', 'builder/Project');
routes.add('builder', '/builder/:id?', 'builder/BuilderIndex');

// PROFILE
routes.add('profile', '/profile', 'profile/ProfileIndex');

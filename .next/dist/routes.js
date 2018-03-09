'use strict';

/* eslint-disable */

var nextRoutes = require('next-routes');
var routes = module.exports = nextRoutes();

// HOME
routes.add('home', '/', 'homepage/HomepageIndex');

// EXPLORE
routes.add('explore-index', '/explore/:category?/:subCategory?/:children?', 'explore/ExploreIndex');
routes.add('bme-detail', '/business-model-elements/:id', 'explore/detail/BmeDetailPage');
routes.add('bme-detail-print', '/business-model-elements/:id/print', 'explore/detail/BmeDetailPrintPage');
routes.add('solution-detail-print', '/solutions/:id/print', 'explore/detail/SolutionDetailPrintPage');
routes.add('solution-detail', '/solutions/:id/:subPage?', 'explore/detail/SolutionDetailPage');
routes.add('city-detail', '/cities/:id/:tab?', 'explore/detail/CityPageDetail');

// ABOUT
routes.add('about', '/about/:section?', 'about/AboutIndex');

// CITY-SUPPORT
routes.add('city-support', '/city-support', 'city-support/CitySupportIndex');

// CITY-SUPPORT
routes.add('events', '/events', 'events/EventsIndex');

// BUILDER
routes.add('builder-project-print', '/builder/:id?/project/print', 'builder/ProjectPrint');
routes.add('builder-project', '/builder/:id?/project', 'builder/Project');
routes.add('builder', '/builder/:id?', 'builder/BuilderIndex');

// PROFILE
routes.add('profile', '/profile', 'profile/ProfileIndex');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJuZXh0Um91dGVzIiwicmVxdWlyZSIsInJvdXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJhZGQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTSxhQUFhLEFBQW5CO0FBQ0EsSUFBTSxTQUFTLE9BQU8sQUFBUCxVQUFpQixBQUFoQzs7QUFFQTtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsUUFBbUIsQUFBbkIsS0FBd0IsQUFBeEI7O0FBRUE7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLGlCQUE0QixBQUE1QixnREFBNEUsQUFBNUU7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLGNBQXlCLEFBQXpCLGdDQUF5RCxBQUF6RDtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsb0JBQStCLEFBQS9CLHNDQUFxRSxBQUFyRTtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgseUJBQW9DLEFBQXBDLHdCQUE0RCxBQUE1RDtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsbUJBQThCLEFBQTlCLDRCQUEwRCxBQUExRDtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsZUFBMEIsQUFBMUIscUJBQStDLEFBQS9DOztBQUVBO0FBQ0EsT0FBTyxBQUFQLElBQVcsQUFBWCxTQUFvQixBQUFwQixvQkFBd0MsQUFBeEM7O0FBRUE7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLGdCQUEyQixBQUEzQixpQkFBNEMsQUFBNUM7O0FBRUE7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLFVBQXFCLEFBQXJCLFdBQWdDLEFBQWhDOztBQUVBO0FBQ0EsT0FBTyxBQUFQLElBQVcsQUFBWCx5QkFBb0MsQUFBcEMsK0JBQW1FLEFBQW5FO0FBQ0EsT0FBTyxBQUFQLElBQVcsQUFBWCxtQkFBOEIsQUFBOUIseUJBQXVELEFBQXZEO0FBQ0EsT0FBTyxBQUFQLElBQVcsQUFBWCxXQUFzQixBQUF0QixpQkFBdUMsQUFBdkM7O0FBRUE7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLFdBQXNCLEFBQXRCLFlBQWtDLEFBQWxDIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==
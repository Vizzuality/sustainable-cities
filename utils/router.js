import { Router } from 'routes';

export default function pushTo(pathname, params) {
  Router.pushRoute(pathname, { ...params });
}

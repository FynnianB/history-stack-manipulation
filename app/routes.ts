import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route('/input', 'routes/input.tsx'),
  route('/result', 'routes/result.tsx'),
  route('/tds', 'routes/tds.tsx'),
] satisfies RouteConfig;

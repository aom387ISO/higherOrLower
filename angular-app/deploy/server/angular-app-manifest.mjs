
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/higherOrLower/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/higherOrLower"
  },
  {
    "renderMode": 2,
    "route": "/higherOrLower/crear-cuenta"
  },
  {
    "renderMode": 2,
    "route": "/higherOrLower/home"
  },
  {
    "renderMode": 2,
    "route": "/higherOrLower/stats"
  },
  {
    "renderMode": 2,
    "route": "/higherOrLower/settings"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16929, hash: 'e7c414048ac06c96f5bae3a0fc0fcdaa04995067caeb2780c1d9f209b86f3aac', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17183, hash: 'ec387dfbb4d63d84a7af933a663a35f9e316614e36d83e505830b7de4eaad9a8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 35071, hash: '2397ae5cd9ddee0a66136065a836432c8d4845e5fa64cc0717d2ba80ce69234a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'crear-cuenta/index.html': {size: 34921, hash: '857479ceedb804bfc41650fb511f5ae7f427ed0d7507c0d4c23011381731c37b', text: () => import('./assets-chunks/crear-cuenta_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 34978, hash: '0afc5249ea286bfc73ee83087d15e204a662ae2f4a77e902b1f4e1d5584f4cff', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 35896, hash: '6bd7d33b82abe7672d3bccde450ca894d9f59ca9d13930c67e2a7db50a83de0e', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'stats/index.html': {size: 34525, hash: '461c6892d1804fc200db340513bed87f96fdd4fefa4c3e11c51d87f4cfba9ebc', text: () => import('./assets-chunks/stats_index_html.mjs').then(m => m.default)},
    'styles-7K3RYA33.css': {size: 960, hash: '2Tudl7lCOsw', text: () => import('./assets-chunks/styles-7K3RYA33_css.mjs').then(m => m.default)}
  },
};

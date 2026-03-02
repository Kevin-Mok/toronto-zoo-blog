const DEFAULT_HOST = process.env.LHCI_HOST ?? '127.0.0.1';
const parsedPort = Number.parseInt(process.env.LHCI_PORT ?? '4273', 10);
const DEFAULT_PORT = Number.isNaN(parsedPort) ? 4273 : parsedPort;
const DEFAULT_BASE_URL = `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;
const DEFAULT_POST_PATH =
  '/blog/2026/3/1/toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026';

function normalizePath(path) {
  if (!path) {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function toAbsoluteUrl(value, baseUrl) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${baseUrl}${normalizePath(value)}`;
}

function resolveUrls(baseUrl) {
  const customUrls = (process.env.LHCI_URLS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (customUrls.length > 0) {
    return customUrls.map((value) => toAbsoluteUrl(value, baseUrl));
  }

  const postPath = normalizePath(process.env.LHCI_POST_PATH ?? DEFAULT_POST_PATH);

  return [`${baseUrl}/`, `${baseUrl}/blog`, `${baseUrl}${postPath}`];
}

const baseUrl = (process.env.LHCI_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');
const urls = resolveUrls(baseUrl);

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: `npm run dev -- --hostname ${DEFAULT_HOST} --port ${DEFAULT_PORT}`,
      startServerReadyPattern: 'ready|listening|started',
      startServerReadyTimeout: 120000,
      url: urls
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        interactive: ['off']
      }
    }
  }
};

/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

const parseTarget = (target: string) => {
  const isHttps = httpsRE.test(target);
  if (/(http|https):\/\/([\w.]+\/?)\S*/.test(target)) {
    return target;
  }
  return isHttps ? `https://${target}` : `http://${target}`;
};

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = [], www: string) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(parseTarget(target || www));

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: parseTarget(target || www),
      changeOrigin: true,
      ws: true,
      // rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}

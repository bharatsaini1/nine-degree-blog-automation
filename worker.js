export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Optional Cloudflare reverse-proxy to remote n8n webhook backend
    if (url.pathname.startsWith('/n8n/') && env.N8N_BACKEND_URL) {
      const backendBase = env.N8N_BACKEND_URL.replace(/\/$/, '');
      const pathSuffix = url.pathname.replace(/^\/n8n/, '');
      const targetUrl = `${backendBase}${pathSuffix}${url.search}`;
      
      const modifiedRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
        redirect: 'follow'
      });
      return fetch(modifiedRequest);
    }

    return env.STATIC_ASSETS.fetch(request);
  }
};

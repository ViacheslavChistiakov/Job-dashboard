// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '', 
    preference: 'system', 
    fallback: 'light', 
  },
  app: {
    head: {
      style: [
        {
          innerHTML: `
            body {
              min-height: 100vh;
              background-color: #f9fafb; /* bg-gray-50 */
              color: #111827;            /* text-gray-900 */
              transition: background-color 200ms, color 200ms;
            }
            html.dark body {
              background-color: #111827; /* bg-gray-900 */
              color: #f3f4f6;            /* text-gray-100 */
            }
          `
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      mockApiPort: import.meta.env.NUXT_PUBLIC_MOCKAPI_PORT,
    },
  },
});

// https://astro.build/config
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/server';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import tailwindcss from '@tailwindcss/vite';
import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';

export default defineConfig({
  // بعداً اینو به دامنه‌ی خودت تغییر بده
  site: 'https://farsi-roadmap.vercel.app',

  redirects: {
    '/devops/devops-engineer': { status: 301, destination: '/devops' },
    '/ai-tutor': { status: 301, destination: '/ai' }
  },

  markdown: {
    shikiConfig: { theme: 'dracula' },
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank',
      rel(element) {
        const href = element.properties.href;
        const whiteListedStarts = [
          '/', '#', 'mailto:',
          'https://github.com/kamranahmedse',
          'https://thenewstack.io',
          'https://kamranahmed.info',
          'https://roadmap.sh'
        ];
        if (whiteListedStarts.some((start) => href.startsWith(start))) return [];
        return 'noopener noreferrer nofollow';
      }
    }]]
  },

  output: 'server',
  adapter: vercel({
    // entrypoint: 'node' // پیش‌فرض
    // اگر لازم شد: entrypoint: 'edge'
  }),

  trailingSlash: 'never',

  integrations: [
    sitemap({ filter: shouldIndexPage, serialize: serializeSitemap }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [/^@roadmapsh\/editor.*$/],
    },
    // allowedHosts فقط برای dev لوکال upstream بود؛ روی Vercel لازم نیست.
  },
});

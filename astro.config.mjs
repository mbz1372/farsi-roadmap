// https://astro.build/config
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://farsi-roadmap.vercel.app', // TODO: replace with your domain
  redirects: {
    '/devops/devops-engineer': { status: 301, destination: '/devops' },
    '/ai-tutor': { status: 301, destination: '/ai' },
  },
  markdown: {
    shikiConfig: { theme: 'dracula' },
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank',
      rel(element) {
        const href = element.properties.href;
        const allow = ['/', '#', 'mailto:',
          'https://github.com/kamranahmedse',
          'https://thenewstack.io',
          'https://kamranahmed.info',
          'https://roadmap.sh'];
        if (allow.some((p) => href?.startsWith?.(p))) return [];
        return 'noopener noreferrer nofollow';
      },
    }]],
  },
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@roadmapsh/editor': '/src/shims/roadmapsh-editor.ts',
      },
    },
  },
});

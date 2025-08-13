// https://astro.build/config
import { defineConfig } from 'astro/config';

// Adapters & Integrations
import vercel from '@astrojs/vercel/server';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Markdown plugins
import rehypeExternalLinks from 'rehype-external-links';

// Tailwind (v4 via Vite plugin)
import tailwindcss from '@tailwindcss/vite';

// Sitemap utils (موجود در پروژه)
import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';

export default defineConfig({
  // دامنه سایت برای ساخت sitemap — فعلاً مقدار پیش‌فرض گذاشتم؛
  // بعد از دیپلوی، اینو به آدرس خودت تغییر بده (مثلاً https://farsi-roadmap.vercel.app).
  site: 'https://farsi-roadmap.vercel.app',

  // ریدایرکت‌هایی که upstream داشت
  redirects: {
    '/devops/devops-engineer': { status: 301, destination: '/devops' },
    '/ai-tutor': { status: 301, destination: '/ai' },
  },

  // Markdown/rehype config
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
          'https://roadmap.sh',
        ];
        if (whiteListedStarts.some((start) => href.startsWith(start))) return [];
        return 'noopener noreferrer nofollow';
      },
    }]],
  },

  // خروجی سروری برای سازگاری با Vercel Functions
  output: 'server',
  adapter: vercel({
    // برای شروع روی Node functions بمونیم (پایدارتر)
    // entrypoint: 'node',
    // اگر لازم شد Edge: entrypoint: 'edge'
  }),

  trailingSlash: 'never',

  integrations: [
    sitemap({ filter: shouldIndexPage, serialize: serializeSitemap }),
    react(),
  ],

  // ⚠️ قبلاً دو بار vite تنظیم شده بود و بلاک اول overwrite می‌شد.
  // این نسخه «تک بلاک» و تمیزه.
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // لازم برای پکیج workspace editor
      noExternal: [/^@roadmapsh\/editor.*$/],
    },
    // allowedHosts برای dev لازم نیست؛ روی Vercel هم نیازی نداریم
  },
});

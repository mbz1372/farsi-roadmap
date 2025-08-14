# Patch: Astro → Vercel + FA skeleton

این بسته فقط فایل‌های لازم برای بالا آوردن روی Vercel و شروع فارسی‌سازی را شامل می‌شود.

## اعمال سریع
1) محتویات این زیپ را روی ریشه پروژه‌ات کپی و جایگزین کن.
2) اگر در سورس ایمپورتی از `@roadmapsh/editor` وجود داشت، همین شیم آن را پوشش می‌دهد.
3) لوکال تست:
   pnpm i
   pnpm run build
   pnpm run dev
4) دیپلوی:
   - اگر Vercel گیر داد: Install Command → `pnpm install --no-frozen-lockfile`

## افزودن سوییچر زبان در هدر
```astro
---
import LanguageSwitch from '../components/LanguageSwitch.astro';
---
<header class="...">
  <LanguageSwitch />
</header>
```

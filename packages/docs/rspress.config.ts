import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';
import path from 'node:path';

export default defineConfig({
  logo: '/logo.png',
  logoText: 'SC 业务组件模板库',
  root: 'docs',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/shine-button' },
      { text: 'Hooks', link: '/hooks/use-counter' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '安装说明', link: '/guide/installation' },
          ],
        },
      ],
      '/components/': [
        {
          text: '业务组件',
          items: [
            { text: 'ShineButton', link: '/components/shine-button' },
          ],
        },
      ],
      '/hooks/': [
        {
          text: '自定义 Hooks',
          items: [{ text: 'useCounter', link: '/hooks/use-counter' }],
        },
      ],
    },
    socialLinks: [
      { 
        icon: 'github', 
        mode: 'link', 
        content: 'https://github.com/SpriteNice/sc-biz-components' 
      },
    ],
  },
  plugins: [pluginPreview()],
  builderConfig: {
    resolve: {
      alias: {
        '@components': path.join(__dirname, '../cli/components'),
        '@hooks': path.join(__dirname, '../cli/components/hooks'),
      },
    },
  },
});

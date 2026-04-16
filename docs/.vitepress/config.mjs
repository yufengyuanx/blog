import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: "Frank's Blog",
  description: "AI 工程、技能工作流与技术调研",
  base: '/blog/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'Frank Yuan 的博客：Skills、Research、Notes' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['link', { rel: 'sitemap', href: '/blog/sitemap.xml' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Skills', link: '/tech/series/100-skills', activeMatch: '/tech/series/' },
      { text: 'Research', link: '/research/', activeMatch: '/research/' },
      { text: 'Notes', link: '/tech/', activeMatch: '/tech/' },
      { text: 'Archive', link: '/archive' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      '/tech/': [
        {
          text: 'Skills',
          collapsed: false,
          items: [
            { text: '100 个 Skills 系列', link: '/tech/series/100-skills' },
            { text: '第 16 期：do', link: '/tech/100-skills-16-do' },
            { text: '第 15 期：cron', link: '/tech/100-skills-15-cron' },
            { text: '第 14 期：weather', link: '/tech/100-skills-14-weather' },
          ],
        },
        {
          text: 'Notes',
          collapsed: false,
          items: [
            { text: 'Notes 首页', link: '/tech/' },
            { text: 'AI/LLM', link: '/tech/categories/ai-llm' },
            { text: 'Java', link: '/tech/categories/java' },
            { text: 'Python', link: '/tech/categories/python' },
            { text: 'AI/LLM 笔记', link: '/tech/ai-llm' },
            { text: 'Java 笔记', link: '/tech/java-notes' },
            { text: 'Python 技巧', link: '/tech/python-tips' },
          ],
        },
      ],
      '/research/': [
        {
          text: 'Research',
          collapsed: false,
          items: [
            { text: 'Research 首页', link: '/research/' },
            { text: 'GitHub Spec Kit 技术分析', link: '/research/spec-kit-sdd-analysis' },
            { text: 'OpenClaw 多智能体协作', link: '/research/openclaw-multi-agent-collaboration' },
            { text: 'Claude Code Auto-Dream', link: '/research/claude-code-auto-dream' },
          ],
        },
      ],
      '/life/': [
        {
          text: 'Life',
          collapsed: false,
          items: [
            { text: '生活首页', link: '/life/' },
            { text: '每日随记', link: '/life/daily' },
            { text: '阅读', link: '/life/reading' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yufengyuanx' },
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Frank Yuan',
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文章'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/yufengyuanx/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    returnToTop: {
      label: '返回顶部'
    },

    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  mermaid: {
    theme: {
      light: 'default',
      dark: 'dark'
    },
    securityLevel: 'loose',
    startOnLoad: true
  },
}))

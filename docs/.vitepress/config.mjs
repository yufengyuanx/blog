import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: "Frank's Blog",
  description: "技术学习笔记与生活记录",
  base: '/blog/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: '技术学习笔记与生活记录 - Frank Yuan 的个人博客' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['link', { rel: 'sitemap', href: '/blog/sitemap.xml' }],
  ],
  
  themeConfig: {
    // 顶部导航栏
    nav: [
      { text: '🏠 首页', link: '/' },
      { 
        text: '📝 技术笔记', 
        link: '/tech/',
        activeMatch: '/tech/'
      },
      { 
        text: '🔬 技术调研', 
        link: '/research/',
        activeMatch: '/research/'
      },
      { 
        text: '🎯 100 个 Skills', 
        link: '/tech/series/100-skills',
        activeMatch: '/tech/series/'
      },
      { 
        text: '🗂️ 更多', 
        items: [
          { text: '📅 文章归档', link: '/archive' },
        ]
      },
      { text: '👤 关于我', link: '/about' },
    ],

    // 侧边栏配置
    sidebar: {
      '/tech/': [
        {
          text: '📚 系列专栏',
          collapsed: false,
          items: [
            { text: '🎯 100 个 Skills', link: '/tech/series/100-skills' },
          ],
        },
        {
          text: '💻 技术分类',
          collapsed: true,
          items: [
            { text: '📋 全部文章', link: '/tech/' },
            { text: '☕ Java 心得', link: '/tech/categories/java' },
            { text: '🐍 Python 技巧', link: '/tech/categories/python' },
            { text: '🤖 AI/LLM 探索', link: '/tech/categories/ai-llm' },
          ],
        },
        {
          text: '📝 最新文章',
          collapsed: false,
          items: [
            { text: '第 2 期：Summarize', link: '/tech/100-skills-02-summarize' },
            { text: '第 1 期：Skill Vetter', link: '/tech/100-skills-01-skill-vetter' },
          ],
        },
      ],
      '/research/': [
        {
          text: '技术调研',
          items: [
            { text: '📋 全部文章', link: '/research/' },
            { text: 'OpenClaw 多智能体协作', link: '/research/openclaw-multi-agent-collaboration' },
          ],
        },
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yufengyuanx' },
    ],

    // 页脚
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Frank Yuan',
    },

    // 搜索配置
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

    // 文档编辑链接
    editLink: {
      pattern: 'https://github.com/yufengyuanx/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 上一篇/下一篇
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 大纲
    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    // 返回顶部
    returnToTop: {
      label: '返回顶部'
    },

    // 深色模式
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
  },
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },
  
  // Mermaid 配置
  mermaid: {
    theme: {
      light: 'default',
      dark: 'dark'
    },
    securityLevel: 'loose',
    startOnLoad: true
  },
}))

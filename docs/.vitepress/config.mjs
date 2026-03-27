import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: "Frank's Blog",
  description: "技术学习笔记与生活记录",
  base: '/blog/',
  
  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '技术笔记', link: '/tech/' },
      { text: '技术调研', link: '/research/' },
      { text: '生活随笔', link: '/life/' },
      { text: '关于我', link: '/about' },
    ],

    // 侧边栏
    sidebar: {
      '/tech/': [
        {
          text: '技术笔记',
          items: [
            { text: 'Java 心得', link: '/tech/java-notes' },
            { text: 'Python 技巧', link: '/tech/python-tips' },
            { text: 'AI/LLM 探索', link: '/tech/ai-llm' },
          ],
        },
      ],
      '/research/': [
        {
          text: '技术调研',
          items: [
            { text: 'Claude Code Auto-Dream', link: '/research/claude-code-auto-dream' },
            { text: 'OpenClaw 多智能体协作', link: '/research/openclaw-multi-agent-collaboration' },
          ],
        },
      ],
      '/life/': [
        {
          text: '生活随笔',
          items: [
            { text: '读书感悟', link: '/life/reading' },
            { text: '日常记录', link: '/life/daily' },
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

    // 搜索
    search: {
      provider: 'local',
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

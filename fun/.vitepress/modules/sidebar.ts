export const sidebar = {
  '/linux/': [
    {
      text: 'linux',
      collapsed: true,
      items: [
        { text: 'linuxCommands', link: '/linux/linuxCommands.md' },
        { text: 'vscode相关命令', link: '/linux/vscode相关命令.md' },
        { text: 'go linux相关操作', link: '/linux/golinux相关操作.md' },
        { text: 'Git相关命令操作', link: '/linux/Git相关命令操作.md' },
        { text: 'archlinux应用', link: '/linux/archlinuxApp.md' },
        { text: 'linux基础', link: '/linux/LinuxFundamentals.md' },
        { text: 'linux加强', link: '/linux/LinuxPro.md' },
        { text: 'linux shells', link: '/linux/LinuxShell.md' },
      ]
    }
  ],
  '/windows/': [
    {
      text: 'windows',
      collapsed: true,
      items: [
        { text: 'windows常用命令', link: '/windows/WindowsCommand.md' },
        { text: 'windows基础', link: '/windows/WindowsFundamentals.md' },
      ]
    }
  ],
  '/tools/': [
    {
      text: 'tools',
      items: [
        { text: '🔑 密码与ID生成器', link: '/tools/generator.md' },
        { text: '📍 Bookmarklet', link: '/tools/Bookmarklet.md' },
      ]
    }
  ]
}
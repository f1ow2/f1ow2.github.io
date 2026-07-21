export const nav = [
  { text: 'Home', link: '/' },
  {
    text: 'cyber',
    items: [
      {
        items: [
          { text: 'Web', link: '/cyber/web.md' },
          { text: 'network', link: '/cyber/network.md' },
          { text: 'networkpro', link: '/cyber/networkpro.md' },
        ]
      },
      {
        items: [
          { text: 'webapp', link: '/cyber/WebApplication.md' },
          { text: 'Authentication', link: '/webapp/Authentication.md' },
          { text: 'Injection Attacks', link: '/webapp/InjectionAttacks.md' },
          { text: 'Advanced Server-Side Attacks', link: '/webapp/ServerSideAttacks.md' },
          { text: 'Advanced Client-Side Attacks', link: '/webapp/ClientSideAttacks.md' },
          { text: 'HTTP Request Smuggling', link: '/webapp/HTTPRequestSmuggling.md' },
        ]
      },
    ]
  },
  {
    text: 'security',
    items: [
      {
        items: [
          { text: 'Tools', link: '/cyber/tool.md' },
          { text: 'wireshark', link: '/security/wireshark.md' },
          { text: 'tcpdump', link: '/security/tcpdump.md' },
          { text: 'burpSuite', link: '/security/BurpSuite.md' },
          { text: 'metasploit', link: '/security/Metasploit.md' },
          { text: 'bruteforcingtools', link: '/security/bruteforcingtools.md' },
          { text: 'offensivetools', link: '/security/offensivetools.md' },
          { text: 'defensivetools', link: '/security/defensivetools.md' },
        ]
      },
      {
        items: [
          { text: 'Crypto', link: '/crypto/cryptography.md' },
          { text: 'cipher', link: '/crypto/cipher.md' },
          { text: 'john the Ripper', link: '/crypto/john.md' },
        ]
      },
    ]
  },
  {
    text: 'with',
    items: [
      {
        items: [
          { text: 'Skills', link: '/cyber/skills.md' },
          { text: 'shells', link: '/cyber/shells.md' },
          { text: 'web pentesting', link: '/security/webpentesting.md' },
          { text: 'network security', link: '/cyber/networksecurity.md' },
          { text: 'vulnerability research', link: '/security/vulnerabilityResearch.md' },
          {
            text: 'privilege escalation', link: '/security/privilegeEscalation.md'
          }
        ]
      },
      {
        items: [
          { text: 'Red', link: '/Red/Red.md' },
          { text: 'Initial Access', link: '/Red/InitialAccess.md' },
          { text: 'Post Compromise', link: '/Red/PostCompromise.md' },
          { text: 'Host Evasions', link: '/Red/HostEvasions.md' },
          { text: 'Network Security Evasion', link: '/Red/NetworkSecurityEvasion.md' },
          { text: 'Compromising Active Directory', link: '/Red/CompromisingActiveDirectory.md' },
        ]
      },
    ]
  },
  {
    text: 'linux',
    items: [
      {
        items: [
          { text: 'commands', link: '/linux/linuxCommands.md' },
          { text: 'kali', link: '/linux/kali.md' },
          { text: 'shells', link: '/linux/LinuxShell.md' },
          { text: 'arch', link: '/linux/archlinuxApp.md' },
          { text: 'docker', link: '/linux/docker.md' },
          { text: 'encoding', link: '/linux/encoding.md' },
        ]
      },
      {
        items: [
          { text: 'IP protocol', link: '/web/IPProtocol.md' },
          { text: 'TCP protocol', link: '/web/TCPProtocol.md' },
          { text: 'TLS/SSL protocol', link: '/web/TLSProtocol.md' },
          { text: 'HTTP protocol', link: '/web/HTTPProtocol.md' },
          { text: 'WebSocket protocol', link: '/web/WebSocketProtocol.md' },
          { text: 'HTTP/2 protocol', link: '/web/HTTP2Protocol.md' },
        ]
      }
    ]
  },
  {
    text: 'SRC',
    items: [
      {
        items: [
          { text: 'SRC', link: '/srcdiary/srcskills.md' },
          { text: 'tips', link: '/srcdiary/tips.md' },
          { text: 'python security', link: '/srcdiary/python4sec.md' },
          { text: 'Web Security', link: '/srcdiary/websecurity.md' },
          { text: 'server side', link: '/srcdiary/ServerSide.md' },
          { text: 'client side', link: '/srcdiary/ClientSide.md' },
          { text: 'advanced', link: '/srcdiary/Advanced.md' },
          { text: 'Web LLM', link: '/srcdiary/WebLLM.md' },
          { text: 'privilege escalation', link: '/srcdiary/SRCPE.md' },
        ]
      },
      {
        items: [
          { text: 'CVE', link: '/vuln/cve.md' },
          { text: 'CSRF', link: '/vuln/CSRF.md' },
          { text: 'XSS', link: '/vuln/XSS.md' },
          { text: 'RCE', link: '/vuln/RCE.md' },
          { text: 'File Vuln', link: '/vuln/FileVuln.md' },
          { text: 'Sql Inject', link: '/vuln/SqlInject.md' },
          { text: 'Over Permission', link: '/vuln/OverPermission.md' },
        ]
      },
    ]
  },

  {
    component: 'MusicPlayer',
    // 可选的 props 传递给组件
    props: {
      title: 'MusicPlayer'
    }
  },
]
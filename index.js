/* global cumcord */

const manifest = {
  name: 'Discord',
  short_name: 'Discord',
  start_url: 'https://discord.com/channels/@me', // URL when PWA launches
  display: 'fullscreen',
  display_override: ['window-controls-overlay'],
  lang: 'en-US',
  background_color: '#202225',
  theme_color: '#202225',
  scope: 'https://discord.com', // scope of all possible URL's
  description: 'Imagine a place...',
  orientation: 'landscape',
  icons: [
    {
      src: document.querySelector('link[rel="icon"]').href, // lazy
      sizes: '256x256',
      type: 'image/png'
    }
  ]
}

const platform = (() => {
  if (navigator.userAgent.includes('Windows')) return 'WINDOWS'
  if (navigator.userAgent.includes('Mac')) return 'OSX'
  if (navigator.userAgent.includes('Linux')) return 'LINUX'
})()

const url = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: 'application/json' }))

export default {
  onLoad () {
    this.manifest = document.createElement('link')
    this.manifest.rel = 'manifest'
    this.manifest.href = url
    document.head.prepend(this.manifest) // prepend because append gets overwritten
    const titlebar = cumcord.modules.webpack.find(m => m?.default?.toString?.()?.includes('case m.PlatformTypes.WINDOWS'))
    this.unpatch = cumcord.patcher.before('default', titlebar, args => {
      if (args[0].type !== 'WEB') { // only patch on web
        this.onUnload()
        return args[0]
      }
      args[0].type = platform
      return args[0]
    })
    this.styles = cumcord.patcher.injectCSS(`
    .sidebar-1tnWFu {
      border-radius: 8px 0 0;
      overflow: hidden;
    }`)
  },
  onUnload () {
    this.unpatch?.()
    this.styles?.()
    this.manifest?.remove()
  }
}

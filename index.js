/* global cumcord */

export default {
  onLoad () {
    this.platform = this.getPlatform()
    console.log(this.platform)
    const titlebar = cumcord.modules.webpack.find(m => m?.default?.toString?.()?.includes('case m.PlatformTypes.WINDOWS'))
    console.log({ titlebar })
    this.unpatch = cumcord.patcher.before('default', titlebar, args => {
      console.log({ args })
      if (args[0].type !== 'WEB') {
        this.onUnload()
        return args[0]
      }
      console.log('patching')
      args[0].type = this.platform
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
  },
  getPlatform () {
    if (navigator.userAgent.includes('Windows')) return 'WINDOWS'
    if (navigator.userAgent.includes('Mac')) return 'OSX'
    if (navigator.userAgent.includes('Linux')) return 'LINUX'
  }
}

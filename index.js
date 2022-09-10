/* global cumcord */

export default {
  onLoad () {
    this.platform = this.getPlatform()
    const titlebar = cumcord.modules.webpack.find(m => m?.default?.toString?.()?.includes('case m.PlatformTypes.WINDOWS'))
    this.unpatch = cumcord.patcher.before('default', titlebar, (...args) => {
      if (args[0].type !== 'WEB') {
        this.onUnload()
        return args[0]
      }
      args[0].type = this.platform
      return args[0]
    })
  },
  onUnload () {
    this.unpatch?.()
    this.manifest?.remove()
  },
  getPlatform () {
    if (navigator.userAgent.includes('Windows')) return 'WINDOWS'
    if (navigator.userAgent.includes('Mac')) return 'OSX'
    if (navigator.userAgent.includes('Linux')) return 'LINUX'
  }
}

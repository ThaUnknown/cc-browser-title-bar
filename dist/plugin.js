(function(){"use strict";var n={onLoad(){this.platform=this.getPlatform(),console.log(this.platform);const e=cumcord.modules.webpack.find(t=>t?.default?.toString?.()?.includes("case m.PlatformTypes.WINDOWS"));console.log({titlebar:e}),this.unpatch=cumcord.patcher.before("default",e,t=>(console.log({args:t}),t[0].type!=="WEB"?(this.onUnload(),t[0]):(console.log("patching"),t[0].type=this.platform,t[0]))),this.styles=cumcord.patcher.injectCSS(`
    .sidebar-1tnWFu {
      border-radius: 8px 0 0;
      overflow: hidden;
    }`)},onUnload(){this.unpatch?.(),this.styles?.(),this.manifest?.remove()},getPlatform(){if(navigator.userAgent.includes("Windows"))return"WINDOWS";if(navigator.userAgent.includes("Mac"))return"OSX";if(navigator.userAgent.includes("Linux"))return"LINUX"}};return n})();

// 龙猫云 (TotoroCloud) - 2026 全平台客户端指南数据库
// 涵盖 Windows, Android, iOS, macOS, Linux, OpenWrt 软路由六大平台

export interface ProxyClient {
  id: string;
  name: string;
  platforms: ("windows" | "android" | "ios" | "macos" | "linux" | "openwrt")[];
  core: string;
  tagline: string;
  pros: string[];
  recommendedFor: string;
  downloadUrl: string;
  sourceType: "GitHub" | "App Store" | "Official";
  featured: boolean;
}

export const PROXY_CLIENTS: ProxyClient[] = [
  {
    id: "clash-verge-rev",
    name: "Clash Verge Rev",
    platforms: ["windows", "macos", "linux"],
    core: "Mihomo (Clash Meta)",
    tagline: "当前桌面端最强全能代理工具，内置中文、TUN模式分流与智能策略组",
    pros: [
      "原生内置中文界面",
      "一键接管系统流量的 TUN 虚拟网卡模式",
      "订阅批量测速与规则覆写脚本支持",
    ],
    recommendedFor:
      "Windows / macOS / Linux 桌面端首选主力客户端，适合新手及深度折腾用户",
    downloadUrl: "https://github.com/clash-verge-rev/clash-verge-rev/releases",
    sourceType: "GitHub",
    featured: true,
  },
  {
    id: "v2rayn",
    name: "v2rayN",
    platforms: ["windows", "macos", "linux"],
    core: "Xray / sing-box / Mihomo",
    tagline:
      "老牌经典多协议聚合神器，完美支持 VLESS, Shadowsocks, Trojan 与 Hysteria 2",
    pros: [
      "多核心自由切换",
      "节点批量 Ping / 真连接延迟测速",
      "无复杂依赖，资源占用极低",
    ],
    recommendedFor: "Windows 极客用户、需要精确协议配置与批量节点管理的人群",
    downloadUrl: "https://github.com/2dust/v2rayN/releases",
    sourceType: "GitHub",
    featured: true,
  },
  {
    id: "shadowrocket",
    name: "Shadowrocket (小火箭)",
    platforms: ["ios"],
    core: "自研规则核心",
    tagline:
      "iOS 用户普及率最高的入门神器，扫码即导、规则分流、节点测速极速响应",
    pros: [
      "App Store 一次性购买永久使用",
      "扫描二维码一秒导入全量订阅",
      "支持策略组、场景模式与去广告规则",
    ],
    recommendedFor: "iPhone / iPad 用户首选必备工具，兼具轻量省电与多协议支持",
    downloadUrl: "https://apps.apple.com/us/app/shadowrocket/id932747118",
    sourceType: "App Store",
    featured: true,
  },
  {
    id: "v2rayng",
    name: "v2rayNG",
    platforms: ["android"],
    core: "Xray-core",
    tagline: "安卓平台最稳定轻便的代理工具，原生支持分应用代理与订阅自动更新",
    pros: [
      "分应用代理精确绕过国内银行金融类 App",
      "支持 VLESS / VMess / Shadowsocks",
      "体积小巧无后台唤醒耗电",
    ],
    recommendedFor: "Android 手机与平板用户，轻量级日常翻墙首选",
    downloadUrl: "https://github.com/2dust/v2rayNG/releases",
    sourceType: "GitHub",
    featured: true,
  },
  {
    id: "flclash",
    name: "FlClash",
    platforms: ["windows", "android", "macos", "linux"],
    core: "Mihomo",
    tagline: "基于 Flutter 开发的高颜值现代跨平台客户端，全系统统一优雅交互",
    pros: [
      "Material You 现代化拟物设计",
      "多端操作体验完全一致",
      "智能路由与节点多维筛选",
    ],
    recommendedFor: "注重 UI 视觉审美、追求跨设备无缝统一操作体验的用户",
    downloadUrl: "https://github.com/chen08209/FlClash/releases",
    sourceType: "GitHub",
    featured: false,
  },
  {
    id: "stash",
    name: "Stash",
    platforms: ["ios", "macos"],
    core: "Clash Premium / Meta",
    tagline:
      "iOS / macOS 上最纯正的 Clash 体系体验，支持覆写、策略组与高级分流",
    pros: [
      "完美解析所有标准 Clash YAML 配置",
      "支持 iCloud 跨设备自动同步规则",
      "提供极其细致的仪表盘监控",
    ],
    recommendedFor: "习惯 Clash 规则体系的 Apple 全家桶重度用户",
    downloadUrl: "https://apps.apple.com/us/app/stash/id1596063349",
    sourceType: "App Store",
    featured: false,
  },
  {
    id: "openclash",
    name: "OpenClash",
    platforms: ["openwrt"],
    core: "Mihomo / Clash",
    tagline:
      "软路由与家庭网关的首选分流插件，全屋设备自动透明代理与防 DNS 污染",
    pros: [
      "全屋 TV、手机、游戏主机自动走专线",
      "强大的 Fake-IP 与流媒体分流矩阵",
      "支持软路由多核心与规则定制",
    ],
    recommendedFor:
      "家庭透明代理、软路由网关用户与 Apple TV / Switch / PS5 玩家",
    downloadUrl: "https://github.com/vernesong/OpenClash/releases",
    sourceType: "GitHub",
    featured: true,
  },
  {
    id: "hiddify",
    name: "Hiddify Next",
    platforms: ["windows", "android", "ios", "macos", "linux"],
    core: "sing-box",
    tagline: "基于 sing-box 开发的多协议无障碍连接器，零配置门槛直接使用",
    pros: [
      "多国语言开箱即用",
      "自动测试延迟与最优节点路由",
      "原生支持 sing-box 1.10+ 高级特性",
    ],
    recommendedFor: "全平台新手小白用户，无需研究规则配置一键起飞",
    downloadUrl: "https://github.com/hiddify/hiddify-next/releases",
    sourceType: "GitHub",
    featured: false,
  },
];

export const PLATFORM_NAMES: Record<string, string> = {
  windows: "Windows 电脑",
  android: "Android 安卓手机",
  ios: "iPhone / iPad (iOS)",
  macos: "macOS 苹果电脑",
  linux: "Linux 桌面与服务器",
  openwrt: "OpenWrt 软路由网关",
};

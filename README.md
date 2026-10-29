# 🚀 龙猫云 · TotoroCloud.run

<p align="center">
  <img src="public/favicon-48.png" alt="TotoroCloud Logo" width="80" height="80" style="border-radius: 20%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</p>

<h3 align="center">下一代全球跨境网络加速、专线节点遥测与机场评测情报站</h3>

<p align="center">
  基于 <b>Astro 5 + Vue 3 + Tailwind CSS</b> 深度打造的高性能、企业级 SSG 静态内容矩阵系统。<br/>
  融合极致技术 SEO、GEO（生成式 AI 引擎优化）与全自动化全球网络性能观测台。
</p>

<p align="center">
  <a href="https://totorocloud.run"><img src="https://img.shields.io/badge/Official%20Site-totorocloud.run-3b82f6?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Official Website" /></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Framework-Astro%205-ff5d01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro 5" /></a>
  <a href="https://vuejs.org"><img src="https://img.shields.io/badge/Islands-Vue%203-42b883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/CSS-Tailwind%20v4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Language-TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" /></a>
</p>

---

## 🌟 核心特色与架构优势 (Key Features)

### 🏢 42 家精选专线机场独立数据库 (`/brands/`)
- 包含起步门槛、专线架构（IEPL / IPLC / BGP Anycast）、晚高峰测速、流媒体解锁（Netflix / Disney+ / YouTube 8K / ChatGPT）全维度多维测评。
- 具备交互式多维度实时筛选器（按入口城市、专线协议、解锁能力、价格区间即时过滤）。
- 42 篇深度专业测评博客与技术白皮书，彻底告别模板化内容。

### 📡 全球网络遥测观测站 (`/observatory/`)
- 晚高峰丢包与时延监控、POP 节点实时连通率跟踪。
- 全主流 AI 模型（OpenAI Sora/Canvas、Claude 3.5 Sonnet、Google Gemini、Cursor）网络连通性健康看板。
- 多地区（香港、日本、新加坡、美西、德国等）多运营商 SLA 综合健康指数。

### ⚡ 7 大技术专栏与内容枢纽矩阵
- **🚀 机场推荐 (`/jichang/`)**：2026 年度梯子选购决策、专线防封锁机制与避坑防跑路指南。
- **🛡️ VPN 评测 (`/vpn/`)**：商业机场与国际商业 VPN（ExpressVPN / Surfshark）协议与安全审计对比。
- **⚡ Clash 配置 (`/clash/`)**：Clash Verge Rev、Clash Nyanpasu、Mihomo 内核与 TUN 虚拟网卡实战配置。
- **🌐 全球节点 (`/nodes/`)**：原生住宅 IP、BGP 跨境出口、低延迟专线拓扑解析。
- **🪜 稳定梯子 (`/tizi/`)**：多协议备用容灾方案、外贸与出海业务跨境网络容灾策略。
- **🎁 免费资源 (`/free/` & `/resources/`)**：万字级免费学术检索、全球开源工具与外网知识导航。
- **📚 使用教程 (`/tutorial/`)**：全平台客户端（Windows / macOS / iOS / Android / Linux）新手到高阶配置手册。

### 🔍 顶尖技术 SEO 与 GEO（生成式引擎优化）工程
- **Answer-First 语义布局**：文章顶部专为 Google AI Overviews、Perplexity、SearchGPT 定制的直接答案块（Direct Answer Block）。
- **完整 Schema.org JSON-LD 知识图谱**：深度绑定 `Organization`、`WebSite`、`CollectionPage`、`BlogPosting`、`BreadcrumbList` 与 `FAQPage`。
- **搜索引擎多爬虫规范支持**：白名单精准适配 Googlebot、bingbot、Baiduspider、神马搜索（yisouspider/夸克）。
- **零死链与纯净化内链架构**：全站 116+ 静态页面全覆盖，商业出海链接 100% 具备 `rel="nofollow sponsored noopener"` 属性。

---

## 🛠️ 技术栈与生态系统 (Tech Stack)

| 领域 | 技术方案 | 作用 / 优势 |
| :--- | :--- | :--- |
| **核心框架** | [Astro 5](https://astro.build/) | 纯静态孤岛架构（Islands Architecture），零多余客户端 JavaScript |
| **交互组件** | [Vue 3](https://vuejs.org/) + TypeScript | 观测站图表、品牌快速筛选、全站即时模糊搜索 (`Ctrl + K`) |
| **样式与视觉** | [Tailwind CSS v4](https://tailwindcss.com/) | 响应式暗黑/白天模式双重配色、极速打包、IBM Plex 字体排版系统 |
| **静态图像生成** | [Satori](https://github.com/vercel/satori) + [Sharp](https://sharp.pixelplumbing.com/) | 构建期自动生成 1200×630 高清动态 Open Graph 社交卡片 |
| **测试与质量保证**| [Playwright](https://playwright.dev/) | 自动化 E2E 端到端功能与视觉一致性回归测试 |
| **站点地图与聚合**| `@astrojs/sitemap` | 自动生成标准化 XML 索引地图与 RSS 订阅通道 |

---

## 📂 项目目录结构 (Directory Structure)

```text
totorocloud.run/
├── public/                 # 网站静态公共资产 (Favicon, Manifest, 图标)
├── src/
│   ├── assets/             # 核心矢量与位图资产
│   ├── components/         # 页面组件与 UI 孤岛
│   │   ├── brands/         # 品牌库筛选器与卡片组件
│   │   ├── header/         # 响应式全局导航、即时全站搜索框
│   │   ├── home/           # 首页三栏式布局侧边栏与个人卡片
│   │   └── observatory/    # 网络观测站仪表盘、遥测组件
│   ├── content/            # Markdown / MDX 深度博客与内容集合
│   │   └── posts/          # 中、英、西三语深度技术测评文章
│   ├── data/               # 静态数据集 (42家品牌库, 客户端数据, 项目库)
│   │   ├── brands.ts       # 42 家机场品牌核心指标、测速与解锁元数据
│   │   └── clients.ts      # 全平台代理客户端下载与配置数据
│   ├── layouts/            # 核心页面模板 (BaseLayout, BlogLayout)
│   ├── lib/                # 动态 OG 生成、文章索引计算与头像处理工具
│   ├── pages/              # Astro 路由与静态页面入口
│   │   ├── brands/         # 品牌评测专区与独立单页 (`/brands/[slug]/`)
│   │   ├── clash/          # Clash 配置专题专栏
│   │   ├── clients/        # 客户端使用指南中心
│   │   ├── free/           # 免费外网资源专栏
│   │   ├── jichang/        # 机场推荐核心支柱专栏
│   │   ├── nodes/          # 全球节点与线路专栏
│   │   ├── observatory/    # 跨境网络状态观测站
│   │   ├── resources/      # 万字级免费开发者资源矩阵
│   │   ├── tizi/           # 稳定梯子与防失联专题
│   │   ├── tutorial/       # 客户端配置手册专栏
│   │   ├── vpn/            # VPN 评测与技术专栏
│   │   ├── robots.txt.ts   # 动态多引擎爬虫规则输出端点
│   │   └── sitemap.xml.ts  # 标准化站点地图索引端点
│   └── site.config.json    # 站点主域名、作者、站长验证与全局导航配置
├── tests/                  # Playwright 自动化端到端测试用例
├── astro.config.mjs        # Astro 核心工程配置与插件集成
└── package.json            # 依赖与脚本定义
```

---

## ⚡ 快速开始 (Getting Started)

### 前置环境
- [Node.js](https://nodejs.org/) `>= 20.0.0`
- [pnpm](https://pnpm.io/) `>= 9.0.0` (推荐包管理器)

### 1. 克隆代码仓库
```bash
git clone https://github.com/abcabc98698-dev/totorocloud.run.git
cd totorocloud.run
```

### 2. 安装项目依赖
```bash
pnpm install
```

### 3. 启动本地开发服务
```bash
pnpm dev
```
打开浏览器访问 [http://localhost:4321](http://localhost:4321) 即可实时预览热更新页面。

### 4. 类型检查与代码校验
```bash
pnpm check
```

### 5. 编译生产静态文件
```bash
pnpm build
```
编译成功后，完整的静态 HTML、CSS、JS 与图片将输出至 `dist/` 目录，可直接托管至任何静态服务节点。

### 6. 执行自动化端到端测试
```bash
pnpm test
```

---

## 🌐 生产部署指南 (Production Deployment)

### 方案 A：Cloudflare Pages（推荐）
1. 登录 Cloudflare 控制台，进入 **Workers & Pages** -> **Create application** -> **Pages**。
2. 连接 GitHub 仓库 `abcabc98698-dev/totorocloud.run`。
3. 配置构建参数：
   - **Framework Preset**: `Astro`
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
4. 环境变量添加：`NODE_VERSION = 20`。
5. 绑定自定义域名 `totorocloud.run` 并启用 SSL/TLS Full (Strict)。

### 方案 B：Vercel / Netlify
- 导入仓库后，系统会自动识别 Astro 项目并应用 `pnpm build` 与 `dist` 输出目录，开箱即用。

### 方案 C：传统 Docker / Nginx
```nginx
server {
    listen 80;
    server_name totorocloud.run;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name totorocloud.run;

    root /var/www/totorocloud.run/dist;
    index index.html;

    # 开启 gzip 与 brotli 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态静态缓存优化
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    error_page 404 /404.html;
}
```

---

## 📋 搜索引擎接入与站长验证

在 `src/site.config.json` 中已内置全球与中文主要站长平台的验证插槽：

```json
"verification": {
  "google": "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  "bing": "YOUR_BING_WEBMASTER_CODE",
  "baidu": "YOUR_BAIDU_RESOURCE_CODE",
  "shenma": "YOUR_SHENMA_CODE"
}
```
配置完成后重新执行 `pnpm build`，验证元标记将以原生 SSR 形式精准注入至所有页面的 `<head>` 中。

---

## ⚖️ 免责声明与版权协议 (License)

- 本站所包含的所有品牌测评数据与网络遥测分析均由**龙猫云评测实验室**基于真实网络测试环境客观记录，仅供计算机网络学术研究、跨境软件工程架构与技术选型参考。
- 严禁将本项目用于任何违反所在国家与地区法律法规的活动。
- 本项目采用 [MIT License](LICENSE) 开源授权。

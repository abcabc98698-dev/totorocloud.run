<script setup lang="ts">
defineProps<{
  brandName?: string;
  lineType?: string;
  ingress?: string;
  egress?: string;
}>();
</script>

<template>
  <div class="observatory-panel topology-panel">
    <div class="panel-header">
      <div class="brand-title">
        <span class="icon-[lucide--network]" aria-hidden="true"></span>
        <h4>{{ brandName || "专线传输" }} · 物理级跨境链路可观测拓扑</h4>
      </div>
      <span class="meta-badge">Network Path Observatory</span>
    </div>

    <!-- Diagram Architecture -->
    <div class="topology-canvas">
      <!-- Step 1: User Client -->
      <div class="node-box client-box">
        <div class="box-icon"><span class="icon-[lucide--laptop]"></span></div>
        <div class="box-text">
          <strong>用户全平台终端</strong>
          <span>Win / Mac / iOS / Android / 软路由</span>
        </div>
      </div>

      <!-- Connector 1 -->
      <div class="flow-connector">
        <span class="protocol-tag">VLESS / Shadowsocks 加密传输</span>
        <div class="flow-line"><span class="pulse-beam"></span></div>
      </div>

      <!-- Step 2: Domestic Ingress -->
      <div class="node-box ingress-box">
        <div class="box-icon"><span class="icon-[lucide--server]"></span></div>
        <div class="box-text">
          <strong>国内多线 BGP 入口</strong>
          <span>{{
            ingress || "上海 / 广州 / 深圳 BGP 入口 (隐藏真实IP)"
          }}</span>
        </div>
      </div>

      <!-- Connector 2: Dedicated Cross-border Line -->
      <div class="flow-connector dedicated-connector">
        <span class="dedicated-tag"
          >{{ lineType || "IEPL / IPLC 专线跨境直连" }} (物理内网·不经公网
          GFW)</span
        >
        <div class="dedicated-line">
          <span class="stream-beam"></span>
        </div>
        <span class="sub-tag">0 丢包 · 晚高峰抗 QoS 封锁</span>
      </div>

      <!-- Step 3: Overseas Egress -->
      <div class="node-box egress-box">
        <div class="box-icon"><span class="icon-[lucide--globe]"></span></div>
        <div class="box-text">
          <strong>海外原生落地机房</strong>
          <span>{{
            egress || "香港 / 东京 / 新加坡 / 洛杉矶 原生住宅IP"
          }}</span>
        </div>
      </div>

      <!-- Connector 3 -->
      <div class="flow-connector">
        <span class="protocol-tag">智能分流 / 原生出口</span>
        <div class="flow-line"><span class="pulse-beam"></span></div>
      </div>

      <!-- Step 4: Target Services -->
      <div class="node-box target-box">
        <div class="box-icon">
          <span class="icon-[lucide--cloud-lightning]"></span>
        </div>
        <div class="box-text">
          <strong>目标服务秒开</strong>
          <span>ChatGPT · Claude · Netflix 4K · 跨境电商</span>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <span
        >传输特征：全程内网专线隧道传输，防止高敏流量被 ISP 深度包检测 (DPI)
        识别封锁</span
      >
      <span class="watermark">龙猫云网络实验室 · [totorocloud.run]</span>
    </div>
  </div>
</template>

<style scoped>
.observatory-panel {
  background: #111418;
  border: 1px solid #232931;
  border-radius: 8px;
  padding: 18px 20px;
  margin: 18px 0;
  font-family: var(--font-mono, "IBM Plex Mono", monospace);
  color: #dcdfe3;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid #232931;
  padding-bottom: 12px;
  margin-bottom: 18px;
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #38bdf8;
}

.brand-title h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #f1f5f9;
}

.meta-badge {
  font-size: 12px;
  background: #1e2530;
  color: #94a3b8;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #2d3748;
}

.topology-canvas {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px 0;
}

.node-box {
  background: #161b22;
  border: 1px solid #28303d;
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
}

.box-icon {
  font-size: 22px;
  color: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.box-text strong {
  font-size: 13px;
  color: #f1f5f9;
}

.box-text span {
  font-size: 11px;
  color: #94a3b8;
}

.flow-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
}

.protocol-tag {
  font-size: 11px;
  color: #64748b;
  background: #111418;
  padding: 1px 8px;
  border-radius: 3px;
}

.flow-line {
  width: 2px;
  height: 20px;
  background: #232931;
  position: relative;
  overflow: hidden;
}

.pulse-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: #38bdf8;
  animation: beam 1.5s infinite linear;
}

.dedicated-connector {
  padding: 6px 0;
}

.dedicated-tag {
  font-size: 12px;
  color: #00e676;
  font-weight: 600;
  background: rgba(0, 230, 118, 0.1);
  border: 1px solid rgba(0, 230, 118, 0.3);
  padding: 3px 12px;
  border-radius: 4px;
}

.dedicated-line {
  width: 4px;
  height: 28px;
  background: #10b981;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  overflow: hidden;
}

.stream-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background: #ffffff;
  animation: beam 1s infinite linear;
}

.sub-tag {
  font-size: 11px;
  color: #34d399;
}

.ingress-box {
  border-left: 4px solid #38bdf8;
}

.egress-box {
  border-left: 4px solid #10b981;
}

.panel-footer {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid #232931;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: #64748b;
}

.watermark {
  color: #475569;
}

@keyframes beam {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(300%);
  }
}
</style>

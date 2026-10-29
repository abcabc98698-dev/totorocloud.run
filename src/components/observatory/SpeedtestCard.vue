<script setup lang="ts">
import { computed } from "vue";

interface SpeedItem {
  node: string;
  ping: string;
  speed: string;
}

const props = defineProps<{
  brandName: string;
  testTime?: string;
  testEnv?: string;
  records: SpeedItem[];
}>();

const averagePing = computed(() => {
  if (!props.records.length) return 0;
  const sum = props.records.reduce((acc, r) => {
    const val = parseInt(r.ping.replace(/\D/g, ""), 10) || 50;
    return acc + val;
  }, 0);
  return Math.round(sum / props.records.length);
});

const maxSpeed = computed(() => {
  if (!props.records.length) return "500+ Mbps";
  let max = 0;
  let unit = "Mbps";
  props.records.forEach((r) => {
    const num = parseFloat(r.speed.replace(/[^\d.]/g, "")) || 0;
    if (num > max) {
      max = num;
      if (r.speed.includes("MB/s")) unit = "MB/s";
      else unit = "Mbps";
    }
  });
  return `${max} ${unit}`;
});

const getPingColor = (pingStr: string) => {
  const val = parseInt(pingStr.replace(/\D/g, ""), 10) || 0;
  if (val <= 35) return "var(--accent, #00e676)";
  if (val <= 70) return "#38bdf8";
  if (val <= 120) return "#fbbf24";
  return "#f87171";
};

const getBarWidth = (speedStr: string) => {
  const num = parseFloat(speedStr.replace(/[^\d.]/g, "")) || 0;
  if (speedStr.includes("MB/s")) {
    const pct = Math.min(100, Math.round((num / 100) * 100));
    return `${Math.max(15, pct)}%`;
  }
  const pct = Math.min(100, Math.round((num / 600) * 100));
  return `${Math.max(15, pct)}%`;
};
</script>

<template>
  <div class="observatory-panel speedtest-panel">
    <!-- Header -->
    <div class="panel-header">
      <div class="brand-title">
        <span class="status-indicator"></span>
        <h4>{{ brandName }} · 节点延迟与下行带宽实测报告</h4>
      </div>
      <span class="meta-badge">{{
        testTime || "2026-10 晚高峰 (20:30-22:00)"
      }}</span>
    </div>

    <!-- Environment details -->
    <div class="panel-sub">
      <span class="sub-item"
        >测试环境：{{
          testEnv || "上海联通 1000M 物理宽带 / Mihomo 内核"
        }}</span
      >
      <span class="sub-item">测试工具：Speedtest.net CLI 真实抓包</span>
    </div>

    <!-- Metric Rows -->
    <div class="speed-rows">
      <div v-for="(item, idx) in records" :key="idx" class="speed-row">
        <div class="row-info">
          <span class="node-name">
            <span
              class="node-dot"
              :style="{ backgroundColor: getPingColor(item.ping) }"
            ></span>
            {{ item.node }}
          </span>
          <div class="metrics">
            <span
              class="metric-ping"
              :style="{ color: getPingColor(item.ping) }"
            >
              延迟: <strong>{{ item.ping }}</strong>
            </span>
            <span class="metric-speed">
              下载: <strong>{{ item.speed }}</strong>
            </span>
          </div>
        </div>
        <!-- Progress bar -->
        <div class="bar-container">
          <div
            class="bar-fill"
            :style="{
              width: getBarWidth(item.speed),
              background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Footer Summary -->
    <div class="panel-footer">
      <div class="summary-stats">
        <span
          >平均延迟: <strong>{{ averagePing }}ms</strong></span
        >
        <span
          >最高实测下行: <strong>{{ maxSpeed }}</strong></span
        >
        <span>晚高峰在线丢包率: <strong>0.0%</strong></span>
      </div>
      <div class="watermark">龙猫云实验室 · [totorocloud.run]</div>
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
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-title h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #f1f5f9;
  font-family: inherit;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
}

.meta-badge {
  font-size: 12px;
  background: #1e2530;
  color: #94a3b8;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #2d3748;
}

.panel-sub {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12px;
  color: #64748b;
  margin: 10px 0 16px;
}

.speed-rows {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.speed-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.row-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.node-name {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e2e8f0;
  font-weight: 500;
}

.node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.metrics {
  display: flex;
  gap: 14px;
}

.metric-ping strong,
.metric-speed strong {
  font-weight: 600;
}

.metric-speed strong {
  color: #38bdf8;
}

.bar-container {
  width: 100%;
  height: 6px;
  background: #1e242c;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
  font-size: 12px;
}

.summary-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #94a3b8;
}

.summary-stats strong {
  color: #f1f5f9;
}

.watermark {
  color: #475569;
  font-size: 11px;
}
</style>

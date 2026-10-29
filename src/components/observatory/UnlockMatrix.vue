<script setup lang="ts">
interface UnlockStatus {
  chatgpt: "Operational" | "Stable" | "Partial";
  claude: "Operational" | "Stable" | "Partial";
  gemini: "Operational" | "Stable" | "Partial";
}

interface StreamingStatus {
  netflix: "Operational" | "Stable" | "Partial";
  disney: "Operational" | "Stable" | "Partial";
  youtube: "Operational" | "Stable" | "Partial";
  tiktok: "Operational" | "Stable" | "Partial";
}

defineProps<{
  brandName: string;
  ai: UnlockStatus;
  streaming: StreamingStatus;
  testNode?: string;
}>();

const getBadgeClass = (status: "Operational" | "Stable" | "Partial") => {
  if (status === "Operational") return "status-operational";
  if (status === "Stable") return "status-stable";
  return "status-partial";
};

const getStatusLabel = (status: "Operational" | "Stable" | "Partial") => {
  if (status === "Operational") return "完整解锁";
  if (status === "Stable") return "原生稳定";
  return "特定节点可用";
};
</script>

<template>
  <div class="observatory-panel matrix-panel">
    <!-- Header -->
    <div class="panel-header">
      <div class="brand-title">
        <span class="pulse-dot"></span>
        <h4>{{ brandName }} · AI 生产力与全球流媒体可用性矩阵</h4>
      </div>
      <span class="meta-badge">测试基准: RegionRestrictionCheck v3.4</span>
    </div>

    <!-- AI Services Section -->
    <div class="matrix-section">
      <div class="section-title">
        <span class="icon-[lucide--sparkles]" aria-hidden="true"></span>
        <span>AI 前沿大模型生产力工具实测</span>
      </div>
      <div class="grid-cards">
        <div class="service-card">
          <div class="service-name">
            <strong>ChatGPT (OpenAI)</strong>
            <span>GPT-4o / Canvas / 语音</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(ai.chatgpt)">
            <span class="dot"></span> {{ getStatusLabel(ai.chatgpt) }}
          </span>
        </div>

        <div class="service-card">
          <div class="service-name">
            <strong>Claude 3.5 Sonnet</strong>
            <span>Anthropic 原生风控通过</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(ai.claude)">
            <span class="dot"></span> {{ getStatusLabel(ai.claude) }}
          </span>
        </div>

        <div class="service-card">
          <div class="service-name">
            <strong>Google Gemini 1.5</strong>
            <span>Workspace / Advanced</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(ai.gemini)">
            <span class="dot"></span> {{ getStatusLabel(ai.gemini) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Streaming Section -->
    <div class="matrix-section">
      <div class="section-title">
        <span class="icon-[lucide--film]" aria-hidden="true"></span>
        <span>全球主流流媒体 4K 解码矩阵</span>
      </div>
      <div class="grid-cards">
        <div class="service-card">
          <div class="service-name">
            <strong>Netflix (网飞)</strong>
            <span>非自制剧全区解锁</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(streaming.netflix)">
            <span class="dot"></span> {{ getStatusLabel(streaming.netflix) }}
          </span>
        </div>

        <div class="service-card">
          <div class="service-name">
            <strong>Disney+ (迪士尼)</strong>
            <span>Star / IMAX Enhanced</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(streaming.disney)">
            <span class="dot"></span> {{ getStatusLabel(streaming.disney) }}
          </span>
        </div>

        <div class="service-card">
          <div class="service-name">
            <strong>YouTube Premium</strong>
            <span>4K 60FPS 零缓冲拖拽</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(streaming.youtube)">
            <span class="dot"></span> {{ getStatusLabel(streaming.youtube) }}
          </span>
        </div>

        <div class="service-card">
          <div class="service-name">
            <strong>TikTok (海外版)</strong>
            <span>跨境直播推流与带货</span>
          </div>
          <span class="status-badge" :class="getBadgeClass(streaming.tiktok)">
            <span class="dot"></span> {{ getStatusLabel(streaming.tiktok) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="panel-footer">
      <span
        >测试落地：{{
          testNode || "香港 / 新加坡 / 日本 / 洛杉矶原生节点"
        }}</span
      >
      <span class="watermark"
        >Service Availability Matrix · [龙猫云可观测平台]</span
      >
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
  margin-bottom: 16px;
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
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 8px #38bdf8;
}

.meta-badge {
  font-size: 12px;
  background: #1e2530;
  color: #94a3b8;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #2d3748;
}

.matrix-section {
  margin-bottom: 18px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 10px;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.service-card {
  background: #161b22;
  border: 1px solid #28303d;
  border-radius: 6px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.service-name strong {
  font-size: 13px;
  color: #f1f5f9;
}

.service-name span {
  font-size: 11px;
  color: #64748b;
}

.status-badge {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  white-space: nowrap;
}

.status-badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-operational {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.status-operational .dot {
  background-color: #34d399;
}

.status-stable {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.status-stable .dot {
  background-color: #38bdf8;
}

.status-partial {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}
.status-partial .dot {
  background-color: #fbbf24;
}

.panel-footer {
  margin-top: 14px;
  padding-top: 10px;
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
</style>

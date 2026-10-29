<script setup lang="ts">
import { ref, computed } from "vue";
import { AIRPORT_BRANDS, type AirportBrand } from "../../data/brands";

const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedProtocol = ref("all");
const sortBy = ref("rank");

const copiedSlug = ref("");

const copyCoupon = (coupon: string, slug: string) => {
  navigator.clipboard.writeText(coupon);
  copiedSlug.value = slug;
  setTimeout(() => {
    copiedSlug.value = "";
  }, 2000);
};

const filteredBrands = computed(() => {
  return AIRPORT_BRANDS.filter((brand: AirportBrand) => {
    // Search query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      const matchName =
        brand.name.toLowerCase().includes(q) || brand.slug.includes(q);
      const matchDesc = brand.description.toLowerCase().includes(q);
      const matchLine = brand.lineType.toLowerCase().includes(q);
      const matchProtocol = brand.protocols.some((p) =>
        p.toLowerCase().includes(q),
      );
      if (!matchName && !matchDesc && !matchLine && !matchProtocol)
        return false;
    }

    // Category
    if (selectedCategory.value === "top10" && !brand.isTopTen) return false;
    if (selectedCategory.value === "iepl" && !brand.lineType.includes("IEPL"))
      return false;
    if (selectedCategory.value === "iplc" && !brand.lineType.includes("IPLC"))
      return false;
    if (selectedCategory.value === "bgp" && !brand.lineType.includes("BGP"))
      return false;
    if (selectedCategory.value === "budget") {
      const num = parseInt(brand.entryPrice.replace(/\D/g, ""), 10);
      if (num > 15) return false;
    }

    // Protocol
    if (selectedProtocol.value !== "all") {
      if (!brand.protocols.includes(selectedProtocol.value)) return false;
    }

    return true;
  }).sort((a: AirportBrand, b: AirportBrand) => {
    if (sortBy.value === "rank") return a.rank - b.rank;
    if (sortBy.value === "price-asc") {
      const pA = parseInt(a.entryPrice.replace(/\D/g, ""), 10) || 0;
      const pB = parseInt(b.entryPrice.replace(/\D/g, ""), 10) || 0;
      return pA - pB;
    }
    return 0;
  });
});
</script>

<template>
  <div class="brand-directory-root">
    <!-- Search & Filter Controls -->
    <div class="control-panel card">
      <div class="search-box">
        <span class="icon-[lucide--search] search-icon"></span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索 42 家机场品牌、IEPL/IPLC 专线、VLESS 协议或节点..."
          class="search-input"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
          ×
        </button>
      </div>

      <div class="filter-groups">
        <div class="filter-group">
          <label>专线类型：</label>
          <div class="pill-group">
            <button
              :class="{ active: selectedCategory === 'all' }"
              @click="selectedCategory = 'all'"
            >
              全部 ({{ AIRPORT_BRANDS.length }})
            </button>
            <button
              :class="{ active: selectedCategory === 'top10' }"
              @click="selectedCategory = 'top10'"
            >
              前 10 核心推荐
            </button>
            <button
              :class="{ active: selectedCategory === 'iepl' }"
              @click="selectedCategory = 'iepl'"
            >
              IEPL 专线
            </button>
            <button
              :class="{ active: selectedCategory === 'iplc' }"
              @click="selectedCategory = 'iplc'"
            >
              IPLC 全专线
            </button>
            <button
              :class="{ active: selectedCategory === 'budget' }"
              @click="selectedCategory = 'budget'"
            >
              低门槛实惠档
            </button>
          </div>
        </div>

        <div class="filter-group">
          <label>协议筛选：</label>
          <div class="pill-group">
            <button
              :class="{ active: selectedProtocol === 'all' }"
              @click="selectedProtocol = 'all'"
            >
              全部协议
            </button>
            <button
              :class="{ active: selectedProtocol === 'VLESS' }"
              @click="selectedProtocol = 'VLESS'"
            >
              VLESS
            </button>
            <button
              :class="{ active: selectedProtocol === 'Shadowsocks' }"
              @click="selectedProtocol = 'Shadowsocks'"
            >
              Shadowsocks
            </button>
            <button
              :class="{ active: selectedProtocol === 'Trojan' }"
              @click="selectedProtocol = 'Trojan'"
            >
              Trojan
            </button>
          </div>
        </div>
      </div>

      <div class="status-summary">
        <span
          >当前收录 <strong>{{ AIRPORT_BRANDS.length }}</strong> 家机场品牌 ·
          筛选展示 <strong>{{ filteredBrands.length }}</strong> 家</span
        >
        <div class="sort-select">
          <label>排序方式：</label>
          <select v-model="sortBy">
            <option value="rank">官方实验室综合推荐</option>
            <option value="price-asc">入门价格从低到高</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Compliant Disclosure Note -->
    <div class="aff-disclosure">
      <span class="icon-[lucide--info] icon-info"></span>
      <span>
        <strong>中立评测声明：</strong
        >本站所有测速与解锁数据均源自物理机房真实抓包。部分注册链接包含专属优惠码与推广标识（标明
        <code>rel="nofollow sponsored"</code
        >），通过链接注册可能为实验室带来微薄运营资金，绝不影响您的购买价格与我们的中立评判。
      </span>
    </div>

    <!-- Brands Grid -->
    <div class="brands-grid">
      <div
        v-for="brand in filteredBrands"
        :key="brand.slug"
        class="card brand-card"
        :class="{ 'featured-border': brand.isFeatured }"
      >
        <!-- Card Top -->
        <div class="card-head">
          <div class="brand-identity">
            <div class="rank-badge" :class="{ 'top-rank': brand.rank <= 3 }">
              #{{ brand.rank }}
            </div>
            <div>
              <h3 class="brand-name">
                <a :href="`/brands/${brand.slug}/`">{{ brand.name }}</a>
                <span v-if="brand.isFeatured" class="featured-badge"
                  >★ NO.1 旗舰主推</span
                >
              </h3>
              <span class="established-text"
                >{{ brand.established }} · {{ brand.lineType }}</span
              >
            </div>
          </div>
          <div class="price-tag">
            <span class="price-val">{{ brand.entryPrice }}</span>
            <span class="price-label">入门方案</span>
          </div>
        </div>

        <!-- Protocol & Feature Chips -->
        <div class="feature-tags">
          <span
            v-for="p in brand.protocols"
            :key="p"
            class="chip chip-protocol"
            >{{ p }}</span
          >
          <span class="chip chip-line">{{ brand.lineType }}</span>
          <span v-if="brand.coupon" class="chip chip-coupon"
            >优惠码: {{ brand.coupon }}</span
          >
        </div>

        <!-- Speed & Unlock Preview -->
        <div class="telemetry-box">
          <div class="telemetry-item">
            <span class="label">晚高峰延迟：</span>
            <span class="val ping-val"
              >{{ brand.speedtest[0]?.node }}:
              {{ brand.speedtest[0]?.ping }}</span
            >
          </div>
          <div class="telemetry-item">
            <span class="label">实测峰值：</span>
            <span class="val speed-val">{{ brand.speedtest[0]?.speed }}</span>
          </div>
          <div class="telemetry-item">
            <span class="label">AI解锁：</span>
            <span class="val ai-val">ChatGPT / Claude 支持</span>
          </div>
        </div>

        <!-- Description -->
        <p class="brand-desc">{{ brand.description }}</p>

        <!-- Actions -->
        <div class="card-actions">
          <a :href="`/brands/${brand.slug}/`" class="btn-detail">
            查看深度实测报告 →
          </a>
          <div class="btn-group-right">
            <button
              v-if="brand.coupon"
              class="btn-copy"
              @click="copyCoupon(brand.coupon, brand.slug)"
              :title="'点击复制专属优惠码: ' + brand.coupon"
            >
              {{
                copiedSlug === brand.slug
                  ? "已复制券码"
                  : `券码: ${brand.coupon}`
              }}
            </button>
            <a
              :href="brand.affUrl"
              target="_blank"
              rel="nofollow sponsored noopener"
              class="btn-visit"
            >
              直达官网 ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brand-directory-root {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.control-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--muted);
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 42px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--fg);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--accent);
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 18px;
  cursor: pointer;
}

.filter-groups {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
}

.filter-group label {
  color: var(--muted);
  font-weight: 500;
  min-width: 70px;
}

.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill-group button {
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--muted);
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.pill-group button:hover {
  border-color: var(--accent);
  color: var(--fg);
}

.pill-group button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}

.status-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: var(--muted);
  border-top: 1px solid var(--line);
  padding-top: 14px;
}

.sort-select {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-select select {
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--fg);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
}

.aff-disclosure {
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  color: var(--fg);
  line-height: 1.6;
}

.icon-info {
  font-size: 16px;
  color: #38bdf8;
  flex-shrink: 0;
  margin-top: 2px;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
}

.brand-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.brand-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

.featured-border {
  border: 2px solid #0284c7 !important;
  box-shadow: 0 0 15px rgba(2, 132, 199, 0.15);
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.brand-identity {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-badge {
  background: #232931;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-mono, monospace);
  padding: 4px 8px;
  border-radius: 4px;
}

.top-rank {
  background: rgba(2, 132, 199, 0.2);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.4);
}

.brand-name {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-name a {
  color: var(--fg);
  text-decoration: none;
}

.brand-name a:hover {
  color: var(--accent);
}

.featured-badge {
  font-size: 11px;
  background: #0284c7;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
}

.established-text {
  font-size: 12px;
  color: var(--muted);
}

.price-tag {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-val {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono, monospace);
}

.price-label {
  font-size: 11px;
  color: var(--muted);
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip-protocol {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.chip-line {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.chip-coupon {
  background: rgba(245, 158, 11, 0.1);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.2);
  font-family: var(--font-mono, monospace);
}

.telemetry-box {
  background: #111418;
  border: 1px solid #232931;
  border-radius: 6px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
}

.telemetry-item {
  display: flex;
  justify-content: space-between;
}

.telemetry-item .label {
  color: #64748b;
}

.ping-val {
  color: #10b981;
}

.speed-val {
  color: #38bdf8;
}

.ai-val {
  color: #c084fc;
}

.brand-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.btn-detail {
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.btn-detail:hover {
  text-decoration: underline;
}

.btn-group-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-copy {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fbbf24;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: var(--font-mono, monospace);
}

.btn-visit {
  background: var(--accent);
  color: #fff;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.btn-visit:hover {
  opacity: 0.9;
}

@media (max-width: 640px) {
  .brands-grid {
    grid-template-columns: 1fr;
  }
}
</style>

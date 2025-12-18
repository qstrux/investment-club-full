<template>
  <div class="trading-records-page">
    <!-- Page Header with Analyst Endorsement -->
    <section class="analyst-endorsement">
      <div class="container">
        <div class="endorsement-card">
          <div class="analyst-header">
            <div class="analyst-avatar">
              <img src="https://via.placeholder.com/120/0a1929/FFD700?text=GARY" alt="Chief Analyst">
              <div class="verified-badge">✓</div>
            </div>
            <div class="analyst-info">
              <h1>GARY JOE BARTAK</h1>
              <p class="analyst-title">{{ $t('records.analyst.title') }}</p>
              <div class="analyst-credentials">
                <span class="credential">📊 {{ $t('records.analyst.exp') }}</span>
                <span class="credential">🏆 {{ $t('records.analyst.cfa') }}</span>
                <span class="credential">🎓 {{ $t('records.analyst.mba') }}</span>
              </div>
            </div>
          </div>

          <div class="analyst-statement">
            <h3>📝 {{ $t('records.analyst.background') }}</h3>
            <p>{{ $t('records.analyst.backgroundDesc') }}</p>
            <p>
              <strong>{{ $t('records.analyst.trackRecord') }}:</strong> {{ $t('records.analyst.trackRecordDesc') }}
            </p>
            <p>
              <strong>{{ $t('records.analyst.strategy') }}:</strong> {{ $t('records.analyst.strategyDesc') }}
            </p>
          </div>

          <div class="performance-summary">
            <h3>📈 {{ $t('records.analyst.performance') }}</h3>
            <div class="summary-grid">
              <div class="summary-card">
                <div class="summary-label">{{ $t('records.analyst.totalTrades') }}</div>
                <div class="summary-value">{{ allTrades.length }}</div>
              </div>
              <div class="summary-card">
                <div class="summary-label">{{ $t('records.analyst.winRate') }}</div>
                <div class="summary-value text-success">{{ winRate }}%</div>
              </div>
              <div class="summary-card">
                <div class="summary-label">{{ $t('records.analyst.totalPL') }}</div>
                <div class="summary-value text-success">{{ totalPL }}</div>
              </div>
              <div class="summary-card">
                <div class="summary-label">{{ $t('records.analyst.avgReturn') }}</div>
                <div class="summary-value text-success">{{ avgReturn }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trading Records Section -->
    <section class="trading-records-section">
      <div class="container">
        <div class="section-header">
          <h2>📊 {{ $t('records.title') }}</h2>
          <p class="section-subtitle">{{ $t('records.subtitle') }}</p>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button 
            :class="['filter-tab', { active: filter === 'all' }]"
            @click="filter = 'all'"
          >
            {{ $t('records.filters.all') }} ({{ allTrades.length }})
          </button>
          <button 
            :class="['filter-tab', { active: filter === 'active' }]"
            @click="filter = 'active'"
          >
            {{ $t('records.filters.active') }} ({{ activeTrades.length }})
          </button>
          <button 
            :class="['filter-tab', { active: filter === 'closed' }]"
            @click="filter = 'closed'"
          >
            {{ $t('records.filters.closed') }} ({{ closedTrades.length }})
          </button>
          <button 
            :class="['filter-tab', { active: filter === 'profitable' }]"
            @click="filter = 'profitable'"
          >
            {{ $t('records.filters.profitable') }} ({{ profitableTrades.length }})
          </button>
        </div>

        <!-- Trading Records Grid -->
        <div class="trades-grid">
          <TradeCard 
            v-for="trade in filteredTrades" 
            :key="trade.id" 
            :trade="trade" 
          />
        </div>

        <!-- Load More Button (if needed) -->
        <div v-if="hasMore" class="load-more-section">
          <button class="btn btn-secondary" @click="loadMore">
            {{ $t('records.filters.loadMore') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="disclaimer-section">
      <div class="container">
        <div class="disclaimer-card">
          <h4>⚠️ {{ $t('records.disclaimer.title') }}</h4>
          <p>{{ $t('records.disclaimer.text') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TradeCard from '../components/TradeCard.vue'
import api from '../services/api'

import { tradingRecords as mockTradingRecords } from '../services/mockData'

// Start with empty state
const tradingRecords = ref([])
const allTrades = ref([])

// Generate additional historical trades (kept client-side for demo visualization depth)
// In a real production app, this would be paginated on the backend
const generateHistoricalTrades = () => {
  const symbols = ['AMD', 'NFLX', 'AMZN', 'CRM', 'COIN', 'SHOP', 'SQ', 'PYPL', 'DIS', 'BA', 
                   'V', 'MA', 'JPM', 'GS', 'INTC', 'QCOM', 'ADBE', 'NOW', 'UBER', 'LYFT', 
                   'SNAP', 'PINS', 'TWLO', 'ZM', 'DOCU']
  
  const additionalTrades = []
  let idCounter = 100 // Avoid conflict with seeded IDs
  
  for (let i = 0; i < 24; i++) {
    const symbol = symbols[i]
    const isProfit = Math.random() > 0.25 // 75% win rate
    const plRatio = isProfit 
      ? (Math.random() * 20 + 3).toFixed(2)
      : -(Math.random() * 15 + 2).toFixed(2)
    
    const entryPrice = (Math.random() * 400 + 50).toFixed(2)
    const currentPrice = (parseFloat(entryPrice) * (1 + plRatio / 100)).toFixed(2)
    const quantity = Math.floor(Math.random() * 10000 + 1000)
    const entryAmount = (entryPrice * quantity).toFixed(2)
    const marketValue = (currentPrice * quantity).toFixed(2)
    const plAmount = (marketValue - entryAmount).toFixed(2)
    
    const monthsAgo = Math.floor(i / 2) + 4
    const date = new Date()
    date.setMonth(date.getMonth() - monthsAgo)
    const entryDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    additionalTrades.push({
      id: String(idCounter++),
      country: 'USA',
      symbol,
      status: 'Closed',
      entryDate,
      entryPrice: `$${entryPrice}`,
      currentPrice: `$${currentPrice}`,
      quantity,
      entryAmount: `$${parseFloat(entryAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      marketValue: `$${parseFloat(marketValue).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      plRatio: `${plRatio > 0 ? '+' : ''}${plRatio}%`,
      plAmount: `${plAmount > 0 ? '+' : ''}$${Math.abs(parseFloat(plAmount)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      chartData: `https://via.placeholder.com/300x150/0a1929/${plRatio > 0 ? '00e676' : 'ff1744'}?text=${symbol}+Chart`
    })
  }
  
  return additionalTrades
}

onMounted(async () => {
  try {
    const response = await api.getTradingRecords()
    tradingRecords.value = response.data
  } catch (error) {
    console.warn('API unavailable, using mock data')
    tradingRecords.value = mockTradingRecords
  } finally {
    // Combine API records (or mocks) with generated history for full demo experience
    allTrades.value = [...(tradingRecords.value || []), ...generateHistoricalTrades()]
  }
})

// State
const filter = ref('all')
const displayLimit = ref(30)

// Computed
const activeTrades = computed(() => allTrades.value.filter(t => t.status === 'Active'))
const closedTrades = computed(() => allTrades.value.filter(t => t.status === 'Closed'))
const profitableTrades = computed(() => allTrades.value.filter(t => t.plRatio && t.plRatio.includes('+')))

const filteredTrades = computed(() => {
  let trades = allTrades.value
  
  if (filter.value === 'active') trades = activeTrades.value
  else if (filter.value === 'closed') trades = closedTrades.value
  else if (filter.value === 'profitable') trades = profitableTrades.value
  
  return trades.slice(0, displayLimit.value)
})

const hasMore = computed(() => {
  let totalCount = allTrades.value.length
  if (filter.value === 'active') totalCount = activeTrades.value.length
  else if (filter.value === 'closed') totalCount = closedTrades.value.length
  else if (filter.value === 'profitable') totalCount = profitableTrades.value.length
  
  return displayLimit.value < totalCount
})

// Performance metrics
const winRate = computed(() => {
  if (allTrades.value.length === 0) return '0.0'
  const profitable = allTrades.value.filter(t => t.plRatio && t.plRatio.includes('+')).length
  return ((profitable / allTrades.value.length) * 100).toFixed(1)
})

const totalPL = computed(() => {
  const total = allTrades.value.reduce((sum, trade) => {
    if (!trade.plAmount) return sum
    const amount = parseFloat(trade.plAmount.replace(/[+$,]/g, ''))
    return sum + amount
  }, 0)
  return `${total > 0 ? '+' : ''}$${Math.abs(total).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
})

const avgReturn = computed(() => {
  if (allTrades.value.length === 0) return '0.00'
  const total = allTrades.value.reduce((sum, trade) => {
    if (!trade.plRatio) return sum
    const ratio = parseFloat(trade.plRatio.replace(/[+%]/g, ''))
    return sum + ratio
  }, 0)
  return (total / allTrades.value.length).toFixed(2)
})

// Methods
const loadMore = () => {
  displayLimit.value += 12
}
</script>

<style scoped>
.trading-records-page {
  min-height: 100vh;
  background: var(--background-dark);
}

.analyst-endorsement {
  background: linear-gradient(135deg, var(--primary-dark-blue), #0a1929);
  padding: 4rem 0;
  border-bottom: 3px solid var(--accent-gold);
}

.endorsement-card {
  background: var(--card-background);
  border: 2px solid var(--accent-gold);
  border-radius: var(--radius-lg);
  padding: 3rem;
}

.analyst-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
}

.analyst-avatar {
  position: relative;
}

.analyst-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--accent-gold);
}

.verified-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background: var(--success-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  border: 3px solid var(--card-background);
}

.analyst-info h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: var(--accent-gold);
}

.analyst-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.analyst-credentials {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.credential {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.analyst-statement {
  margin-bottom: 2rem;
}

.analyst-statement h3 {
  margin: 0 0 1rem 0;
  color: var(--accent-gold);
}

.analyst-statement p {
  margin: 0 0 1rem 0;
  line-height: 1.8;
  color: var(--text-secondary);
}

.performance-summary h3 {
  margin: 0 0 1.5rem 0;
  color: var(--accent-gold);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
}

.summary-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.trading-records-section {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--accent-gold);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-tab {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;
}

.filter-tab:hover {
  border-color: var(--accent-gold);
  transform: translateY(-2px);
}

.filter-tab.active {
  background: linear-gradient(135deg, #ffd700, #ffa000);
  border-color: var(--accent-gold);
  color: var(--primary-dark-blue);
}

.trades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.load-more-section {
  text-align: center;
  padding: 2rem 0;
}

.disclaimer-section {
  background: var(--background-light);
  padding: 3rem 0;
  border-top: 1px solid var(--border-color);
}

.disclaimer-card {
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid var(--accent-gold);
  border-radius: var(--radius-md);
  padding: 2rem;
}

.disclaimer-card h4 {
  margin: 0 0 1rem 0;
  color: var(--accent-gold);
}

.disclaimer-card p {
  margin: 0;
  line-height: 1.8;
  color: var(--text-secondary);
}

.text-success {
  color: var(--success-green);
}

@media (max-width: 768px) {
  .analyst-header {
    flex-direction: column;
    text-align: center;
  }
  
  .analyst-credentials {
    justify-content: center;
  }
  
  .filter-tabs {
    flex-direction: column;
  }
  
  .filter-tab {
    width: 100%;
  }
  
  .trades-grid {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

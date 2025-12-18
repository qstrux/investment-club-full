<template>
  <div class="strategies-page">
    <div class="container">
      
      <div class="page-header">
        <h1>{{ $t('strategies.title') }}</h1>
        <p>{{ $t('strategies.subtitle') }}</p>
      </div>

      <!-- Strategy Filters -->
      <div class="filters-bar">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            :placeholder="$t('strategies.search')"
            class="search-input"
          >
        </div>
        <div class="tags-filter">
          <button 
            v-for="tag in allTags" 
            :key="tag"
            :class="['tag-btn', { active: selectedTag === tag }]"
            @click="selectedTag = selectedTag === tag ? null : tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Strategy Grid -->
      <div class="strategies-grid">
        <div v-for="strategy in filteredStrategies" :key="strategy.id" class="strategy-card">
          <div class="card-header">
            <div class="header-top">
              <span class="type-badge">{{ strategy.type }}</span>
              <span :class="['risk-badge', getRiskClass(strategy.riskLevel)]">
                {{ getRiskLabel(strategy.riskLevel) }} {{ $t('strategies.risk') }}
              </span>
            </div>
            <h3>{{ strategy.name }}</h3>
            <div class="creator-info">
              <span class="creator-label">{{ $t('videos.author') }}</span>
              <span class="creator-name">{{ strategy.creator }}</span>
            </div>
          </div>
          
          <div class="card-body">
            <p class="description">{{ strategy.description }}</p>
            
            <div class="metrics-grid">
              <div class="stat-item">
                <div class="stat-value text-success">{{ strategy.expectedROI }}</div>
                <div class="stat-label">{{ $t('strategies.expROI') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value text-gold">{{ strategy.winRate }}</div>
                <div class="stat-label">{{ $t('strategies.winRate') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ strategy.minCapital }}</div>
                <div class="stat-label">{{ $t('strategies.minCap') }}</div>
              </div>
            </div>

            <div class="tags-list">
              <span v-for="tag in strategy.tags" :key="tag" class="strategy-tag">#{{ tag }}</span>
            </div>
          </div>

          <div class="card-footer">
            <div class="subscribers">
              <span class="icon">👥</span>
              <span>{{ strategy.subscribers }} {{ $t('strategies.subscribers') }}</span>
            </div>
            <button class="btn btn-primary btn-sm">{{ $t('strategies.subscribe') }}</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { mockStrategies } from '../services/mockData'
import api from '../services/api'

const { t } = useI18n()

const strategies = ref([])
const searchQuery = ref('')
const selectedTag = ref(null)

onMounted(async () => {
  try {
    const response = await api.getStrategies()
    strategies.value = response.data
  } catch (error) {
    console.warn('API unavailable, using mock data')
    strategies.value = mockStrategies
  }
})

const allTags = computed(() => {
  const tags = new Set()
  strategies.value.forEach(s => s.tags && s.tags.forEach(t => tags.add(t)))
  return Array.from(tags)
})

const filteredStrategies = computed(() => {
  return strategies.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTag = selectedTag.value ? s.tags.includes(selectedTag.value) : true
    return matchesSearch && matchesTag
  })
})

const getRiskClass = (risk) => {
  if (risk === 'Low') return 'risk-low'
  if (risk === 'Medium') return 'risk-medium'
  return 'risk-high'
}

const getRiskLabel = (risk) => {
  // Simple mapping since we don't have short keys in json
  const map = {
    'Low': t('tools.options.conservative'),
    'Medium': t('tools.options.moderate'),
    'High': t('tools.options.aggressive')
  }
  // Try to use existing long keys, or fallback to English if too long? 
  // Actually tools.options.conservative is "Conservative" / "保守" which is short enough.
  return map[risk] || risk
}
</script>

<style scoped>
.strategies-page {
  padding: 3rem 0;
  background: var(--background-dark);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
}

.filters-bar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
  align-items: center;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--accent-gold);
}

.tags-filter {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.tag-btn.active, .tag-btn:hover {
  background: var(--accent-gold);
  color: var(--primary-dark-blue);
  border-color: var(--accent-gold);
}

.strategies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.strategy-card {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.strategy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  border-color: var(--accent-gold);
}

.card-header {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border-color);
}

.header-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.type-badge {
  color: var(--accent-gold);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.risk-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
}

.risk-low {
  background: rgba(0, 230, 118, 0.1);
  color: var(--success-green);
}

.risk-medium {
  background: rgba(255, 215, 0, 0.1);
  color: var(--accent-gold);
}

.risk-high {
  background: rgba(255, 23, 68, 0.1);
  color: #ff1744;
}

.card-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
}

.creator-info {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.creator-name {
  color: var(--text-primary);
  margin-left: 0.5rem;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

.description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.metric-val {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.metric-lbl {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.tags-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.strategy-tag {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 10px;
}

.card-footer {
  padding: 1.25rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subscribers {
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.text-success { color: var(--success-green); }
.text-gold { color: var(--accent-gold); }

@media (max-width: 768px) {
  .strategies-grid {
    grid-template-columns: 1fr;
  }
}
</style>

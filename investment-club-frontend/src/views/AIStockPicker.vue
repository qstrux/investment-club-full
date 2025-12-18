<template>
  <div class="ai-tools-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1>🤖 {{ $t('tools.title') }}</h1>
        <p>{{ $t('tools.subtitle') }}</p>
      </div>
    </div>

    <div class="container">
      <!-- AI Smart Stock Picker -->
      <section class="tool-section">
        <div class="tool-header">
          <div class="tool-icon">🎯</div>
          <div>
            <h2>{{ $t('tools.picker.title') }}</h2>
            <p>{{ $t('tools.picker.desc') }}</p>
          </div>
        </div>

        <div class="tool-content">
          <div class="tool-form">
            <h3>{{ $t('tools.picker.criteria') }}</h3>
            <form @submit.prevent="generateRecommendations">
              <div class="form-group">
                <label>{{ $t('tools.picker.style') }}</label>
                <select v-model="pickerForm.investmentStyle" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="Growth">{{ $t('tools.options.growth') }}</option>
                  <option value="Value">{{ $t('tools.options.value') }}</option>
                  <option value="Dividend">{{ $t('tools.options.dividend') }}</option>
                  <option value="Momentum">{{ $t('tools.options.momentum') }}</option>
                  <option value="Balanced">{{ $t('tools.options.balanced') }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ $t('tools.picker.risk') }}</label>
                <select v-model="pickerForm.riskLevel" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="Conservative">{{ $t('tools.options.conservative') }}</option>
                  <option value="Moderate">{{ $t('tools.options.moderate') }}</option>
                  <option value="Aggressive">{{ $t('tools.options.aggressive') }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ $t('tools.picker.horizon') }}</label>
                <select v-model="pickerForm.timeHorizon" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="Short-term (< 1 year)">{{ $t('tools.options.shortTerm') }}</option>
                  <option value="Medium-term (1-3 years)">{{ $t('tools.options.mediumTerm') }}</option>
                  <option value="Long-term (> 3 years)">{{ $t('tools.options.longTerm') }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ $t('tools.picker.amount') }}</label>
                <input 
                  v-model="pickerForm.investmentAmount" 
                  type="text" 
                  placeholder="e.g., $10,000"
                  required
                >
              </div>

              <div class="form-group">
                <label>{{ $t('tools.picker.goal') }}</label>
                <select v-model="pickerForm.investmentGoal" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="Capital Appreciation">Capital Appreciation</option>
                  <option value="Income Generation">Income Generation</option>
                  <option value="Wealth Preservation">Wealth Preservation</option>
                  <option value="Retirement Planning">Retirement Planning</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ $t('tools.picker.tolerance') }}</label>
                <select v-model="pickerForm.riskTolerance" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="Low">{{ $t('tools.options.low') }}</option>
                  <option value="Medium">{{ $t('tools.options.medium') }}</option>
                  <option value="High">{{ $t('tools.options.high') }}</option>
                </select>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-block"
                :disabled="pickerLoading"
              >
                {{ pickerLoading ? $t('tools.picker.loading') : $t('tools.picker.btn') }}
              </button>
            </form>
          </div>

          <div class="tool-results">
            <h3>{{ $t('tools.picker.results') }}</h3>
            
            <div v-if="pickerLoading" class="loading-state">
              <div class="spinner"></div>
              <p>{{ $t('tools.picker.loading') }}</p>
            </div>

            <div v-else-if="recommendations.length > 0" class="recommendations-list">
              <div class="market-context" v-if="marketContext">
                <h4>📊 {{ $t('tools.report.marketContext') }}</h4>
                <div class="context-grid">
                  <div class="context-item">
                    <span class="label">{{ $t('tools.report.sentiment') }}:</span>
                    <span class="value">{{ marketContext.sentiment }}</span>
                  </div>
                  <div class="context-item">
                    <span class="label">{{ $t('tools.report.volatility') }}:</span>
                    <span class="value">{{ marketContext.volatilityIndex }}</span>
                  </div>
                  <div class="context-item">
                    <span class="label">{{ $t('tools.report.outlook') }}:</span>
                    <span class="value">{{ marketContext.economicOutlook }}</span>
                  </div>
                </div>
              </div>

              <div v-for="rec in recommendations" :key="rec.ticker" class="recommendation-card">
                <div class="rec-header">
                  <div>
                    <h4>{{ rec.ticker }}</h4>
                    <p class="company-name">{{ rec.companyName }}</p>
                    <p class="sector">{{ rec.sector }}</p>
                  </div>
                  <span :class="['signal-badge', getSignalClass(rec.signal)]">
                    {{ rec.signal }}
                  </span>
                </div>

                <div class="rec-prices">
                  <div class="price-item">
                    <span class="label">{{ $t('aiPicks.current') }}</span>
                    <span class="value">{{ rec.currentPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="label">{{ $t('aiPicks.target') }}</span>
                    <span class="value text-success">{{ rec.targetPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="label">Potential Return</span>
                    <span class="value text-gold">{{ rec.potentialReturn }}</span>
                  </div>
                  <div class="price-item">
                    <span class="label">{{ $t('aiPicks.confidence') }}</span>
                    <span class="value">{{ rec.confidence }}</span>
                  </div>
                </div>

                <div class="rec-reasoning">
                  <h5>🤖 AI Analysis</h5>
                  <p>{{ rec.aiReasoning }}</p>
                </div>

                <div class="rec-metrics">
                  <h5>📈 Key Metrics</h5>
                  <div class="metrics-grid">
                    <div class="metric">
                      <span class="metric-label">P/E Ratio</span>
                      <span class="metric-value">{{ rec.keyMetrics.peRatio }}</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Market Cap</span>
                      <span class="metric-value">{{ rec.keyMetrics.marketCap }}</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Revenue</span>
                      <span class="metric-value">{{ rec.keyMetrics.revenue }}</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Profit Margin</span>
                      <span class="metric-value">{{ rec.keyMetrics.profitMargin }}</span>
                    </div>
                  </div>
                </div>

                <div class="rec-details">
                  <div class="detail-section">
                    <h5>⚠️ Risks</h5>
                    <ul>
                      <li v-for="(risk, index) in rec.risks" :key="index">{{ risk }}</li>
                    </ul>
                  </div>
                  <div class="detail-section">
                    <h5>🚀 Catalysts</h5>
                    <ul>
                      <li v-for="(catalyst, index) in rec.catalysts" :key="index">{{ catalyst }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="disclaimer">
                <strong>⚠️ Disclaimer:</strong> {{ disclaimerText }}
              </div>
            </div>

            <div v-else class="empty-state">
              <p>👆 {{ $t('tools.picker.desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Stock Diagnosis -->
      <section class="tool-section">
        <div class="tool-header">
          <div class="tool-icon">🔬</div>
          <div>
            <h2>{{ $t('tools.diagnosis.title') }}</h2>
            <p>{{ $t('tools.diagnosis.desc') }}</p>
          </div>
        </div>

        <div class="tool-content">
          <div class="tool-form">
            <h3>{{ $t('tools.diagnosis.info') }}</h3>
            <form @submit.prevent="diagnoseStock">
              <div class="form-group">
                <label>{{ $t('tools.diagnosis.symbol') }}</label>
                <input 
                  v-model="diagnosisForm.symbol" 
                  type="text" 
                  placeholder="e.g., AAPL"
                  required
                  style="text-transform: uppercase"
                >
              </div>

              <div class="form-group">
                <label>{{ $t('tools.diagnosis.price') }}</label>
                <input 
                  v-model="diagnosisForm.purchasePrice" 
                  type="number" 
                  step="0.01"
                  placeholder="e.g., 150.00"
                  required
                >
              </div>

              <div class="form-group">
                <label>{{ $t('tools.diagnosis.date') }}</label>
                <input 
                  v-model="diagnosisForm.purchaseDate" 
                  type="date" 
                  required
                >
              </div>

              <div class="form-group">
                <label>{{ $t('tools.diagnosis.market') }}</label>
                <select v-model="diagnosisForm.purchaseMarket" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="US">US Market (NYSE/NASDAQ)</option>
                  <option value="HK">Hong Kong Market</option>
                  <option value="CN">China A-Share</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ $t('tools.diagnosis.type') }}</label>
                <select v-model="diagnosisForm.analysisType" required>
                  <option value="">{{ $t('tools.options.select') }}</option>
                  <option value="Comprehensive">Comprehensive Analysis</option>
                  <option value="Technical">Technical Analysis Only</option>
                  <option value="Fundamental">Fundamental Analysis Only</option>
                  <option value="Risk">Risk Assessment Only</option>
                </select>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-block"
                :disabled="diagnosisLoading"
              >
                {{ diagnosisLoading ? $t('tools.diagnosis.loading') : $t('tools.diagnosis.btn') }}
              </button>
            </form>
          </div>

          <div class="tool-results">
            <h3>{{ $t('tools.diagnosis.report') }}</h3>
            
            <div v-if="diagnosisLoading" class="loading-state">
              <div class="spinner"></div>
              <p>{{ $t('tools.diagnosis.loading') }}</p>
            </div>

            <div v-else-if="diagnosis" class="diagnosis-report">
              <!-- Overall Assessment -->
              <div class="report-section highlight">
                <h4>📋 Overall Assessment</h4>
                <div class="assessment-grid">
                  <div class="assessment-item">
                    <span class="label">Rating:</span>
                    <span :class="['value', 'rating-' + diagnosis.overallRating.toLowerCase()]">
                      {{ diagnosis.overallRating }}
                    </span>
                  </div>
                  <div class="assessment-item">
                    <span class="label">{{ $t('aiPicks.confidence') }}:</span>
                    <span class="value">{{ diagnosis.confidenceScore }}</span>
                  </div>
                  <div class="assessment-item">
                    <span class="label">Analysis Date:</span>
                    <span class="value">{{ formatDate(diagnosis.analysisDate) }}</span>
                  </div>
                </div>
              </div>

              <!-- Technical Analysis -->
              <div class="report-section">
                <h4>📊 {{ $t('tools.report.technical') }}</h4>
                <div class="analysis-content">
                  <div class="analysis-grid">
                    <div class="analysis-item">
                      <span class="label">Trend:</span>
                      <span class="value">{{ diagnosis.technicalAnalysis.trend }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">RSI:</span>
                      <span class="value">{{ diagnosis.technicalAnalysis.rsi }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">MACD:</span>
                      <span class="value">{{ diagnosis.technicalAnalysis.macd }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">Support:</span>
                      <span class="value">${{ diagnosis.technicalAnalysis.support.toFixed(2) }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">Resistance:</span>
                      <span class="value">${{ diagnosis.technicalAnalysis.resistance.toFixed(2) }}</span>
                    </div>
                  </div>
                  <p class="recommendation">{{ diagnosis.technicalAnalysis.recommendation }}</p>
                </div>
              </div>

              <!-- Fundamental Analysis -->
              <div class="report-section">
                <h4>💼 {{ $t('tools.report.fundamental') }}</h4>
                <div class="analysis-content">
                  <div class="analysis-grid">
                    <div class="analysis-item">
                      <span class="label">Valuation:</span>
                      <span class="value">{{ diagnosis.fundamentalAnalysis.valuation }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">P/E Ratio:</span>
                      <span class="value">{{ diagnosis.fundamentalAnalysis.peRatio }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">PEG Ratio:</span>
                      <span class="value">{{ diagnosis.fundamentalAnalysis.pegRatio }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">ROE:</span>
                      <span class="value">{{ diagnosis.fundamentalAnalysis.roe }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">Debt/Equity:</span>
                      <span class="value">{{ diagnosis.fundamentalAnalysis.debtToEquity }}</span>
                    </div>
                  </div>
                  <p class="recommendation">{{ diagnosis.fundamentalAnalysis.recommendation }}</p>
                </div>
              </div>

              <!-- Risk Assessment -->
              <div class="report-section risk">
                <h4>⚠️ {{ $t('tools.report.risk') }}</h4>
                <div class="analysis-content">
                  <div class="analysis-grid">
                    <div class="analysis-item">
                      <span class="label">Overall Risk:</span>
                      <span :class="['value', 'risk-' + diagnosis.riskAssessment.overallRisk.toLowerCase()]">
                        {{ diagnosis.riskAssessment.overallRisk }}
                      </span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">{{ $t('tools.report.volatility') }}:</span>
                      <span class="value">{{ diagnosis.riskAssessment.volatility }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">Beta:</span>
                      <span class="value">{{ diagnosis.riskAssessment.beta }}</span>
                    </div>
                    <div class="analysis-item">
                      <span class="label">Max Drawdown:</span>
                      <span class="value text-danger">{{ diagnosis.riskAssessment.maxDrawdown }}</span>
                    </div>
                  </div>
                  <div class="risk-list">
                    <h5>Key Risks:</h5>
                    <ul>
                      <li v-for="(risk, index) in diagnosis.riskAssessment.risks" :key="index">{{ risk }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Performance -->
              <div class="report-section">
                <h4>📈 {{ $t('tools.report.performance') }}</h4>
                <div class="performance-grid">
                  <div class="perf-item">
                    <span class="label">Since Entry</span>
                    <span :class="['value', getPerformanceClass(diagnosis.performance.sinceEntry)]">
                      {{ diagnosis.performance.sinceEntry }}
                    </span>
                  </div>
                  <div class="perf-item">
                    <span class="label">YTD</span>
                    <span :class="['value', getPerformanceClass(diagnosis.performance.ytd)]">
                      {{ diagnosis.performance.ytd }}
                    </span>
                  </div>
                  <div class="perf-item">
                    <span class="label">1 Year</span>
                    <span :class="['value', getPerformanceClass(diagnosis.performance.oneYear)]">
                      {{ diagnosis.performance.oneYear }}
                    </span>
                  </div>
                  <div class="perf-item">
                    <span class="label">3 Year</span>
                    <span :class="['value', getPerformanceClass(diagnosis.performance.threeYear)]">
                      {{ diagnosis.performance.threeYear }}
                    </span>
                  </div>
                </div>
                <p class="comparison">{{ diagnosis.performance.comparison }}</p>
              </div>

              <!-- AI Recommendations -->
              <div class="report-section highlight">
                <h4>🤖 AI Recommendations</h4>
                <div class="ai-recs-list">
                  <div v-for="(rec, index) in diagnosis.aiRecommendations" :key="index" class="ai-rec-item">
                    <div class="rec-priority" :class="'priority-' + rec.priority.toLowerCase()">
                      {{ rec.priority }}
                    </div>
                    <div class="rec-content">
                      <h5>{{ rec.action }}</h5>
                      <p>{{ rec.reasoning }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Future Outlook -->
              <div class="report-section">
                <h4>🔮 {{ $t('tools.report.future') }}</h4>
                <div class="outlook-grid">
                  <div class="outlook-item">
                    <h5>Short-term</h5>
                    <p>{{ diagnosis.outlook.shortTerm }}</p>
                  </div>
                  <div class="outlook-item">
                    <h5>Medium-term</h5>
                    <p>{{ diagnosis.outlook.mediumTerm }}</p>
                  </div>
                  <div class="outlook-item">
                    <h5>Long-term</h5>
                    <p>{{ diagnosis.outlook.longTerm }}</p>
                  </div>
                </div>
                <div class="target-price">
                  <span class="label">12-Month Target Price:</span>
                  <span class="value text-gold">${{ diagnosis.outlook.targetPrice }}</span>
                </div>
              </div>

              <!-- News Sentiment -->
              <div class="report-section">
                <h4>📰 {{ $t('tools.report.sentiment') }}</h4>
                <div class="sentiment-score">
                  <span class="label">Overall Sentiment:</span>
                  <span class="value">{{ diagnosis.newsSentiment.overall }} ({{ diagnosis.newsSentiment.score }})</span>
                </div>
                <div class="news-headlines">
                  <h5>{{ $t('tools.report.headlines') }}:</h5>
                  <ul>
                    <li v-for="(headline, index) in diagnosis.newsSentiment.recentHeadlines" :key="index">
                      {{ headline }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="disclaimer">
                <strong>⚠️ Disclaimer:</strong> This diagnosis is generated by AI for informational purposes only. Not financial advice.
              </div>
            </div>

            <div v-else class="empty-state">
              <p>👆 Enter stock information and click "Run AI Diagnosis" to get comprehensive analysis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { generateStockRecommendations, diagnoseStock as diagnoseStockAPI } from '../services/aiService'

// AI Stock Picker State
const pickerForm = ref({
  investmentStyle: '',
  riskLevel: '',
  timeHorizon: '',
  investmentAmount: '',
  investmentGoal: '',
  riskTolerance: ''
})

const pickerLoading = ref(false)
const recommendations = ref([])
const marketContext = ref(null)
const disclaimerText = ref('')

// AI Stock Diagnosis State
const diagnosisForm = ref({
  symbol: '',
  purchasePrice: '',
  purchaseDate: '',
  purchaseMarket: '',
  analysisType: ''
})

const diagnosisLoading = ref(false)
const diagnosis = ref(null)

// Methods
const generateRecommendations = async () => {
  pickerLoading.value = true
  recommendations.value = []
  
  try {
    const result = await generateStockRecommendations(pickerForm.value)
    
    if (result.success) {
      recommendations.value = result.recommendations
      marketContext.value = result.marketContext
      disclaimerText.value = result.disclaimer
    }
  } catch (error) {
    console.error('Error generating recommendations:', error)
    alert('Failed to generate recommendations. Please try again.')
  } finally {
    pickerLoading.value = false
  }
}

const diagnoseStock = async () => {
  diagnosisLoading.value = true
  diagnosis.value = null
  
  try {
    const result = await diagnoseStockAPI(diagnosisForm.value)
    
    if (result.success) {
      diagnosis.value = result.diagnosis
    }
  } catch (error) {
    console.error('Error diagnosing stock:', error)
    alert('Failed to diagnose stock. Please try again.')
  } finally {
    diagnosisLoading.value = false
  }
}

const getSignalClass = (signal) => {
  if (signal.includes('Strong Buy')) return 'strong-buy'
  if (signal.includes('Buy')) return 'buy'
  if (signal.includes('Hold')) return 'hold'
  if (signal.includes('Sell')) return 'sell'
  return 'neutral'
}

const getPerformanceClass = (value) => {
  return value.startsWith('+') ? 'text-success' : 'text-danger'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.ai-tools-page {
  min-height: 100vh;
  padding-bottom: 3rem;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-dark-blue), #0a1929);
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 3px solid var(--accent-gold);
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.tool-section {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 3rem;
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--accent-gold);
  margin-bottom: 2rem;
}

.tool-icon {
  font-size: 3rem;
}

.tool-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-gold);
}

.tool-header p {
  margin: 0;
  color: var(--text-secondary);
}

.tool-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
}

.tool-form {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 2rem;
}

.tool-form h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--accent-gold);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  background: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.tool-results {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 2rem;
  max-height: 800px;
  overflow-y: auto;
}

.tool-results h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--accent-gold);
  position: sticky;
  top: 0;
  background: var(--background-light);
  padding-bottom: 1rem;
  z-index: 1;
}

.loading-state {
  text-align: center;
  padding: 3rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-top-color: var(--accent-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--text-secondary);
}

.market-context {
  background: linear-gradient(135deg, #1a2332, #0a1929);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.market-context h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--accent-gold);
}

.context-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.context-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.context-item .label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.context-item .value {
  font-weight: 700;
  color: var(--text-primary);
}

.recommendations-list,
.diagnosis-report {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.recommendation-card {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.rec-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.rec-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--accent-gold);
}

.company-name {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.sector {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.signal-badge {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.875rem;
}

.signal-badge.strong-buy {
  background: rgba(0, 230, 118, 0.2);
  color: var(--success-green);
  border: 2px solid var(--success-green);
}

.signal-badge.buy {
  background: rgba(255, 215, 0, 0.2);
  color: var(--accent-gold);
  border: 2px solid var(--accent-gold);
}

.signal-badge.hold {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
}

.rec-prices {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.price-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
}

.price-item .label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.price-item .value {
  font-size: 1.25rem;
  font-weight: 700;
}

.rec-reasoning,
.rec-metrics,
.rec-details {
  margin-bottom: 1.5rem;
}

.rec-reasoning h5,
.rec-metrics h5,
.rec-details h5 {
  margin: 0 0 0.75rem 0;
  color: var(--accent-gold);
}

.rec-reasoning p {
  margin: 0;
  line-height: 1.6;
  color: var(--text-secondary);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.metric-value {
  font-weight: 700;
  color: var(--text-primary);
}

.rec-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.detail-section ul {
  margin: 0;
  padding-left: 1.25rem;
}

.detail-section li {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.report-section {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.report-section.highlight {
  border-color: var(--accent-gold);
  background: linear-gradient(135deg, var(--card-background), #1a2332);
}

.report-section.risk {
  border-color: #ff1744;
}

.report-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--accent-gold);
}

.assessment-grid,
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.assessment-item,
.analysis-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.assessment-item .label,
.analysis-item .label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.assessment-item .value,
.analysis-item .value {
  font-weight: 700;
  font-size: 1.125rem;
}

.rating-buy,
.rating-strong-buy {
  color: var(--success-green);
}

.rating-hold {
  color: var(--accent-gold);
}

.rating-sell {
  color: #ff1744;
}

.risk-low {
  color: var(--success-green);
}

.risk-medium {
  color: var(--accent-gold);
}

.risk-high {
  color: #ff1744;
}

.recommendation {
  margin: 1rem 0 0 0;
  padding: 1rem;
  background: var(--background-light);
  border-left: 3px solid var(--accent-gold);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.perf-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
  text-align: center;
}

.perf-item .label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.perf-item .value {
  font-size: 1.5rem;
  font-weight: 700;
}

.comparison {
  margin: 1rem 0 0 0;
  padding: 1rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--text-secondary);
}

.ai-recs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ai-rec-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
}

.rec-priority {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.75rem;
  height: fit-content;
}

.priority-high {
  background: rgba(255, 23, 68, 0.2);
  color: #ff1744;
  border: 1px solid #ff1744;
}

.priority-medium {
  background: rgba(255, 215, 0, 0.2);
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
}

.priority-low {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.rec-content h5 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.rec-content p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.outlook-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.outlook-item {
  padding: 1rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
}

.outlook-item h5 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-gold);
}

.outlook-item p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.target-price {
  padding: 1rem;
  background: linear-gradient(135deg, #1a2332, #0a1929);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.target-price .label {
  font-weight: 600;
}

.target-price .value {
  font-size: 1.5rem;
  font-weight: 700;
}

.sentiment-score {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
}

.news-headlines h5 {
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
}

.news-headlines ul {
  margin: 0;
  padding-left: 1.25rem;
}

.news-headlines li {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.disclaimer {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 1200px) {
  .tool-content {
    grid-template-columns: 1fr;
  }
  
  .tool-results {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .rec-prices,
  .metrics-grid,
  .assessment-grid,
  .analysis-grid,
  .performance-grid,
  .outlook-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .context-grid {
    grid-template-columns: 1fr;
  }
  
  .rec-details {
    grid-template-columns: 1fr;
  }
}
</style>

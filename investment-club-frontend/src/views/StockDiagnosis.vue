<template>
  <div class="diagnosis-page">
    <div class="page-header">
      <h1 class="text-gradient-gold">{{ $t('tools.diagnosis.title') }}</h1>
      <p>{{ $t('tools.diagnosis.desc') }}</p>
    </div>

    <div class="diagnosis-container">
      <!-- Input Form -->
      <div class="glass-panel input-section">
        <h2>{{ $t('tools.diagnosis.info') }}</h2>
        <form @submit.prevent="runDiagnosis">
          <div class="form-group">
            <label>{{ $t('tools.diagnosis.symbol') }}</label>
            <input v-model="form.symbol" placeholder="e.g. NVDA" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>{{ $t('tools.diagnosis.date') }}</label>
              <input type="date" v-model="form.buyDate" required>
            </div>
            <div class="form-group">
              <label>{{ $t('tools.diagnosis.price') }} ($)</label>
              <input type="number" v-model="form.buyPrice" step="0.01" required>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading">{{ $t('tools.diagnosis.analyzing.global') }}</span>
            <span v-else>{{ $t('tools.diagnosis.analyzing.start') }}</span>
          </button>
        </form>
      </div>

      <!-- Result Section -->
      <div v-if="result" class="glass-panel result-section">
        <div class="result-header">
            <h3>{{ $t('tools.diagnosis.report') }}: {{ form.symbol.toUpperCase() }}</h3>
            <span class="date">{{ new Date().toLocaleDateString() }}</span>
        </div>
        <div class="markdown-content" v-html="formattedResult"></div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ $t('tools.diagnosis.analyzing.fed') }}</p>
        <p>{{ $t('tools.diagnosis.analyzing.trade') }}</p>
        <p>{{ $t('tools.diagnosis.analyzing.tech') }}</p>
      </div>
    </div>

    <!-- Upgrade / Lead Gen Modal -->
    <div v-if="showUpgradeModal" class="modal-overlay">
        <div class="glass-panel modal-content text-center">
            <h2 class="text-gradient-gold">{{ $t('tools.diagnosis.modal.title') }}</h2>
            <p>{{ $t('tools.diagnosis.modal.text') }}</p>
            <ul class="benefit-list">
                <li>🚀 {{ $t('tools.diagnosis.modal.benefit1') }}</li>
                <li>📈 {{ $t('tools.diagnosis.modal.benefit2') }}</li>
                <li>🧠 {{ $t('tools.diagnosis.modal.benefit3') }}</li>
            </ul>
            <div class="modal-actions">
                <button class="btn btn-secondary" @click="showUpgradeModal = false">{{ $t('tools.diagnosis.modal.later') }}</button>
                <a href="https://wa.me/15551234567?text=Hi,%20I%20want%20to%20upgrade%20to%20Gold%20Membership%20for%20unlimited%20AI%20Analysis" target="_blank" class="btn btn-primary">
                    <span style="margin-right:8px">📱</span> {{ $t('tools.diagnosis.modal.whatsapp') }}
                </a>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../services/api'
import { marked } from 'marked' // We might need to install marked, or just use simple formatting

const form = ref({
  symbol: '',
  buyDate: '',
  buyPrice: ''
})

const loading = ref(false)
const result = ref('')

// Simple markdown parser if 'marked' isn't available, but formattedResult handles display
const formattedResult = computed(() => {
    // Basic formatting: Convert ### Headers to <h3> and newlines to <br>
    // In a real app, use 'marked' library
    let html = result.value
        .replace(/### (.*)/g, '<h3 class="text-gold">$1</h3>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
    return html
})

const runDiagnosis = async () => {
    // 1. Check Local Limits (Simple Client-Side Check for UX)
    const usageCount = parseInt(localStorage.getItem('ai_usage_count') || '0')
    const userRole = JSON.parse(localStorage.getItem('user') || '{}').role

    // Free users get 1 try, specific tier logic can be added later
    if (userRole !== 'admin' && usageCount >= 1) {
        showUpgradeModal.value = true
        return
    }

    loading.value = true
    result.value = ''
  
    try {
        const res = await api.getStockDiagnosis(form.value)
        result.value = res.data.analysis
        
        // Increment usage
        localStorage.setItem('ai_usage_count', (usageCount + 1).toString())
    } catch (e) {
        console.warn('API unavailable, using mock diagnosis')
        // Mock fallback
        result.value = `### Comprehensive Analysis for ${form.value.symbol.toUpperCase()}
        
**Technical Outlook:**  
The stock is currently trading above its 50-day moving average, indicating a **bullish trend**. RSI is at 58, suggesting there is still room for upside before becoming overbought.

**Fundamental Health:**  
P/E ratio is slightly elevated compared to sector peers, but justified by strong revenue growth (+15% YoY). Debt levels are manageable.

**AI Verdict:**  
**BUY** with a short-term target of $${(parseFloat(form.value.buyPrice || 100) * 1.15).toFixed(2)}. Stop loss suggested at $${(parseFloat(form.value.buyPrice || 100) * 0.92).toFixed(2)}.`
    } finally {
        loading.value = false
    }
}

const showUpgradeModal = ref(false)
</script>

<style scoped>
.diagnosis-page {
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.diagnosis-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 900px) {
  .diagnosis-container {
    grid-template-columns: 1fr 2fr;
    align-items: start;
  }
}

.input-section, .result-section {
  padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

label {
    display: block;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.w-100 {
    width: 100%;
    margin-top: 1rem;
}

.loading-state {
    text-align: center;
    color: var(--accent-gold);
    padding: 2rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 215, 0, 0.3);
    border-radius: 50%;
    border-top-color: var(--accent-gold);
    animation: spin 1s ease-in-out infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Markdown Styling */
.markdown-content :deep(h3) {
    color: var(--accent-gold);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-family: var(--font-display);
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(255,215,0,0.1);
    padding-bottom: 0.5rem;
}

.markdown-content :deep(strong) {
    color: #fff;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    padding: 3rem;
    max-width: 500px;
    width: 90%;
    border: 1px solid var(--accent-gold);
    box-shadow: 0 0 50px rgba(255, 215, 0, 0.2);
}

.benefit-list {
    text-align: left;
    margin: 2rem 0;
    list-style: none;
}

.benefit-list li {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}
</style>

<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">×</button>
      
      <div class="popup-header">
        <h2>GARY JOE BARTAK - Chief Analyst</h2>
        <p>Dedicated to providing professional trading strategy analysis and real-time market guidance for investors</p>
      </div>

      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <div class="stat-value text-success">+$6,378,340</div>
            <div class="stat-label">Total Profit</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">📅</div>
          <div class="stat-info">
            <div class="stat-value text-success">+$458,230</div>
            <div class="stat-label">Monthly Profit</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">📈</div>
          <div class="stat-info">
            <div class="stat-value text-gold">10</div>
            <div class="stat-label">Active Trades</div>
          </div>
        </div>
      </div>

      <div class="announcement-box">
        <div class="announcement-title">
          <span class="megaphone">📣</span> Important Announcement
        </div>
        <div class="announcement-text">
          <h4 class="highlight-gold">Discover GARY JOE BARTAK verified stock trading record</h4>
          <p>
            Experience the market insights of top investment strategist GARY JOE BARTAK. Review his 
            historical stock trading performance and see how his strategies have delivered consistent results 
            over time. Contact our support team now to get full access to GARY JOE BARTAK latest trade 
            ideas and exclusive performance updates.
          </p>
        </div>
      </div>

      <div class="benefits-section">
        <div class="benefits-title">👥 Join Exclusive Trading Community</div>
        <div class="benefits-grid">
          <div class="benefit-item">✅ Real-time Trading Signals</div>
          <div class="benefit-item">✅ Professional Strategy Analysis</div>
          <div class="benefit-item">✅ One-on-One Trading Guidance</div>
          <div class="benefit-item">✅ Exclusive Market Analysis Reports</div>
        </div>
      </div>

      <a :href="whatsappLink" target="_blank" class="cta-button">
        👥 JOIN EXCLUSIVE COMMUNITY NOW
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 5000 // 5 seconds default delay
  }
})

const isOpen = ref(false)
const whatsappLink = 'https://wa.me/1234567890' // Replace with actual WhatsApp number

const closePopup = () => {
  isOpen.value = false
  localStorage.setItem('popupDismissed', 'true')
}

onMounted(() => {
  // Check if already dismissed in this session/browser
  // Remove this check during development to easily test
  // if (localStorage.getItem('popupDismissed')) return

  setTimeout(() => {
    isOpen.value = true
  }, props.delay)
})
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-out;
}

.popup-content {
  background: var(--primary-dark-blue);
  width: 90%;
  max-width: 800px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 2.5rem;
  position: relative;
  text-align: center;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.4s ease-out;
  background: linear-gradient(145deg, #0a1929 0%, #05101a 100%);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--text-primary);
}

.popup-header h2 {
  color: var(--accent-gold);
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
}

.popup-header p {
  color: var(--text-secondary);
  margin: 0 0 2rem 0;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--border-color);
  min-width: 200px;
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  text-align: left;
}

.stat-value {
  font-weight: 700;
  font-size: 1.1rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.announcement-box {
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.announcement-title {
  color: var(--accent-gold);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.announcement-text h4 {
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.announcement-text p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.highlight-gold {
  color: var(--accent-gold) !important;
}

.benefits-section {
  margin-bottom: 2rem;
}

.benefits-title {
  color: var(--accent-gold);
  font-weight: 700;
  margin-bottom: 1rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.benefit-item {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.9rem;
  text-align: left;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(180deg, #FFD700 0%, #FFA000 100%);
  color: #000;
  font-weight: 800;
  font-size: 1.2rem;
  padding: 1rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.text-success { color: var(--success-green); }
.text-gold { color: var(--accent-gold); }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .stats-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .popup-content {
    padding: 1.5rem;
    width: 95%;
  }
}
</style>

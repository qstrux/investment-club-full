<template>
  <div class="home">
    <div class="hero-section">
        <div class="hero-content text-center">
            <h1>{{ $t('home.heroTitle') }}</h1>
            <p>{{ $t('home.heroSubtitle') }}</p>
            <div class="hero-buttons">
                <router-link to="/traders" class="btn btn-primary">{{ $t('home.exploreTraders') }}</router-link>
                <router-link to="/leaderboard" class="btn btn-secondary">{{ $t('home.joinClub') }}</router-link>
            </div>
        </div>
    </div>
    
    <div class="container main-content">
        <!-- Chief Analyst Section -->
        <section class="analyst-section mb-5" v-if="chiefAnalyst">
            <h2 class="text-gradient-gold">{{ $t('home.chiefAnalyst') }}</h2>
            <div class="glass-panel analyst-card">
                <img :src="chiefAnalyst.avatar" alt="Chief Analyst" class="analyst-avatar">
                <div class="analyst-info">
                    <h3>{{ chiefAnalyst.name }}</h3>
                    <p class="role">Chief Market Strategist</p>
                    <p class="bio">{{ chiefAnalyst.bio }}</p>
                    <div class="stats-grid">
                         <div class="stat">
                            <span class="label">{{ $t('home.specialization') }}</span>
                            <span class="value">{{ chiefAnalyst.specialization }}</span>
                        </div>
                        <div class="stat">
                            <span class="label">{{ $t('home.experience') }}</span>
                            <span class="value">{{ chiefAnalyst.experience }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Top Traders Preview -->
        <section class="traders-section mb-5">
            <h2>{{ $t('home.exploreTraders') }}</h2>
            <div class="grid-3">
                <div v-for="trader in topTraders" :key="trader.id" class="card trader-card">
                     <img :src="trader.avatar" :alt="trader.name" class="trader-avatar">
                     <h3>{{ trader.name }}</h3>
                     <p class="strategy">{{ trader.strategy }}</p>
                     <div class="roi">
                        <span class="label">Monthly Return</span>
                        <span class="value text-success">{{ trader.monthlyPnL }}</span>
                     </div>
                     <router-link :to="'/traders/' + trader.id" class="btn btn-outline btn-sm">View Profile</router-link>
                </div>
            </div>
        </section>

        <!-- AI Stock Picks Preview -->
        <section class="ai-section mb-5">
             <h2>{{ $t('home.latestAIPicks') }}</h2>
             <div class="table-responsive glass-panel">
                 <table>
                     <thead>
                         <tr>
                             <th>{{ $t('home.ticker') }}</th>
                             <th>{{ $t('home.entryDate') }}</th>
                             <th>{{ $t('home.entryPrice') }}</th>
                             <th>{{ $t('home.targetPrice') }}</th>
                             <th>{{ $t('home.aiConfidence') }}</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="pick in aiPicks" :key="pick.id">
                             <td class="text-gold fw-bold">{{ pick.ticker }}</td>
                             <td>{{ pick.date }}</td>
                             <td>{{ pick.entryPrice }}</td>
                             <td class="text-success">{{ pick.targetPrice }}</td>
                             <td>
                                 <div class="confidence-bar">
                                     <div class="fill" :style="{width: pick.confidence + '%'}"></div>
                                     <span>{{ pick.confidence }}%</span>
                                 </div>
                             </td>
                         </tr>
                     </tbody>
                 </table>
             </div>
        </section>

        <!-- Latest Videos Section -->
        <section class="videos-section mb-5">
            <h2>{{ $t('home.latestVideos') }}</h2>
            <div v-if="recentVideos.length > 0" class="grid-3">
                <div v-for="video in recentVideos" :key="video.id" class="video-card card">
                    <div class="video-thumbnail">
                        <!-- Use a placeholder if thumbnail is missing, or the real thumbnail -->
                        <img :src="video.thumbnail || 'https://via.placeholder.com/300x170?text=Video'" :alt="video.title">
                        <span class="video-duration">{{ video.duration }}</span>
                    </div>
                    <div class="video-content">
                        <h4>{{ video.title }}</h4>
                        <p class="video-meta">{{ video.date }} • {{ video.views }} views</p>
                        <router-link to="/videos" class="btn btn-sm btn-outline">{{ $t('home.latestVideos') }}</router-link> 
                    </div>
                </div>
            </div>
            <div v-else class="text-center text-muted">
                No videos available at the moment.
            </div>
        </section>
        
        <!-- Recent Trading Records -->
        <section class="records-section mb-5">
            <h2>{{ $t('home.tradingRecords') }}</h2>
             <div class="glass-panel">
                <table class="table">
                    <thead>
                        <tr>
                            <th>{{ $t('home.ticker') }}</th>
                            <th>Type</th>
                            <th>Open</th>
                            <th>Close</th>
                            <th>{{ $t('home.profit') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="record in tradingRecords" :key="record.id">
                            <td>{{ record.symbol }}</td>
                            <td :class="record.type === 'Buy' ? 'text-success' : 'text-danger'">{{ record.type }}</td>
                            <td>{{ record.entryPrice }}</td>
                            <td>{{ record.exitPrice }}</td>
                            <td :class="record.pnl.includes('+') ? 'text-success' : 'text-danger'">{{ record.pnl }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api' 

const topTraders = ref([])
const aiPicks = ref([])
const announcements = ref([])
const chiefAnalyst = ref(null)
const tradingRecords = ref([])
const recentVideos = ref([])

onMounted(async () => {
  try {
    const [tradersRes, aiRes, annRes, analystRes, recordsRes, videosRes] = await Promise.all([
      api.getTraders(),
      api.getAIPicks(),
      api.getAnnouncements(),
      api.getChiefAnalyst(),
      api.getTradingRecords(),
      api.getVideos()
    ])

    topTraders.value = tradersRes.data.slice(0, 3)
    aiPicks.value = aiRes.data.slice(0, 3)
    announcements.value = annRes.data.slice(0, 3)
    chiefAnalyst.value = analystRes.data
    tradingRecords.value = recordsRes.data.slice(0, 3)
    
    // Process videos: take first 3
    if (videosRes.data && Array.isArray(videosRes.data)) {
        recentVideos.value = videosRes.data.slice(0, 3)
    }
  } catch (error) {
    console.error('Failed to load home data:', error)
  }
})
</script>

<style scoped>
.hero-section {
    padding: 6rem 0;
    /* background: url('@/assets/hero-bg.jpg') center/cover no-repeat;  Optional: Add a real bg image */
    background: radial-gradient(circle at center, rgba(17, 34, 64, 0.8) 0%, #020c1b 100%);
    margin-bottom: 3rem;
}

.hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #FFD700 0%, #FFF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.hero-content p {
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto 2rem;
    color: var(--text-secondary);
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

.analyst-card {
    display: flex;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
}

.analyst-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid var(--accent-gold);
    object-fit: cover;
}

.analyst-info h3 {
    margin-bottom: 0.25rem;
    color: var(--accent-gold);
}

.analyst-info .role {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stats-grid {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
}

.stats-grid .stat {
    display: flex;
    flex-direction: column;
}

.stats-grid .label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.stats-grid .value {
    font-size: 1.1rem;
    color: var(--text-primary);
    font-weight: 600;
}

.trader-card {
    text-align: center;
    padding: 2rem;
}

.trader-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 2px solid var(--glass-border);
}

.confidence-bar {
    background: rgba(255, 255, 255, 0.1);
    height: 6px;
    border-radius: 3px;
    margin-top: 5px;
    width: 100px;
    position: relative;
}

.confidence-bar .fill {
    background: var(--success);
    height: 100%;
    border-radius: 3px;
}
.confidence-bar span {
    position: absolute;
    right: -35px;
    top: -8px;
    font-size: 0.8rem;
    color: var(--success);
}

/* Video Card Styles */
.video-card {
    display: flex;
    flex-direction: column;
    padding: 0; /* Remove padding for image bleed */
}

.video-thumbnail {
    position: relative;
    width: 100%;
    height: 180px;
    overflow: hidden;
}

.video-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.video-card:hover .video-thumbnail img {
    transform: scale(1.05);
}

.video-duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0,0,0,0.8);
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
}

.video-content {
    padding: 1.25rem;
}

.video-content h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

.video-meta {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .analyst-card {
        flex-direction: column;
        text-align: center;
    }
    
    .stats-grid {
        justify-content: center;
    }
}
</style>

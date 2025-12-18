<template>
  <div class="videos-page">
    <div class="container">
      
      <!-- Featured Video Section -->
      <section v-if="featuredVideo" class="featured-section">
        <div class="featured-content">
          <div class="featured-badge">🔥 {{ $t('videos.featured') }}</div>
          <h1>{{ featuredVideo.title }}</h1>
          <p class="featured-desc">{{ featuredVideo.description }}</p>
          <div class="meta-row">
            <span>👤 {{ featuredVideo.author }}</span>
            <span>⏱️ {{ featuredVideo.duration }}</span>
            <span>👁️ {{ featuredVideo.views }} {{ $t('videos.views') }}</span>
          </div>
          <button class="btn btn-primary play-btn-lg">
            ▶ {{ $t('videos.watch') }}
          </button>
        </div>
        <div class="featured-thumbnail">
          <img :src="featuredVideo.thumbnail" :alt="featuredVideo.title">
          <div class="play-overlay">▶</div>
        </div>
      </section>

      <!-- Category Filter -->
      <div class="category-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat.key"
          :class="['tab-btn', { active: currentCategory === cat.key }]"
          @click="currentCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Video Grid -->
      <div class="video-grid">
        <div v-for="video in filteredVideos" :key="video.id" class="video-card">
          <div class="thumbnail-wrapper">
            <div class="thumbnail-container">
               <img :src="video.thumbnail" :alt="video.title" class="video-thumbnail">
               <div class="play-button">▶</div>
            </div>
            <div class="duration-badge">{{ video.duration }}</div>
          </div>
          <div class="video-info">
            <div class="video-cat">{{ video.category }}</div>
            <h3>{{ video.title }}</h3>
            <div class="video-meta">
              <span>{{ video.views }} {{ $t('videos.views') }}</span>
              <span>•</span>
              <span>{{ formatDate(video.publishDate) }}</span>
            </div>
            <div class="video-author">{{ $t('videos.author') }} {{ video.author }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { mockVideos } from '../services/mockData'
import api from '../services/api'

const { t } = useI18n()
const videos = ref([])
const currentCategory = ref('all')

// Define categories with keys for localization
const categories = computed(() => [
  { key: 'all', label: t('videos.categories.all') },
  { key: 'Market Analysis', label: t('videos.categories.market') },
  { key: 'Tutorials', label: t('videos.categories.tutorials') },
  { key: 'Live Sessions', label: t('videos.categories.live') }
])

onMounted(async () => {
  try {
    const response = await api.getVideos()
    videos.value = response.data
  } catch (error) {
    console.warn('API unavailable, using mock data')
    videos.value = mockVideos
  }
})

const featuredVideo = computed(() => videos.value.find(v => v.isFeatured) || videos.value[0])

const filteredVideos = computed(() => {
  if (currentCategory.value === 'all') return videos.value
  return videos.value.filter(v => v.category === currentCategory.value)
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.videos-page {
  padding: 2rem 0;
  background: var(--background-dark);
}

/* Featured Section */
.featured-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
}

.featured-badge {
  background: rgba(255, 69, 0, 0.2);
  color: #ff4500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: bold;
}

.featured-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.featured-desc {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.meta-row {
  display: flex;
  gap: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.play-btn-lg {
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
}

.featured-thumbnail {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border: 1px solid var(--border-color);
}

.featured-thumbnail img {
  width: 100%;
  display: block;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 215, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #000;
  cursor: pointer;
  transition: transform 0.3s;
}

.featured-thumbnail:hover .play-overlay {
  transform: translate(-50%, -50%) scale(1.1);
}

/* Tabs */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tab-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active, .tab-btn:hover {
  background: var(--accent-gold);
  color: var(--primary-dark-blue);
  border-color: var(--accent-gold);
}

/* Grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.video-card {
  background: var(--card-background);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: transform 0.3s;
}

.video-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-gold);
}

.thumbnail-wrapper {
  position: relative;
}

.thumbnail-container {
  aspect-ratio: 16/9;
  background: #000;
  overflow: hidden;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.video-card:hover .video-thumbnail {
  opacity: 1;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .play-button {
  opacity: 1;
}

.duration-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.8);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.video-info {
  padding: 1.25rem;
}

.video-cat {
  color: var(--accent-gold);
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.video-info h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.video-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  padding-top: 0.75rem;
}

.video-author {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .featured-section {
    grid-template-columns: 1fr;
  }
}
</style>

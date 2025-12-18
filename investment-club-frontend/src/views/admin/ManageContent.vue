<template>
  <div class="manage-content">
    <div class="header-actions">
      <h1>Manage Videos</h1>
      <button class="btn btn-primary" @click="showAddModal = true">+ Add Video</button>
    </div>

    <div class="content-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id">
            <td>{{ video.title }}</td>
            <td><span class="badge">{{ video.category }}</span></td>
            <td>{{ video.author }}</td>
            <td>{{ video.views }}</td>
            <td>
              <button class="btn-icon delete" @click="deleteVideo(video.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Simple Add Modal -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>Add New Video</h2>
        <form @submit.prevent="addVideo">
          <div class="form-group">
            <label>Title</label>
            <input v-model="newVideo.title" required>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select v-model="newVideo.category">
              <option>Market Analysis</option>
              <option>Tutorials</option>
              <option>Live Sessions</option>
            </select>
          </div>
          <div class="form-group">
            <label>Author</label>
            <input v-model="newVideo.author" required>
          </div>
          <div class="form-group">
            <label>Thumbnail Image</label>
            <input type="file" @change="handleFileUpload" accept="image/*">
            <div v-if="uploading">Uploading...</div>
            <div v-if="newVideo.thumbnail" class="preview">
                <img :src="newVideo.thumbnail" alt="Preview" style="max-width: 100px; margin-top: 10px;">
            </div>
            <input type="hidden" v-model="newVideo.thumbnail" required>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showAddModal = false">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="uploading">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const videos = ref([])
const showAddModal = ref(false)
const uploading = ref(false)
const newVideo = ref({
  title: '',
  category: 'Market Analysis',
  author: 'Gary Joe Bartak',
  thumbnail: '',
  views: '0',
  duration: '10:00',
  isFeatured: false,
  publishDate: new Date().toISOString().split('T')[0]
})

const loadVideos = async () => {
  const res = await api.getVideos()
  videos.value = res.data
}

const deleteVideo = async (id) => {
  if (confirm('Are you sure you want to delete this video?')) {
    try {
      await api.deleteVideo(id)
      await loadVideos()
    } catch (e) {
      alert('Failed to delete')
    }
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true
  try {
    const res = await api.uploadImage(file)
    newVideo.value.thumbnail = res.data.fileUrl
  } catch (e) {
    console.error(e)
    alert('Upload failed')
  } finally {
    uploading.value = false
  }
}

const addVideo = async () => {
  try {
    await api.createVideo(newVideo.value)
    showAddModal.value = false
    // Reset form but keep default helper values
    newVideo.value = { 
        title: '', 
        category: 'Market Analysis', 
        author: 'Gary Joe Bartak', 
        thumbnail: '',
        views: '0',
        duration: '10:00',
        isFeatured: false,
        publishDate: new Date().toISOString().split('T')[0]
    }
    await loadVideos()
  } catch (e) {
    alert('Failed to add video')
  }
}

onMounted(loadVideos)
</script>

<style scoped>
.manage-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.btn-icon {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem;
}

.btn-icon:hover {
  background: #fee;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
</style>

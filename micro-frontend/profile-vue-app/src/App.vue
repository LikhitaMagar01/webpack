<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Profile {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

const profile = ref<Profile | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const isProfileOpen = ref(false)

const fetchProfile = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:5000/api/profiles/profile/67d8de3b8dee8c582a5a3099')
    profile.value = response.data
    console.log('Profile data:', response.data)
  } catch (err) {
    error.value = 'Failed to load profile'
    console.error('Error fetching profile:', err)
  } finally {
    loading.value = false
  }
}

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center p-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-500">Loading profile...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <div class="text-red-500">{{ error }}</div>
      </div>

      <!-- Avatar -->
      <div v-else-if="profile" class="text-center">
        <button 
          @click="toggleProfile"
          class="relative inline-block group focus:outline-none"
        >
          <img
            :src="profile.avatar || 'https://www.gravatar.com/avatar/?d=mp'"
            :alt="profile.name"
            class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-200 transform group-hover:scale-105"
          />
          <div class="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
          <p class="mt-2 text-sm text-gray-600">Click to view profile</p>
        </button>
      </div>

      <!-- No Profile State -->
      <div v-else class="text-center">
        <p class="text-gray-500">No profile data available</p>
      </div>
    </div>

    <!-- Profile Sidebar -->
    <div 
      v-if="profile && isProfileOpen"
      class="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': isProfileOpen, 'translate-x-full': !isProfileOpen }"
    >
      <div class="p-6">
        <!-- Close Button -->
        <button 
          @click="toggleProfile"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Profile Content -->
        <div class="mt-8">
          <div class="flex flex-col items-center">
            <img
              :src="profile.avatar || 'https://www.gravatar.com/avatar/?d=mp'"
              :alt="profile.name"
              class="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <h2 class="mt-4 text-xl font-bold text-gray-900">{{ profile.name }}</h2>
            <p class="text-gray-500">{{ profile.email }}</p>
          </div>

          <!-- Bio -->
          <div v-if="profile.bio" class="mt-6">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Bio</h3>
            <p class="mt-2 text-gray-600">{{ profile.bio }}</p>
          </div>

          <!-- Additional Profile Info -->
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Profile Info</h3>
            <div class="mt-2 space-y-3">
              <div class="flex items-center text-gray-600">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Member since {{ new Date().getFullYear() }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ profile.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style> 
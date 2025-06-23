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
const todoContainer = ref<HTMLElement | null>(null)

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

const closeProfile = () => {
  isProfileOpen.value = false
}

onMounted(async () => {
  await fetchProfile()
  
  // Load the React Todo App
  if (todoContainer.value) {
    try {
      const { mount } = await import('todoApp/TodoApp')
      mount(todoContainer.value)
    } catch (err) {
      console.error('Error loading Todo App:', err)
      todoContainer.value.innerHTML = 'Error loading Todo application'
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Micro Frontend App</h1>
          </div>

          <div v-if="profile" class="flex items-center space-x-3">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ profile.name }}</p>
              <p class="text-xs text-gray-500">{{ profile.email }}</p>
            </div>
            <button 
              @click="toggleProfile"
              class="relative group"
            >
              <img
                :src="profile.avatar || 'https://www.gravatar.com/avatar/?d=mp'"
                :alt="profile.name"
                class="h-12 w-12 rounded-full object-cover border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              />
              <div class="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Loading profile...</span>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Profile</h3>
        <p class="text-red-600">{{ error }}</p>
      </div>

      <div v-else class="space-y-8">
        <div v-if="profile" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
            <div class="flex items-center space-x-6">
              <img
                :src="profile.avatar || 'https://www.gravatar.com/avatar/?d=mp'"
                :alt="profile.name"
                class="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div class="text-white">
                <h2 class="text-2xl font-bold">{{ profile.name }}</h2>
                <p class="text-blue-100">{{ profile.email }}</p>
                <p v-if="profile.bio" class="text-blue-100 mt-2">{{ profile.bio }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Todo App Section -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Todo List
            </h2>
          </div>
          <div class="p-6">
            <div ref="todoContainer" class="min-h-[400px]"></div>
          </div>
        </div>
      </div>
    </main>

    <!-- Backdrop Overlay -->
    <div 
      v-if="isProfileOpen"
      @click="closeProfile"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
    ></div>

    <!-- Profile Drawer -->
    <div 
      class="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50"
      :class="{ 'translate-x-0': isProfileOpen, 'translate-x-full': !isProfileOpen }"
    >
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-white">Profile Details</h3>
          <button 
            @click="closeProfile"
            class="text-white hover:text-blue-100 transition-colors duration-200"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 overflow-y-auto h-full">
        <div v-if="profile" class="space-y-6">
          <div class="flex flex-col items-center">
            <div class="relative">
              <img
                :src="profile.avatar || 'https://www.gravatar.com/avatar/?d=mp'"
                :alt="profile.name"
                class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 class="mt-4 text-2xl font-bold text-gray-900">{{ profile.name }}</h2>
            <p class="text-gray-500">{{ profile.email }}</p>
          </div>

          <!-- Bio Section -->
          <div v-if="profile.bio" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Bio</h3>
            <p class="text-gray-600">{{ profile.bio }}</p>
          </div>

          <!-- Profile Info -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Profile Information</h3>
            
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Member since</p>
                  <p class="text-sm text-gray-500">{{ new Date().getFullYear() }}</p>
                </div>
              </div>

              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Email</p>
                  <p class="text-sm text-gray-500">{{ profile.email }}</p>
                </div>
              </div>

              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Last active</p>
                  <p class="text-sm text-gray-500">Just now</p>
                </div>
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
<template>
  <div class="sidebar">
    <h2>Navigation</h2>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/profile/123">Profile</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// No script needed for simple navigation
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #f4f4f4;
  padding: 20px;
  height: 100vh;
  border-right: 1px solid #ddd;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #333;
  padding: 10px;
  display: block;
  border-radius: 4px;
}

a:hover, a.router-link-active {
  background: #ddd;
}
</style>

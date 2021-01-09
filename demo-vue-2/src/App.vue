<template>
  <div id="app">
    <button @click="showSwipeModal = 'open'">show swipe modal</button>
    <swipe-modal v-model="showSwipeModal">
      <template v-slot:header>
        <span>test content</span>
      </template>
      <template v-slot:body>
        lorekrepdsfsdfk lklskadfn sadfjkdfff
      </template>
      <template v-slot:footer>
        <button>
          test
        </button>
      </template>
    </swipe-modal>
  </div>
</template>

<script>
import SwipeModal from '@/components/SwipeModal'

export default {
  name: 'App',
  components: {
    SwipeModal
  },
  data: () => ({
    showSwipeModal: 'closed'
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

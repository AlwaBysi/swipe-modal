<template>
  <button @click="data.showSwipeModal = 'open'">Toggle Modal</button>
  <swipe-modal v-model:modal-state="data.showSwipeModal">
    <template v-slot:header>
      <span>test content</span>
    </template>
    <template v-slot:body>
      lorekrepdsfsdfk lklskadfn sadfjkdfff
    </template>
    <template v-slot:footer>
      <button @click="methods.buttonClickedInModal">
        test
      </button>
    </template>
  </swipe-modal>
</template>

<script lang="ts">
import {defineComponent, reactive } from 'vue';
import SwipeModal from './components/SwipeModal.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const data = reactive({
      showSwipeModal: ''
    })

    const methods = {
      buttonClickedInModal () {
        console.log('button clicked in modal')
        data.showSwipeModal = 'closed'
      }
    }

    return {data, methods}
  },
  components: {
    SwipeModal
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

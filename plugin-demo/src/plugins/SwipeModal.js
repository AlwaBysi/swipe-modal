import { createApp, h } from 'vue'

// const createSwipeModal = () => {
//   return createApp({
//     render () {
//       return h('div', { id: 'swipeModal' })
//     }
//   })
// }

const swipeModal = {
  install (app) {
    // let $el
    // $el = document.querySelector('#swipe-modal')

    // if (!$el) $el = createSwipeModal()

    const loadingParent = document.createElement('div');
    loadingParent.id = 'swipe-modal';
    document.body.appendChild(loadingParent);
    // $el.mount('#swipe-modal');
    const data = () => ({
      positionStart: 0,
      modalPosition: 500,
      bottomPositionPrev: 0,
      movingUp: false,
      touchStart: false,
      clickInsideModal: false,
      mobileDevice: false
    })

    app.provide('swipeModal', data)
  }
}

export default swipeModal

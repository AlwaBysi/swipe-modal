import { App } from 'vue'
import SwipeModal from './SwipeModal.vue'

const PLUGIN_NAME = 'SwipeModal'
const CLASS_NAME = 'swipe-modal'

interface Provide {
  teleportTarget: string;
}

interface PluginOptions {
  teleportTarget: string;
  modalComponent: string;
}

export default {
  install (app: App, options = {}) {
    const {
      teleportTarget = '',
      modalComponent = PLUGIN_NAME
    } = options as PluginOptions

    if (!teleportTarget) return console.error('teleportTarget is required.')

    app.provide(PLUGIN_NAME, {
      teleportTarget
    })

    app.component(modalComponent, SwipeModal)
  }
}

export type { PluginOptions, Provide }
export { PLUGIN_NAME, CLASS_NAME }

<template>
  <div>
    <transition name="swipe-overflow">
      <div class="swipe-modal__overflow"
           v-if="modalOpened"
           @click="closeModal"
           @touchmove="e => e.preventDefault()"
      ></div>
    </transition>
    <div class="swipe-modal__wrap"
         @touchmove="touchmove"
         @touchstart="touchstart"
         @touchend="touchend"
         :style="[ { bottom: `-${modalPosition}px`, transition: actualAnimation } ]"
         @click="$emit('modal-click')">
      <div class="swipe-modal__content">
        <div v-if="showSwipeLine && mobileDevice" class="swipe-modal__swipe-line" :style="{ background: 'white' }"></div>

        <div v-if="!mobileDevice" @click="closeModal" class="swipe-modal__close-icon"></div>

        <div class="swipe-modal__content__header">
          <slot name="header"></slot>
        </div>

        <div class="swipe-modal__content__body" :class="[ bodyClassesList ]">
          <slot name="body"></slot>
        </div>

        <div class="swipe-modal__content__footer" :class="[footerClassesList]">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
const BOTTOM_POSITION_HIDDEN_MODAL = 500
const MODAL_STATES = {
  open: 'open',
  closed: 'closed'
}

const mobileAndTabletCheck = () => {
  let check = false;
  /* eslint-disable */
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check
}

export default {
  name: 'SwipeModal',
  props: {
    value: {
      type: String,
      default: ''
    },
    bodyClassesList: {
      type: String,
      default: ''
    },
    footerClassesList: {
      type: String,
      default: ''
    },
    showSwipeLine: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    positionStart: 0,
    modalPosition: BOTTOM_POSITION_HIDDEN_MODAL,
    bottomPositionPrev: 0,
    movingUp: false,
    touchStart: false,
    clickInsideModal: false,
    mobileDevice: false
  }),
  computed: {
    modalOpened () {
      return this.value === MODAL_STATES.open
    },
    actualAnimation () {
      return this.touchStart ? `all 0s linear` : `all .3s ease-in`
    }
  },
  mounted() {
    this.mobileDevice = mobileAndTabletCheck()
  },
  methods: {
    changevalue (value) {
      this.$emit('input', value)
    },
    closeModal () {
      this.changevalue(MODAL_STATES.closed)
      this.setBodyStyle()
      this.setBottomPosition(BOTTOM_POSITION_HIDDEN_MODAL)
    },
    setBottomPosition (value) {
      this.modalPosition = value
      this.bottomPositionPrev = value
    },
    openModal() {
      this.changevalue(MODAL_STATES.open)
      this.setBottomPosition(0)
    },
    checkMovingUp () {
      return this.modalPosition < this.bottomPositionPrev
    },
    touchstart (event) {
      this.touchStart = true
      this.positionStart = event.touches[0].clientY
      this.clickInsideModal = true
    },
    touchmove (event) {
      event.preventDefault()
      const touchPosition = event.touches[0].clientY
      const step = touchPosition - this.positionStart;

      this.clickInsideModal = false
      this.positionStart = touchPosition;
      this.modalPosition += step
      this.movingUp = this.checkMovingUp()
      this.bottomPositionPrev = this.modalPosition
    },
    touchend () {
      if (this.clickInsideModal) {
        this.touchStart = false
        return
      }

      this.movingUp
          ? this.openModal()
          : this.closeModal();

      setTimeout(() => {
        this.touchStart = false
      }, 100)
    },
    setBodyStyle (style = 'auto') {
      document.getElementsByTagName('body')[0].style.overflow = style
    }
  },
  watch: {
    value (newValue) {
      newValue === 'open'
          ? this.openModal()
          : this.closeModal()
    }
  }
}
</script>

<style scoped lang="scss">
.swipe-overflow-enter-active {
  transition: opacity .5s;
}

.swipe-overflow-leave-active {
  transition: opacity .3s;
}

.swipe-overflow-enter, .swipe-overflow-leave-to {
  opacity: 0;
}

.swipe-modal {
  &__overflow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 1000000;
    opacity: 1;
  }

  &__close-icon {
    position: absolute;
    width: 50px;
    height: 50px;
    font-size: 24px;
    right: 0;
    cursor: pointer;
    z-index: 100;

    &:after{
      display: inline-block;
      content: "\00d7";
    }
  }

  &__swipe-line {
    position: absolute;
    width: 50px;
    height: 5px;
    background: white;
    border-radius: 10px;
    right: calc(50% - 25px);
    top: -15px;
  }

  &__wrap {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    z-index: 1000001;
    width: 100%;
    left: 0;
  }

  &__content {
    position: relative;
    background: transparent;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);

    &__header, &__body, &__footer {
      background: white;
      padding: 10px;
    }

    &__header {
      border-bottom: 1px solid #eee;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: white;
    }
  }
}
</style>
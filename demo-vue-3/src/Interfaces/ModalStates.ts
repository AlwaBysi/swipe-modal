export interface ModalStates {
    open: 'open',
    closed: 'closed'
}

export type ModalStatesTypes = 'open' | 'closed'

export interface Data {
    positionStart: number,
    modalPosition: number,
    bottomPositionPrev: number,
    movingUp: boolean,
    touchStart: boolean,
    clickInsideModal: boolean,
    mobileDevice: boolean
}
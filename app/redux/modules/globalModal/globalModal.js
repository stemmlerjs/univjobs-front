
/*
 * Actions
 */

const OPEN_GLOBAL_MODAL = 'OPEN_GLOBAL_MODAL'
const CLOSE_GLOBAL_MODAL = 'CLOSE_GLOBAL_MODAL'

/*
 * Initial State
 */

const initialGlobalModal = {
  isModalOpen: false,
  modalHeaderText: '',
  modalBodyText: '',
  customComponent: undefined
}

/*
 * ==== Action Creators ====
 */

export function openGlobalModal (modalHeaderText, modalBodyText, customComponent) {
  return {
    type: OPEN_GLOBAL_MODAL,
    modalHeaderText,
    modalBodyText,
    customComponent
  }
}

export function closeGlobalModal () {
  return {
    type: CLOSE_GLOBAL_MODAL
  }
}


// =======================================================
// ===================== REDUCERS ========================
// =======================================================

export default function job (state = initialGlobalModal, action) {
	switch(action.type) {
    case OPEN_GLOBAL_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalHeaderText: action.modalHeaderText,
        modalBodyText: action.modalBodyText,
        customComponent: action.customComponent
      }
    case CLOSE_GLOBAL_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modalHeaderText: '',
        modalBodyText: ''
      }
		default:
			return state
	}
}
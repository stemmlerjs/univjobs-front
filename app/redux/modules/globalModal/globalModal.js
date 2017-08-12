
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
  modalBodyText: ''
}

/*
 * ==== Action Creators ====
 */

export function openGlobalModal (modalHeaderText, modalBodyText) {
  return {
    type: OPEN_GLOBAL_MODAL,
    modalHeaderText,
    modalBodyText
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
        modalBodyText: action.modalBodyText
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
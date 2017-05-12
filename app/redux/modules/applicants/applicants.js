
// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const CHANGE_SELECTED_JOB = 'CHANGE_SELECTED_JOB'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

export function changeSelectedJob (job) {
	return {
		type: CHANGE_SELECTED_JOB,
		job
	}
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialApplicationsState = {
	currentSelectedJob: {}
}

// =======================================================
// ===================== REDUCER =========================
// =======================================================

export default function applicants (state = initialApplicationsState, action) {
  switch(action.type) {
	  case CHANGE_SELECTED_JOB:
			return {
				...state,
				currentSelectedJob: action.job
			}
	  default:
			return state
  }
}

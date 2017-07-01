
 /*
  * redux/modules/dashboard/jobInfoSidebar.js
  *
  * This file contains all of the redux state that pertains to the employer 
  * profile modal that students use to look at the employer profile information.
  */

 /*
  * Actions
  */

  const JOB_INFO_SIDEBAR_OPEN = 'JOB_INFO_SIDEBAR_OPEN'
  const JOB_INFO_SIDEBAR_CLOSED = 'JOB_INFO_SIDEBAR_CLOSED'

  const TOGGLE_DESIRED_SKILLS_SECTION = 'TOGGLE_DESIRED_SKILLS_SECTION'
  const TOGGLE_COMPENSATION_SECTION = 'TOGGLE_COMPENSATION_SECTION'
  const TOGGLE_RESPONSIBILITIES_SECTION = 'TOGGLE_RESPONSIBILITIES_SECTION'
  const TOGGLE_QUALIFICATIONS_SECTION = 'TOGGLE_QUALIFICATIONS_SECTION'

 /*
  * Action Creators
  */

  function jobInfoSidebarOpen (info) {
    return {
      type: JOB_INFO_SIDEBAR_OPEN,
      info
    }
  }

  function jobInfoSidebarClosed () {
    return {
      type: JOB_INFO_SIDEBAR_CLOSED
    }
  }

  function toggleResponsibilitiesSection () {
    return {
      type: TOGGLE_RESPONSIBILITIES_SECTION
    }
  }

  function toggleCompensationSection () {
    return {
      type: TOGGLE_COMPENSATION_SECTION
    }
  }

  function toggleDesiredSkillsSection () {
    return {
      type: TOGGLE_DESIRED_SKILLS_SECTION
    }
  }

  function toggleQualificationsSection () {
    return {
      type: TOGGLE_QUALIFICATIONS_SECTION
    }
  }

 /*
  * Initial State
  */

  var initialJobInfoSidebarState = {
    isOpen: false,
    info: {},
    responsibilitiesSectionExpanded: true,
    qualificationsSectionExpanded: true,
    desiredSkillsSectionExpanded: true,
    compensationSectionExpanded: true
  }

  export function jobInfoSidebar (state = initialJobInfoSidebarState, action) {
    switch(action.type) {
      case TOGGLE_QUALIFICATIONS_SECTION:
        return {
          ...state,
          qualificationsSectionExpanded: !state.qualificationsSectionExpanded
        }
      case TOGGLE_DESIRED_SKILLS_SECTION:
        return {
          ...state,
          desiredSkillsSectionExpanded: !state.desiredSkillsSectionExpanded
        }
      case TOGGLE_COMPENSATION_SECTION:
        return {
          ...state,
          compensationSectionExpanded: !state.compensationSectionExpanded
        }
      case TOGGLE_RESPONSIBILITIES_SECTION:
        return {
          ...state,
          responsibilitiesSectionExpanded: !state.responsibilitiesSectionExpanded
        }
      case JOB_INFO_SIDEBAR_OPEN:
        return {
          ...state,
          isOpen: true,
          info: action.info
        }
      case JOB_INFO_SIDEBAR_CLOSED:
        return {
          ...state,
          info: {},
          isOpen: false
        }
      default:
        return;
    }
  }

 /*
  * Reducer
  */

  export default {
    actions: {
        JOB_INFO_SIDEBAR_OPEN,
        JOB_INFO_SIDEBAR_CLOSED,
        TOGGLE_QUALIFICATIONS_SECTION,
        TOGGLE_DESIRED_SKILLS_SECTION,
        TOGGLE_COMPENSATION_SECTION,
        TOGGLE_RESPONSIBILITIES_SECTION
    },
    actionCreators: {
        jobInfoSidebarOpen,
        jobInfoSidebarClosed,

        toggleResponsibilitiesSection,
        toggleCompensationSection,
        toggleDesiredSkillsSection,
        toggleQualificationsSection
    },
    initialState: initialJobInfoSidebarState,
    reducers: {
      jobInfoSidebar
    }
  }
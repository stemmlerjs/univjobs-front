import test from 'ava'
import {
    getStudentsSuccess,
    getStudentsFailure
} from 'redux/modules/dashboard/dashboard'
import { actionTest } from 'redux-ava'

test('getStudentsSuccess action', actionTest(getStudentsSuccess, [], {
    type: 'EMPLOYER.GET_STUDENTS_SUCCESS',
    students: []
}))

test('getStudentsFailure action', actionTest(getStudentsFailure, [], {
    type: 'EMPLOYER.GET_STUDENTS_FAILURE',
    error: []
}))


// dashboardFetchingJobs
// dashboardFetchedJobsSuccess
// dashboardFetchedJobsFailure
// dashboardFetchingIndustries
// dashboardFetchedIndustriesSuccess
// dashboardFetchedIndustriesFailure
// dashboardFetchingJobTypes
// dashboardFetchedJobTypesSuccess
// dashboardFetchedJobTypesFailure
// dashboardModalClicked
// dashboardShowModal
// dashboardHideModal
// dashboardUnPinClicked
// dashboardUnPinSuccess
// dashboardUnPinFailure
// dashboardUpdateAnswerField
// dashboardSubmittingAnswers
// dashboardSubmitAnswersSuccess
// dashboardSubmitAnswersFailure

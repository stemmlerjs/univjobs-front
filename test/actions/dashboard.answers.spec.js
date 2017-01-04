import test from 'ava'
import {
    dashboardUpdateAnswerField,
    dashboardSubmitAnswersSuccess,
    dashboardSubmitAnswersFailure
} from 'redux/modules/dashboard/dashboard'
import { actionTest } from 'redux-ava'

test('dashboardUpdateAnswerField action', actionTest(dashboardUpdateAnswerField, 'jobTitle', 'new', {
    type: 'DASHBOARD_UPDATE_ANSWER_FIELD',
    newValue: 'new',
    fieldName: 'jobTitle'
}))

test('dashboardSubmitAnswersSuccess action', actionTest(dashboardSubmitAnswersSuccess, '', {
    type: 'DASHBOARD_SUBMIT_ANSWERS_SUCCESS',
	response: ''
}))

test('dashboardSubmitAnswersFailure action', actionTest(dashboardSubmitAnswersFailure, '', {
    type: 'DASHBOARD_SUBMIT_ANSWERS_FAILURE',
    error: ''
}))


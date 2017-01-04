import test from 'ava'
import {
    fetchingStudentApplications,
    fetchedStudentApplicationsSuccess,
    fetchedStudentApplicationsFailure,
    applicationModalClicked,
    applicationShowModal,
    applicationHideModal
} from 'redux/modules/application/application'
import { actionTest } from 'redux-ava'

test('fetchingStudentApplications action', actionTest(fetchingStudentApplications, {
	  type: 'FETCHING_STUDENT_APPLICATIONS',
}))

test('fetchedStudentApplicationsSuccess action', actionTest(fetchedStudentApplicationsSuccess, 'test', {
	   type: 'FETCHED_STUDENT_APPLICATIONS_SUCCESS',
	   applications: 'test'
}))

test('fetchedStudentApplicationsFailure action', actionTest(fetchedStudentApplicationsFailure, 'none', {
	   type: 'FETCHED_STUDENT_APPLICATIONS_FAILURE',
	   error: 'none'
}))

test('applicationModalClicked action', actionTest(applicationModalClicked, '2', {
   	   type: 'MODAL_CLICKED',
	   applicationId: '2'
}))

test('applicationShowModal action', actionTest(applicationShowModal, 'test', {
   	  type: 'SHOW_MODAL',
	  application: 'test'
}))

test('applicationHideModal action', actionTest(applicationHideModal, '2', {
    type: 'HIDE_MODAL',
    applicationId: '2'
}))

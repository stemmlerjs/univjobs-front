import test from 'ava'
import {
    updateFormField,
    pageErrorsExist,
    prevPage,
    clearForm,
    listRetrieved,
    submittingJob,
    createJobSuccess,
    createJobFailure
} from 'redux/modules/createjob/createjob'
import { actionTest } from 'redux-ava'

test('updateFormField action', actionTest(updateFormField, 'jobTitle', 'new Job in Sheridan', 1, {
    type: 'UPDATE_FORM_FIELD',
    newValue: 'new Job in Sheridan',
    fieldName: 'jobTitle',
    page: 1
}))

test('pageErrorsExist action', actionTest(pageErrorsExist, { pageError: 'none' } , 'none', 2, {
    type: 'PAGE_ERRORS_EXIST',
    profileErrorsObj: {pageError:'none'},
    error: 'none',
    page: 2
}))

test('prevPage action', actionTest(prevPage, 2, {
    type: 'PREV_PAGE',
    newPage: 1
}))

test('clearForm action', actionTest(clearForm, {
    type: 'CLEAR_FORM'
}))

test('listRetrieved action', actionTest(listRetrieved, 'JOBTYPES',[],  {
    // TODO: ?? question about this
    type: 'CREATE_JOB.RETRIEVED_LIST',
    listType: 'RETRIEVED_JOBTYPES',
    list: []
}))


// TODO: Question about export
// test('submittingJob action', actionTest(submittingJob,{
//     type: 'SUBMITTING_JOB'
// }))

// test('createJobSuccess action', actionTest(createJobSuccess,{
//     type: 'CREATE_JOB_SUCCESS'
// }))

// test('createJobFailure action', actionTest(createJobFailure, 'none', {
//     type: 'CREATE_JOB_FAILURE'
//     errors: 'none'
// }))

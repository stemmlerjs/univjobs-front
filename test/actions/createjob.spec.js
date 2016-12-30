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

test('updateFormField action', actionTest(updateFormField, 'email', 'test@gmail.com', 2, {
    type: 'UPDATE_FORM_FIELD',
    newValue: 'test@gmail.com',
    fieldName: 'email',
    page: 2
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


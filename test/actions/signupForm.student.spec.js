import test from 'ava'
import {
    updateStudentForm,
    submitStudentFormError,
} from 'redux/modules/signupForm/signupForm'
import { actionTest } from 'redux-ava'

test('updateStudentForm action', actionTest(updateStudentForm, 'testField', 'testValue',  {
    type: 'UPDATE_STUDENT_FORM',
    fieldName: 'testField',
    newValue: 'testValue'
}))

test('submitStudentFormError action', actionTest(submitStudentFormError, 'none', {
    type: 'SUBMIT_STUDENT_FORM_ERROR',
    error: 'none'
}))

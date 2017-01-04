import test from 'ava'
import {
    updateEmployerForm,
    submitEmployerFormError,
} from 'redux/modules/signupForm/signupForm'
import { actionTest } from 'redux-ava'

test('updateEmployerForm action', actionTest(updateEmployerForm, 'testField', 'testValue',  {
    type: 'UPDATE_EMPLOYER_FORM',
    fieldName: 'testField',
    newValue: 'testValue'
}))

test('submitEmployerFormError action', actionTest(submitEmployerFormError, 'none', {
    type: 'SUBMIT_EMPLOYER_FORM_ERROR',
    error: 'none'
}))

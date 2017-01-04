import test from 'ava'
import {
    updateLoginForm,
    actuallySubmitLoginFormDispatch,
    submitLoginFormSuccess,
    submitLoginFormError
} from 'redux/modules/loginForm/loginForm'
import { actionTest } from 'redux-ava'

test('updateLoginForm action', actionTest(updateLoginForm, 'testField', 'testValue',  {
    type: 'UPDATE_LOGIN_FORM',
    fieldName: 'testField',
    newValue: 'testValue'
}))

test('actuallySubmitLoginFormDispatch action', actionTest(actuallySubmitLoginFormDispatch, {
    type: 'SUBMIT_LOGIN_FORM'
}))

test('submitLoginFormSuccess action', actionTest(submitLoginFormSuccess, {
    type: 'SUBMIT_LOGIN_FORM_SUCCESS'
}))

test('submitLoginFormError action', actionTest(submitLoginFormError, 'none', {
    type: 'SUBMIT_LOGIN_FORM_ERROR',
    error: 'none'
}))

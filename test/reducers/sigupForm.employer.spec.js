import test from 'ava'
import reducer, {
    updateEmployerForm,
    submitEmployerFormError
} from 'redux/modules/signupForm/signupForm'
import { reducerTest } from 'redux-ava'

test('update employer form', reducerTest(
    reducer,
    {
        employerSignupForm: {
            email: '',
            error: ''
        }
    },
    updateEmployerForm('email', 'juliosueiras@gmail.com'),
    {
        employerSignupForm: {
            email: 'juliosueiras@gmail.com',
            error: ''
        }
    }
))

test('submit employer form error', reducerTest(
    reducer,
    {
        employerSignupForm: {
            email: '',
            error: ''
        }
    },
    submitEmployerFormError('none'),
    {
        employerSignupForm: {
            email: '',
            error: 'none'
        }
    }
))


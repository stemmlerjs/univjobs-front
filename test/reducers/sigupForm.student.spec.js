import test from 'ava'
import reducer, {
    updateStudentForm,
    submitStudentFormError
} from 'redux/modules/signupForm/signupForm'
import { reducerTest } from 'redux-ava'

test('update student form', reducerTest(
    reducer,
    {
        studentSignupForm: {
            email: '',
            error: ''
        }
    },
    updateStudentForm('email', 'juliosueiras@gmail.com'),
    {
        studentSignupForm: {
            email: 'juliosueiras@gmail.com',
            error: ''
        }
    }
))

test('submit student form error', reducerTest(
    reducer,
    {
        studentSignupForm: {
            email: '',
            error: ''
        }
    },
    submitStudentFormError('none'),
    {
        studentSignupForm: {
            email: '',
            error: 'none'
        }
    }
))


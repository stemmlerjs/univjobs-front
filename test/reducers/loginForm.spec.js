import test from 'ava'
import reducer, {
    updateLoginForm,
    actuallySubmitLoginFormDispatch,
    submitLoginFormSuccess,
    submitLoginFormError
} from 'redux/modules/loginForm/loginForm'
import { reducerTest } from 'redux-ava'

test('update login form', reducerTest(
    reducer,
    {
        email: '',
        password: '',
        error: '',
        isSubmittingForm: false
    },
    updateLoginForm('email', 'juliosueiras@gmail.com'),
    {
        email: 'juliosueiras@gmail.com',
        password: '',
        error: '',
        isSubmittingForm: false
    }
))

test('submit login form', reducerTest(
    reducer,
    {
        isSubmittingForm: false
    },
    actuallySubmitLoginFormDispatch(),
    {
        isSubmittingForm: true
    }
))

test('submit login form success', reducerTest(
    reducer,
    {
        isSubmittingForm: true
    },
    submitLoginFormSuccess(),
    {
        isSubmittingForm: false
    }
))

test('submit login form failure', reducerTest(
    reducer,
    {
        isSubmittingForm: true,
        error: ''
    },
    submitLoginFormError('none'),
    {
        isSubmittingForm: false,
        error: 'none'
    }
))

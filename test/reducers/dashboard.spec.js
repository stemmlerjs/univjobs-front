import test from 'ava'
import reducer, {
    getStudentsSuccess,
    getStudentsFailure
 } from 'redux/modules/dashboard/dashboard'
import { reducerTest } from 'redux-ava'

test('get students success', reducerTest(
    reducer,
    {
        employerDashboard: {
            students: []
        }
    },
    getStudentsSuccess(['test']),
    {
        employerDashboard: {
            students: ['test']
        }
    }
))

test('get students failure', reducerTest(
    reducer,
    {
        employerDashboard: {
            students: []
        }
    },
    getStudentsFailure('none'),
    {
        employerDashboard: {
            students: []
        },
        error: 'none'
    }
))

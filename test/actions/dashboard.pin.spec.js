import test from 'ava'
import {
    dashboardUnPinClicked,
    dashboardUnPinSuccess,
    dashboardUnPinFailure
} from 'redux/modules/dashboard/dashboard'
import { actionTest } from 'redux-ava'

test('dashboardUnPinClicked action', actionTest(dashboardUnPinClicked, [], {
    type: 'DASHBOARD_UNPIN_CLICKED',
    job: []
}))

test('dashboardUnPinSuccess action', actionTest(dashboardUnPinSuccess, '', {
    type: 'DASHBOARD_UNPIN_SUCCESS',
    fill: {color: 'none'},
    response: ''
}))

test('dashboardUnPinFailure action', actionTest(dashboardUnPinFailure, '', {
    type: 'DASHBOARD_UNPIN_FAILURE',
    error: '',
}))


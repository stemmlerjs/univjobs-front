import test from 'ava'
import {
    dashboardModalClicked,
    dashboardShowModal,
    dashboardHideModal
} from 'redux/modules/dashboard/dashboard'
import { actionTest } from 'redux-ava'

test('dashboardModalClicked action', actionTest(dashboardModalClicked, 1, {
    type: 'DASHBOARD_MODAL_CLICKED',
    jobId: 1
}))

test('dashboardShowModal action', actionTest(dashboardShowModal, '', {
    type: 'DASHBOARD_SHOW_MODAL',
    job: '',
}))

test('dashboardHideModal action', actionTest(dashboardHideModal, '', {
    type: 'DASHBOARD_HIDE_MODAL'
}))


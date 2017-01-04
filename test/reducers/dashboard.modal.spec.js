import test from 'ava'
import reducer, {
    dashboardModalClicked,
    dashboardShowModal,
    dashboardHideModal
 } from 'redux/modules/dashboard/dashboard'
import { reducerTest } from 'redux-ava'

const initialState = {
    modal: {
        isClicked: false,
        isOpen: false,
        jobId: '',
        job: ''
    }
}

test('modal clicked', reducerTest(
    reducer,
    initialState,
    dashboardModalClicked('2'),
    {
        modal: {
            isClicked: true,
            isOpen: false,
            jobId: '2',
            job: ''
        }
    }
))

test('show modal', reducerTest(
    reducer,
    initialState,
    dashboardShowModal('2'),
    {
        modal: {
            isClicked: false,
            isOpen: true,
            jobId: '',
            job: '2'
        }
    }
))

test('hide modal', reducerTest(
    reducer,
    initialState,
    dashboardHideModal('2'),
    {
        modal: {
            isClicked: false,
            isOpen: false,
            jobId: '',
            job: ''
        }
    }
))

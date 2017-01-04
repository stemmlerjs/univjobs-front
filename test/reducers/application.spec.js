import test from 'ava'
import reducer, {
    fetchingStudentApplications,
    fetchedStudentApplicationsSuccess,
    fetchedStudentApplicationsFailure,
    applicationModalClicked,
    applicationShowModal,
    applicationHideModal
} from 'redux/modules/application/application'
import { reducerTest } from 'redux-ava'

test('Fetching Student Applications', reducerTest(
    reducer,
    {
        studentApplications: {
            isFetching: false
        }
    },
    fetchingStudentApplications(),
    {
        studentApplications: {
            isFetching: true
        }
    }
))

test('Fetched Student Success', reducerTest(
    reducer,
    {
        studentApplications: {
            isFetching: true
        }
    },
    fetchedStudentApplicationsSuccess('test'),
    {
        studentApplications: {
            applications: 'test',
            isFetching: false,
        }
    }
))

test('Fetched Student Failure', reducerTest(
    reducer,
    {
        studentApplications: {
            isFetching: true
        }
    },
    fetchedStudentApplicationsFailure('none'),
    {
        studentApplications: {
            isFetching: false,
        },
        error: 'none',
    }
))

test('Application Modal Click', reducerTest(
    reducer,
    {
        applicationModal: {
            isClicked: false,
            applicationId: ''
        }
    },
    applicationModalClicked('2'),
    {
        applicationModal: {
            isClicked: true,
            applicationId: '2'
        }
    }
))

test('Application Show Modal', reducerTest(
    reducer,
    {
        applicationModal: {
            isOpen: false,
            isClicked: false,
            application: ''
        }
    },
    applicationShowModal('test'),
    {
        applicationModal: {
            isOpen: true,
            isClicked: false,
            application: 'test'
        }
    }
))

test('Application Hide Modal', reducerTest(
    reducer,
    {
        applicationModal: {
            isOpen: true,
            isClicked: true,
            applicationId: ''
        }
    },
    applicationHideModal('2'),
    {
        applicationModal: {
            isOpen: false,
            isClicked: false,
            applicationId: '2'
        }
    }
))

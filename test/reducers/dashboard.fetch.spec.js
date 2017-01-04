import test from 'ava'
import reducer, {
    dashboardFetchingJobs,
    dashboardFetchedJobsSuccess,
    dashboardFetchedJobsFailure,
    dashboardFetchingIndustries,
    dashboardFetchedIndustriesSuccess,
    dashboardFetchedIndustriesFailure,
    dashboardFetchingJobTypes,
    dashboardFetchedJobTypesSuccess,
    dashboardFetchedJobTypesFailure
 } from 'redux/modules/dashboard/dashboard'
import { reducerTest } from 'redux-ava'

test('fetching jobs', reducerTest(
    reducer,
    {
        studentDashboard: {
            isFetching: false
        }
    },
    dashboardFetchingJobs(),
    {
        studentDashboard: {
            isFetching: true
        }
    }
))

test('fetched jobs success', reducerTest(
    reducer,
    {
        studentDashboard: {
            jobs: [],
            isFetching: true
        }
    },
    dashboardFetchedJobsSuccess(['test']),
    {
        studentDashboard: {
            jobs: ['test'],
            isFetching: false
        }
    }
))


// TODO: Question regarding this
test.skip('fetched jobs failure', reducerTest(
    reducer,
    {
        studentDashboard: {
            isFetching: true
        },
        error: ''
    },
    dashboardFetchedJobsFailure('none'),
    {
        studentDashboard: {
            isFetching: false
        },
        error: 'none'
    }
))

test('fetching industries', reducerTest(
    reducer,
    {
        studentDashboard: {
            isFetching: false
        },
    },
    dashboardFetchingIndustries(),
    {
        studentDashboard: {
            // TODO: Shouldn't this be true?
            isFetching: false
        },
    }
), 'require further investigation')

test('fetched industries success', reducerTest(
    reducer,
    {
        industries: [],
    },
    dashboardFetchedIndustriesSuccess(['test']),
    {
        industries: ['test'],
    }
))

test('fetched industries failure', reducerTest(
    reducer,
    {
        industries: [],
        error: ''
    },
    dashboardFetchedIndustriesFailure('none'),
    {
        industries: [],
        error: 'none'
    }
))

test('fetching job type', reducerTest(
    reducer,
    {
        studentDashboard: {
            isFetching: false
        },
    },
    dashboardFetchingJobTypes(),
    {
        studentDashboard: {
            // TODO: Shouldn't this be true?
            isFetching: false
        },
    }
), 'require further investigation')

test('fetched job type success', reducerTest(
    reducer,
    {
        jobTypes: [],
    },
    dashboardFetchedJobTypesSuccess(['test']),
    {
        jobTypes: ['test'],
    }
))

test('fetched job type failure', reducerTest(
    reducer,
    {
        jobTypes: [],
        error: ''
    },
    dashboardFetchedJobTypesFailure('none'),
    {
        jobTypes: [],
        error: 'none'
    }
))

import test from 'ava'
import {
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
import { actionTest } from 'redux-ava'

test('dashboardFetchingJobs action', actionTest(dashboardFetchingJobs, {
    type: 'DASHBOARD_FETCHING_JOBS',
}))

test('dashboardFetchedJobsSuccess action', actionTest(dashboardFetchedJobsSuccess, [], {
    type: 'DASHBOARD_FETCHED_JOBS_SUCCESS',
    jobs: []
}))

test('dashboardFetchedJobsFailure action', actionTest(dashboardFetchedJobsFailure, 'none' , {
	  type: 'DASHBOARD_FETCHED_JOBS_FAILURE',
	  error: 'none'
}))

test('dashboardFetchingIndustries action', actionTest(dashboardFetchingIndustries, {
	  type: 'DASHBOARD_FETCHING_INDUSTRIES',
}))

test('dashboardFetchedIndustriesSuccess action', actionTest(dashboardFetchedIndustriesSuccess, [], {
	   type: 'DASHBOARD_FETCHED_INDUSTRIES_SUCCESS',
	   industries: []
}))

// TODO: Question regarding this
test.skip('dashboardFetchedIndustriesFailure action', actionTest(dashboardFetchedIndustriesFailure, 'none' ,{
	  type: 'DASHBOARD_FETCHED_INDUSTRIES_FAILURE',
	  error: 'none'
}))

test('dashboardFetchingJobTypes action', actionTest(dashboardFetchingJobTypes, {
	  type: 'DASHBOARD_FETCHING_JOB_TYPES'
}))

test('dashboardFetchedJobTypesSuccess action', actionTest(dashboardFetchedJobTypesSuccess, 'summer', {
	   type: 'DASHBOARD_FETCHED_JOB_TYPES_SUCCESS',
	   jobTypes: 'summer'
}))

test('dashboardFetchedJobTypesFailure action', actionTest(dashboardFetchedJobTypesFailure, 'none', {
	  type: 'DASHBOARD_FETCHED_JOB_TYPES_FAILURE',
	  error: 'none'
}))

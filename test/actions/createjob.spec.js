import test from 'ava'
import config from 'config'
import nock from 'nock'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {
    updateFormField,
    pageErrorsExist,
    prevPage,
    clearForm,
    listRetrieved,
    submittingJob,
    createJobSuccess,
    createJobFailure,
    createNewJob
} from 'redux/modules/createjob/createjob'
import { actionTest } from 'redux-ava'

test('updateFormField action', actionTest(updateFormField, 'jobTitle', 'new Job in Sheridan', 1, {
    type: 'UPDATE_FORM_FIELD',
    newValue: 'new Job in Sheridan',
    fieldName: 'jobTitle',
    page: 1
}))

test('pageErrorsExist action', actionTest(pageErrorsExist, { pageError: 'none' } , 'none', 2, {
    type: 'PAGE_ERRORS_EXIST',
    profileErrorsObj: {pageError:'none'},
    error: 'none',
    page: 2
}))

test('prevPage action', actionTest(prevPage, 2, {
    type: 'PREV_PAGE',
    newPage: 1
}))

test('clearForm action', actionTest(clearForm, {
    type: 'CLEAR_FORM'
}))

test('listRetrieved action', actionTest(listRetrieved, 'JOBTYPES',[],  {
    // TODO: ?? question about this
    type: 'CREATE_JOB.RETRIEVED_LIST',
    listType: 'RETRIEVED_JOBTYPES',
    list: []
}))


test.beforeEach(t => {
    t.context.mockStore = configureStore([thunkMiddleware])
    t.context.store = t.context.mockStore({})
    t.context.data = {
        user: {
            emailVerified: true
        },
        page1: {
            jobTitle: "",
            isPayingJob: false,
            startDate: new Date('2017-01-01'),
            responsibilities: "",
            qualifications: "",
            compensation: "",
            internshipLocation: "",
            intershipLocation: ""
        },
        page2: {
            question1: "",
            question2: "" },
        page3: {
            maxApplicants: 10
        }
    }
})

test.afterEach(t => {
    t.context.store.clearActions()
    nock.cleanAll()
});

test('createNewJob success action', async t => {
        const jobType = "summer"
        nock(config.baseUrl)
            .post('/job/new/')
            .reply(200, {})

        const expectedActions = [{ type: "SUBMITTING_JOB"}, { type: 'CREATE_JOB_SUCCESS' }]

        await t.context.store.dispatch(createNewJob(t.context.data, jobType))
        t.deepEqual(t.context.store.getActions(), expectedActions)
})

test('createNewJob failure action', async t => {
    const jobType = "summer"

    nock(config.baseUrl)
        .post('/job/new/')
        .reply(404, {})

    const expectedActions = [{ type: "SUBMITTING_JOB"}, { type: 'CREATE_JOB_FAILURE', errors: 'Uh-oh, something went wrong. Please contact us to let us know.' }]

    await t.context.store.dispatch(createNewJob(t.context.data ,jobType))
    t.deepEqual(t.context.store.getActions(), expectedActions)
})


// TODO: Question about export
// test('submittingJob action', actionTest(submittingJob,{
//     type: 'SUBMITTING_JOB'
// }))

// test('createJobSuccess action', actionTest(createJobSuccess,{
//     type: 'CREATE_JOB_SUCCESS'
// }))

// test('createJobFailure action', actionTest(createJobFailure, 'none', {
//     type: 'CREATE_JOB_FAILURE'
//     errors: 'none'
// }))

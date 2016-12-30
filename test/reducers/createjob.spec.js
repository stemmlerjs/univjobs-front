import test from 'ava'
import reducer, { updateFormField,pageErrorsExist,clearForm, prevPage, listRetrieved } from 'redux/modules/createjob/createjob'
import { reducerTest } from 'redux-ava'

test('update form field for page 1', reducerTest(
    reducer,
    {
        page1: {
            jobTitle: '',
            isPayingJob: true,
            startDate: '',
            responsibilities: '',
            qualifications: '',
            desiredSkills: '',
            internshipLocation: '',
            remoteWork: false,
            compensation: '',
            MAX_CHARS_responsibilities: 5500,
            MAX_CHARS_qualifications: 1400,
            MAX_CHARS_desiredSkills: 100,
            MAX_CHARS_compensation: 380,
            page1PropsErrorMap: {}
        },
        errorsExist: false
    },
    updateFormField('jobTitle', 'new Job in sheridan', 1),
    {
        page1: {
            jobTitle: 'new Job in sheridan',
            isPayingJob: true,
            startDate: '',
            responsibilities: '',
            qualifications: '',
            desiredSkills: '',
            internshipLocation: '',
            remoteWork: false,
            compensation: '',
            MAX_CHARS_responsibilities: 5500,
            MAX_CHARS_qualifications: 1400,
            MAX_CHARS_desiredSkills: 100,
            MAX_CHARS_compensation: 380,
            page1PropsErrorMap: { jobTitle: false }
        },
        errorsExist: false
    }
))

test.todo('update form field for page 2')
test.todo('update form field for page 3')
test.todo('update form field for page 4')

test('page error', reducerTest(
    reducer,
    {
        page1: {
            jobTitle: '',
            isPayingJob: true,
            startDate: '',
            responsibilities: '',
            qualifications: '',
            desiredSkills: '',
            internshipLocation: '',
            remoteWork: false,
            compensation: '',
            MAX_CHARS_responsibilities: 5500,
            MAX_CHARS_qualifications: 1400,
            MAX_CHARS_desiredSkills: 100,
            MAX_CHARS_compensation: 380,
            page1PropsErrorMap: {}
        },
        errorsExist: false
    },
    pageErrorsExist({ jobTitle: true}, [
        "Can't advance to next page.",
        'Please fill in missing fields first.'
    ], 1),
    {
        page1: {
            jobTitle: '',
            isPayingJob: true,
            startDate: '',
            responsibilities: '',
            qualifications: '',
            desiredSkills: '',
            internshipLocation: '',
            remoteWork: false,
            compensation: '',
            MAX_CHARS_responsibilities: 5500,
            MAX_CHARS_qualifications: 1400,
            MAX_CHARS_desiredSkills: 100,
            MAX_CHARS_compensation: 380,
            page1PropsErrorMap: { jobTitle: true }
        },
        errors: [ "Can't advance to next page.",
              'Please fill in missing fields first.'
            ],
        errorsExist: true
    }
))

test('clear form', reducerTest(
    reducer,
    {
        currentPage: 1,
        page1: { jobTitle: 'New Job'},
        page2: {},
        page3: {},
        page4: {},
        errorsExist: false,
        isSubmitting: false,
        submitSuccess: false,
        errors: '',
        lists: {}
    },
    clearForm(),
    {
        currentPage: 1,
        page1: {},
        page2: {},
        page3: {},
        page4: {},
        errorsExist: false,
        errors: '',
        lists: {}
    }
))

test('prev page', reducerTest(
    reducer,
    {
        currentPage: 2
    },
    prevPage(2),
    {
        currentPage: 1
    }
))

test('retrieve list', reducerTest(
    reducer,
    {
        lists: []
    },
    listRetrieved('JOBTYPES',['summer']),
    {
        lists: { jobTypes: ['summer'] }
    }
))

test.todo("submitting job");
test.todo("create job successful");
test.todo("create job failure");

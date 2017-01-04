import test from 'ava'
import reducer, {
    dashboardUnPinClicked,
    dashboardUnPinSuccess,
    dashboardUnPinFailure
 } from 'redux/modules/dashboard/dashboard'
import { reducerTest } from 'redux-ava'

test.todo('hi')

// test('update answer field', reducerTest(
//     reducer,{
//         answer: {
//             jobId: '',
//         }
//     },
//     dashboardUpdateAnswerField('jobId', '2'),
//     {
//         answer: {
//             jobId: '2',
//         }
//     }
// ))

// // TODO: Require further question
// test.skip('submit answer success', reducerTest(
//     reducer,
//     {
//         modal:{
//             jobId: '1'
//         },
//         studentDashboard: {
//             jobs: {
//                 data: [{ id: '2'}]
//             }
//         },
//         answer: {
//             response: '',
//             isSubmitting: false,
//         }
//     },
//     dashboardSubmitAnswersSuccess('test'),
//     {
//         modal:{
//             jobId: '1'
//         },
//         studentDashboard: {
//             jobs: {
//                 data: [{ id: '2'}]
//             }
//         },
//         answer: {
//             response: 'test',
//             isSubmitting: false,
//         }
//     }
// ))

// test('submit answer failure', reducerTest(
//     reducer,
//     {
//         answer: {
//             error:'',
//             isSubmitting: false
//         },
//         error: ''
//     },
//     dashboardSubmitAnswersFailure('none'),
//     {
//         answer: {
//             error:'none',
//             isSubmitting: false
//         },
//         error: 'none'
//     }
// ))

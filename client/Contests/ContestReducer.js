import { ADD_CONTEST, GET_CONTESTS, GET_MY_CONTESTS,
    GET_NOT_MY_CONTESTS, DELETE_CONTEST } from './ContestActions';

// Initial State
const initialState = {
    contests: [],
    myContests: [],
    notMyContests: []
};

const ContestReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTESTS :
            return Object.assign({}, state, {
                contests: action.contests}
            );

        case GET_MY_CONTESTS :
            return Object.assign({}, state, {
                myContests: action.contests}
            );

        case GET_NOT_MY_CONTESTS :
            return Object.assign({}, state, {
                    notMyContests: action.contests
            });

        case DELETE_CONTEST :
            return {
                data: state.data.filter(contest => contest.cuid !== action.cuid),
        };

        default:
            return state;
    }
};

/* Selectors */

// Get my contests
export const getMyContests = state => state.contests.myContests;

// Get not my contests
export const getNotMyContests = state => state.contests.notMyContests;

// Get contest by cuid
export const getContest = (state, cuid) => state.contests.contests.filter(contest => contest.cuid === cuid)[0];

// Export Reducer
export default ContestReducer;

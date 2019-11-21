import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';

export const initialState = {
    dishes : DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
}

export const Reducer = (state = initialState, action) => {   //default value for the parameter as the reduce is been first calld and state has to be initialized
    //if the state is uninitialized the default value of the state will be initialstate
    return state;
}
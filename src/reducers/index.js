import { combineReducers } from 'redux';
import{ ChangeTheUser,AdminChanger,OrderChanger} from './changeTheUser';

const RootReducers = combineReducers({
    ChangeTheUser,
    AdminChanger,
    OrderChanger,
})
export default RootReducers;
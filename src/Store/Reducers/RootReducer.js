/* eslint-disable prettier/prettier */
import { persistCombineReducers } from 'redux-persist';
import members from './MemberReducer';
import storage from 'redux-persist/es/storage';

const config = {
	key: 'root',
	storage,
}

const rootReducer = persistCombineReducers(
	config,
	{
		members,
	}
);

export default rootReducer;

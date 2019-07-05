/* eslint-disable prettier/prettier */
import * as types from './ActionType';
import initialState from './InitialState';

export default function (state = initialState.members, action) {
	switch (action.type) {

		case types.RETRIEVE_CONTACT_LIST_SUCCESS:
			return {
				...state,
				contacts: action.contacts,
			};
		default:
			return state;
	}
}

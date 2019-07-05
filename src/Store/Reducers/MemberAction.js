/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as types from './ActionType';
import {API_URL} from './../../Constants/Configs';


export function retrieveContactsSuccess(res) {
	return {
		type: types.RETRIEVE_CONTACT_LIST_SUCCESS,
		contacts: res.data,
	};
}

export function retrieveContacts(longitude, latitude) {
	return function (dispatch) {
		return axios.get(`${API_URL}/contact`)
		.then(res => {
			dispatch(retrieveContactsSuccess(res));
		})
		.catch(error => {
			console.log('Contacts', error);
		});
	};
}








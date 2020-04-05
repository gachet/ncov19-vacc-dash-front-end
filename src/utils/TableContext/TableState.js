import React, { createContext, useReducer, useEffect } from "react";

import {
	IS_LOADING,
	GET_TABLE_SUCCESS,
	GET_TABLE_ERROR,
	GET_TRIALS_SUCCESS,
	GET_TRIALS_ERROR,
	SET_FILTER_SUCCESS,
	SET_FILTER_ERROR,
	FILTER_BY_ON_CLICK_SUCCESS,
	FILTER_BY_ON_CLICK_ERROR,
} from "./types";
import { loadState, saveState } from "../localStorage";
import { axiosWithAuth, client } from "../axiosWithAuth";
import { reducer } from "./reducers";

export const TableContext = createContext();

/* 
Creating Global state with React Context 
*/
export const TableState = props => {
	const initialState = {
		error: "",
		isLoading: false,
		table: [],
		trials: [],
		count: null,
		filter: [],
	};

	const localState = loadState("table");

	// const [state, dispatch] = useReducer(reducer, localState || initialState);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		saveState("table", state);
	}, [state]);

	const getTable = async () => {
		dispatch({ type: IS_LOADING, payload: true });
		try {
			const table = await client().get("api/totals");
			dispatch({ type: GET_TABLE_SUCCESS, payload: table.data });
		} catch (e) {
			console.log("error", e);
			dispatch({ type: GET_TABLE_ERROR, payload: e.response });
		}
	};
	const getTrials = async (apiUrl) => {
		dispatch({ type: IS_LOADING, payload: true });
		try {
			const res = await client().get(apiUrl);

			dispatch({ type: GET_TRIALS_SUCCESS, payload: res.data });
		} catch (e) {
			console.log("error", e);
			{
				dispatch({ type: GET_TRIALS_ERROR, payload: e.response });
			}
		}
	};
	const mapFilter = async country => {
		dispatch({ type: IS_LOADING, payload: true });
		try {
			dispatch({ type: SET_FILTER_SUCCESS, payload: country });
		} catch (e) {
			console.log("error", e);
			{
				dispatch({ type: SET_FILTER_ERROR, payload: e.response });
			}
		}
	};
	const filterByOnClick = async data => {
		dispatch({ type: IS_LOADING, payload: true });
		try {
			dispatch({ type: FILTER_BY_ON_CLICK_SUCCESS, payload: data });
		} catch (e) {
			console.log("error", e);
			{
				dispatch({
					type: FILTER_BY_ON_CLICK_ERROR,
					payload: e.response,
				});
			}
		}
	};
	return (
		<TableContext.Provider
			value={{
				error: state.error,
				table: state.table,
				trials: state.trials,
				count: state.count,
				filter: state.filter,
				isLoading: state.isLoading,
				getTable,
				getTrials,
				mapFilter,
				filterByOnClick,
			}}
		>
			{props.children}
		</TableContext.Provider>
	);
};

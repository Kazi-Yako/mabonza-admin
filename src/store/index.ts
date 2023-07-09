import {
	AnyAction,
	ThunkAction,
	ThunkDispatch,
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit';
import MabonzasReducer from './MabonzasSlice';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// const reducer = {
// 	mabonzas: MabonzasReducer,
// };

const rootReducer = combineReducers({
	mabonzas: MabonzasReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export type TypedThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	ReduxState,
	unknown,
	AnyAction
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

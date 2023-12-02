import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reportReducer from './reducers/reports';

const rootReducer = combineReducers({
	reportReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof rootReducer>;

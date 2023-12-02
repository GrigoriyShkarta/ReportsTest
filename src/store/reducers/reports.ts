import { IReport } from '../../models/IReport';
import { createSlice } from '@reduxjs/toolkit';

interface IReportState {
	date: IReport[];
}

const initialState: IReportState = {
	date: [],
};

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {},
});

export default reportSlice.reducer;

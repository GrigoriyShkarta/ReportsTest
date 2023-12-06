import { IReport } from '../../models/IReport';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IReportState {
	data: IReport[];
	filteredData: IReport[];
	month: number;
}

const initialState: IReportState = {
	data: [],
	filteredData: [],
	month: new Date().getMonth(),
};

const filterDataByMonth = (state: IReportState, month: number): IReport[] => {
	return state.data.filter((report) => {
		const reportDate = new Date(report.date);
		return reportDate.getMonth() + 1 === month;
	});
};

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		getData(state: IReportState, action: PayloadAction<IReport[]>) {
			state.data = action.payload;
		},
		changeDataByMonthAndYear(state: IReportState, action: PayloadAction<number>) {
			state.month = action.payload;
			state.filteredData = filterDataByMonth(state, action.payload);
		},
	},
});

export default reportSlice.reducer;

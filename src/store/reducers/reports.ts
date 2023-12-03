import { IReport } from '../../models/IReport';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Title, SortBy } from '../../shared/constants';
import { mapTitles } from '../../mappers';

interface IReportState {
	data: IReport[];
	filteredData: IReport[];
	month: number;
	years: number;
}

interface IFilterDateAction {
	month: number;
	years: number;
}

interface ISortBY {
	title: string;
	sort: SortBy;
}

const initialState: IReportState = {
	data: [],
	filteredData: [],
	month: new Date().getMonth(),
	years: new Date().getFullYear(),
};

const filterDataByMonthAndYear = (state: IReportState, date: IFilterDateAction): IReport[] => {
	return state.data.filter((report) => {
		const reportDate = new Date(report.date);
		return reportDate.getMonth() + 1 === date.month && reportDate.getFullYear() === date.years;
	});
};

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		getData(state: IReportState, action: PayloadAction<IReport[]>) {
			state.data = action.payload;
		},
		changeDataByMonthAndYear(state: IReportState, action: PayloadAction<IFilterDateAction>) {
			const { month, years } = state;
			state.filteredData = filterDataByMonthAndYear(state, { month, years });
		},
		filterCategory(state: IReportState, action: PayloadAction<string>) {
			const { month, years } = state;
			const filteredDataByMonthAndYear = filterDataByMonthAndYear(state, { month, years });

			if (action.payload === 'All Category') {
				state.filteredData = filteredDataByMonthAndYear;
			} else {
				state.filteredData = filteredDataByMonthAndYear.filter(
					(item) => item.category === action.payload,
				);
			}
		},
		sortData(state: IReportState, action: PayloadAction<ISortBY>) {
			const { title, sort } = action.payload;
			const convertTitle = mapTitles(title);

			const compareFunction = (a: IReport, b: IReport): number => {
				const valueA = convertTitle === 'date' ? new Date(a.date).getTime() : +a[convertTitle];
				const valueB = convertTitle === 'date' ? new Date(b.date).getTime() : +b[convertTitle];

				return sort === SortBy.ASCENDING ? valueA - valueB : valueB - valueA;
			};

			state.filteredData = [...state.filteredData].sort(compareFunction);
		},
	},
});

export default reportSlice.reducer;

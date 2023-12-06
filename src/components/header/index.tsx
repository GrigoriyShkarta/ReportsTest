import { CSSProperties, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { monthsArray, monthNames } from '../../shared/constants';
import { reportSlice } from '../../store/reducers/reports';
import { Layout, Select, Space, Typography } from 'antd';

const headerStyle: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	textAlign: 'center',
};
const HeaderApp: FC = () => {
	const { month } = useAppSelector((state) => state.reportReducer);
	const { changeDataByMonthAndYear } = reportSlice.actions;
	const dispatch = useAppDispatch();

	const { Header } = Layout;
	const { Title, Text } = Typography;

	const handleChange = (value: string): void => {
		dispatch(changeDataByMonthAndYear(+value));
	};

	return (
		<Header style={headerStyle}>
			<Title style={{ color: 'white', margin: 0 }}>ReportTask</Title>
			<Title style={{ color: 'white', margin: 0 }}>{monthNames[month - 1]} Report</Title>
			<Space>
				<Text style={{ color: 'white' }}>Change Month</Text>
				<Select
					defaultValue={monthNames[month - 1]}
					style={{ width: 120 }}
					onChange={handleChange}
					options={monthsArray}
				/>
			</Space>
		</Header>
	);
};

export default HeaderApp;

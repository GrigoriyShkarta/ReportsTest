import { FC } from 'react';
import { useAppSelector } from '../../../shared/hooks/redux';
import { useGetDay } from '../../../shared/hooks/useGetDay';
import { IReport } from '../../../models/IReport';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Space, Typography } from 'antd';

interface IDailySales {
	[date: string]: number;
}

const LineDiagram: FC = () => {
	const { filteredData } = useAppSelector((state) => state.reportReducer);
	const { Title } = Typography;

	const dailySales: IDailySales = filteredData.reduce((acc: IDailySales, item: IReport) => {
		const { date, revenue } = item;
		acc[date] = (acc[date] || 0) + revenue;
		return acc;
	}, {});

	const dailySalesArray = Object.keys(dailySales).map((date) => ({
		date,
		totalRevenue: dailySales[date],
	}));

	return (
		<Space style={{ display: 'flex', flexDirection: 'column' }}>
			<Title>Sales Trend</Title>
			<LineChart width={800} height={300} data={dailySalesArray}>
				<Line type={'monotone'} dataKey={'totalRevenue'} stroke={'#2196F3'} />
				<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
				<XAxis dataKey={useGetDay('date')} />
				<YAxis />
				<Tooltip />
			</LineChart>
		</Space>
	);
};

export default LineDiagram;

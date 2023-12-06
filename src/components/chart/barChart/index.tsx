import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppSelector } from '../../../shared/hooks/redux';
import { IReport } from '../../../models/IReport';
import { Space, Typography } from 'antd';

interface IDailySales {
	[date: string]: number;
}

const BarDiagram: FC = () => {
	const { filteredData } = useAppSelector((state) => state.reportReducer);
	const { Title } = Typography;

	const categorySales = filteredData.reduce((acc: IDailySales, item: IReport) => {
		const { category, revenue } = item;
		acc[category] = (acc[category] || 0) + revenue;
		return acc;
	}, {});

	const data = [
		{
			name: 'Category',
			...categorySales,
		},
	];

	return (
		<Space style={{ display: 'flex', flexDirection: 'column' }}>
			<Title>Distribution of Sales</Title>
			<BarChart width={800} height={300} data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={'name'} />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey={'Electronics'} fill="#8884d8" />
				<Bar dataKey={'Clothing'} fill="#82ca9d" />
				<Bar dataKey={'Books'} fill="red" />
			</BarChart>
		</Space>
	);
};

export default BarDiagram;

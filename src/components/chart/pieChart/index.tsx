import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppSelector } from '../../../hooks/redux';
import { IReport } from '../../../models/IReport';

interface IDailySales {
	[date: string]: number;
}

const PieDiagram: FC = () => {
	const { filteredData } = useAppSelector((state) => state.reportReducer);

	const categorySales = filteredData.reduce((acc: IDailySales, item: IReport) => {
		const { category, revenue } = item;
		acc[category] = (acc[category] || 0) + revenue;
		return acc;
	}, {});

	const categorySalesArray = Object.keys(categorySales).map((category) => ({
		category,
		totalRevenue: categorySales[category],
	}));

	console.log(categorySalesArray);

	return (
		<BarChart width={730} height={250} data={filteredData}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="totalRevenue" />
			<YAxis />
			<Tooltip />
			<Legend />
			{/*{categorySalesArray.map((cat) => (*/}
			{/*	<Bar dataKey={cat.category} fill="#8884d8" />*/}
			{/*))}*/}
			<Bar dataKey={'Electronics'} fill="#8884d8" />
			<Bar dataKey={'Clothing'} fill="#82ca9d" />
			<Bar dataKey={'Books'} fill="red" />
		</BarChart>
	);
};

export default PieDiagram;

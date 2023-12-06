import { FC } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetDay } from '../../../shared/hooks/useGetDay';
import { ITransformedDataEntry } from '../index';

interface IDiagramComponentProps {
	transformedData: ITransformedDataEntry[];
	firstCategory: string;
	secondCategory: string;
}

const DiagramComponent: FC<IDiagramComponentProps> = ({
	transformedData,
	firstCategory,
	secondCategory,
}) => (
	<LineChart width={700} height={400} data={transformedData}>
		<Line type={'monotone'} dataKey={`${firstCategory}`} stroke={'#2196F3'} />
		<Line type={'monotone'} dataKey={`${secondCategory}`} stroke={'#82ca9d'} />
		<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
		<XAxis dataKey={useGetDay('date')} />
		<YAxis />
		<Tooltip />
		<Legend />
	</LineChart>
);

export default DiagramComponent;

import { CSSProperties, FC, useState } from 'react';
import { useAppSelector } from '../../shared/hooks/redux';
import SelectComponent from './selectComponent';
import DiagramComponent from './diagramComponent';
import { Space, Typography } from 'antd';

export interface ITransformedDataEntry {
	date: string;
	[key: string]: string | number;
}

const ComparisonFeature: FC = () => {
	const [firstCategory, setFirstCategory] = useState('');
	const [secondCategory, setSecondCategory] = useState('');
	const { filteredData } = useAppSelector((state) => state.reportReducer);

	const { Title, Text } = Typography;

	const uniqueCategories = [...new Set(filteredData.map((item) => item.category))];
	const transformedUniqueCategories = uniqueCategories.map((item) => ({
		value: item,
		label: item,
	}));

	const transformedData: ITransformedDataEntry[] = filteredData.reduce(
		(result: ITransformedDataEntry[], item) => {
			const dateExists = result.find((entry) => entry.date === item.date);

			if (dateExists) {
				dateExists[firstCategory] =
					+dateExists[firstCategory] + (item.category === firstCategory ? item.revenue : 0);
				dateExists[secondCategory] =
					+dateExists[secondCategory] + (item.category === secondCategory ? item.revenue : 0);
			} else {
				const newEntry: ITransformedDataEntry = {
					date: item.date,
					[firstCategory]: item.category === firstCategory ? item.revenue : 0,
					[secondCategory]: item.category === secondCategory ? item.revenue : 0,
				};
				result.push(newEntry);
			}

			return result;
		},
		[],
	);

	return (
		<Space style={{ display: 'flex', flexDirection: 'column' }}>
			<Title>Compare Category</Title>
			<SelectComponent
				uniqueCategories={transformedUniqueCategories}
				firstCategory={firstCategory}
				secondCategory={secondCategory}
				setFirstCategory={setFirstCategory}
				setSecondCategory={setSecondCategory}
			/>
			<DiagramComponent
				transformedData={transformedData}
				firstCategory={firstCategory}
				secondCategory={secondCategory}
			/>
		</Space>
	);
};

export default ComparisonFeature;

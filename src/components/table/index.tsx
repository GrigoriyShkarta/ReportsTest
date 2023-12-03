import { FC, useEffect, useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { reportSlice } from '../../store/reducers/reports';
import { tableTitles } from '../../shared/constants';
import { saveAs } from 'file-saver';
import Popup from './Popup';

interface IPopupProps {
	title: string;
	x: number;
	y: number;
}

const Table: FC = () => {
	const { filteredData, month, years } = useAppSelector((state) => state.reportReducer);
	const { changeDataByMonthAndYear } = reportSlice.actions;
	const [activePopup, setActivePopup] = useState<boolean>(false);
	const [csvData, setCsvData] = useState<string>('');
	const [category, setCategory] = useState<IPopupProps>({ title: 'category', x: 0, y: 0 });
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(changeDataByMonthAndYear({ month, years }));
	}, []);

	const handleClick = (e: MouseEvent<HTMLButtonElement>, title: string): void => {
		const { clientX, clientY } = e;
		setCategory({ title, x: clientX, y: clientY });
		setActivePopup(!activePopup);
	};

	const getDay = (date: string): number => {
		const dateObject = new Date(date);
		return dateObject.getDate();
	};

	const handleDownloadCsv = (): void => {
		const csvHeaders = tableTitles.join(',') + '\n';
		const csvBody = filteredData.map((item) => Object.values(item).join(',')).join('\n');
		const csvString = csvHeaders + csvBody;
		const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
		saveAs(csvBlob, 'table_data.csv');
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						{tableTitles.map((item) => (
							<th key={item}>
								<span>{item}</span>
								<button onClick={(e): void => handleClick(e, item)}>&#x142F;</button>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredData.map((item, index) => (
						<tr key={index}>
							<td>{getDay(item.date)}</td>
							<td>{item.category}</td>
							<td>{item.unitsSold}</td>
							<td>{item.revenue}</td>
							<td>{item.profit}</td>
						</tr>
					))}
				</tbody>
			</table>
			{activePopup && (
				<Popup
					title={category.title}
					x={category?.x}
					y={category?.y}
					setActivePopup={setActivePopup}
				/>
			)}
			<button onClick={handleDownloadCsv}>Download CSV</button>
		</div>
	);
};

export default Table;

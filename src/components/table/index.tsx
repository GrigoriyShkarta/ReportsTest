import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { useGetDay } from '../../shared/hooks/useGetDay';

import { saveAs } from 'file-saver';

import { IReport } from '../../models/IReport';
import { reportSlice } from '../../store/reducers/reports';
import { monthNames, tableTitles } from '../../shared/constants';

import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Table, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const TableComponent: FC = () => {
	const { filteredData, month } = useAppSelector((state) => state.reportReducer);
	const { changeDataByMonthAndYear } = reportSlice.actions;
	const dispatch = useAppDispatch();
	const uniqCategory = [...new Set(filteredData.map((item) => item.category))];
	const dataSource = filteredData.map((item, idx) => ({ ...item, key: idx }));

	const columns: ColumnsType<IReport> = [
		{
			title: 'Day',
			dataIndex: 'date',
			key: 'day',
			sorter: (a, b) => useGetDay(a.date) - useGetDay(b.date),
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
			filters: uniqCategory.map((item) => ({
				text: item,
				value: item,
			})),
			onFilter: (value: any, record) => record.category.includes(value),
		},
		{
			title: 'UnitsSold',
			dataIndex: 'unitsSold',
			key: 'unitsSold',
			sorter: (a, b) => a.unitsSold - b.unitsSold,
		},
		{
			title: 'Revenue',
			dataIndex: 'revenue',
			key: 'revenue',
			sorter: (a, b) => a.revenue - b.revenue,
		},
		{
			title: 'Profit',
			dataIndex: 'profit',
			key: 'profit',
			sorter: (a, b) => a.profit - b.profit,
		},
	];
	const { Title } = Typography;

	useEffect(() => {
		dispatch(changeDataByMonthAndYear(month));
	}, []);

	const handleDownloadCsv = (): void => {
		const csvHeaders = tableTitles.join(',') + '\n';
		const csvBody = filteredData.map((item) => Object.values(item).join(',')).join('\n');
		const csvString = csvHeaders + csvBody;
		const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
		saveAs(csvBlob, `${monthNames[month - 1]}_report.csv`);
	};

	return (
		<Space style={{ display: 'flex', flexDirection: 'column' }}>
			<Title>Monthly Report</Title>
			<Table
				dataSource={dataSource}
				columns={columns}
				scroll={{ y: 400 }}
				virtual={true}
				pagination={false}
			/>
			<Button
				type="primary"
				onClick={handleDownloadCsv}
				icon={<DownloadOutlined />}
				size={'large'}
				style={{ margin: '10px 0' }}
			>
				Download
			</Button>
		</Space>
	);
};

export default TableComponent;

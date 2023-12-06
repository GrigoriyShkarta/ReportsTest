import React, { useEffect } from 'react';
import { useAppDispatch } from './shared/hooks/redux';
import { reportSlice } from './store/reducers/reports';
import fakeData from './shared/MOCK_DATA.json';

import TableComponent from './components/table';
import Chart from './components/chart';
import ComparisonFeature from './components/comparisonFeature';
import HeaderApp from './components/header';

import { Row, Col, Layout } from 'antd';
import './App.css';

function App(): JSX.Element {
	const dispatch = useAppDispatch();
	const { getData } = reportSlice.actions;
	const { Footer } = Layout;

	useEffect(() => {
		dispatch(getData(fakeData));
	}, []);

	return (
		<div className="App">
			<HeaderApp />
			<Row style={{ marginTop: '50px' }}>
				<Col xs={24} sm={24} md={24} lg={24} xl={{ span: 10, offset: 1 }}>
					<TableComponent />
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={{ span: 10, offset: 1 }}>
					<ComparisonFeature />
				</Col>
			</Row>
			<Chart />
			<Footer style={{ background: '#001529' }} />
		</div>
	);
}

export default App;

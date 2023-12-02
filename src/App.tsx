import React, { useEffect } from 'react';
import './App.css';
import Table from './components/table';
import { useAppDispatch } from './hooks/redux';
import { reportSlice } from './store/reducers/reports';
import fakeData from './MOCK_DATA.json';

function App(): JSX.Element {
	const dispatch = useAppDispatch();
	const { getData } = reportSlice.actions;

	useEffect(() => {
		dispatch(getData(fakeData));
	}, []);

	return (
		<div className="App">
			<Table />
		</div>
	);
}

export default App;

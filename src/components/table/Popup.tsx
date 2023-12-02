import { Dispatch, FC, SetStateAction } from 'react';
import { SortBy, tableTitles, Title } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { reportSlice } from '../../store/reducers/reports';

export interface IPopupProps {
	title: string;
	x: number;
	y: number;
	setActivePopup: Dispatch<SetStateAction<boolean>>;
}

const Popup: FC<IPopupProps> = ({ title, x, y, setActivePopup }) => {
	const { data } = useAppSelector((state) => state.reportReducer);
	const { filterCategory, sortData } = reportSlice.actions;
	const dispatch = useAppDispatch();
	const uniqCategory = [...new Set(data.map((item) => item.category)), 'All Category'];
	console.log(uniqCategory);

	const handleClick = (item: string): void => {
		dispatch(filterCategory(item));
		setActivePopup(false);
	};

	return (
		<div style={{ position: 'absolute', zIndex: 10, left: x, top: y }}>
			<ul>
				{title === 'category' ? (
					uniqCategory.map((item) => (
						<li key={item} onClick={(): void => handleClick(item)}>
							{item}
						</li>
					))
				) : (
					<>
						<li onClick={(): void => dispatch(sortData({ title, sort: SortBy.ASCENDING }))}>ASC</li>
						<li onClick={(): void => dispatch(sortData({ title, sort: SortBy.DESCENDING }))}>
							DESC
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Popup;

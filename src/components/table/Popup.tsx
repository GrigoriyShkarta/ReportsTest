import { Dispatch, FC, SetStateAction } from 'react';
import { tableTitles } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { reportSlice } from '../../store/reducers/reports';

export interface IPopupProps {
	isCategory: boolean;
	x: number;
	y: number;
	setActivePopup: Dispatch<SetStateAction<boolean>>;
}

const Popup: FC<IPopupProps> = ({ isCategory, x, y, setActivePopup }) => {
	const { data } = useAppSelector((state) => state.reportReducer);
	const { filterCategory } = reportSlice.actions;
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
				{isCategory ? (
					uniqCategory.map((item) => (
						<li key={item} onClick={(): void => handleClick(item)}>
							{item}
						</li>
					))
				) : (
					<p>item</p>
				)}
			</ul>
		</div>
	);
};

export default Popup;

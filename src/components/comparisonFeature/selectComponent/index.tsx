import { CSSProperties, Dispatch, FC, SetStateAction } from 'react';
import { Select, Space } from 'antd';

interface ISelectComponentProps {
	uniqueCategories: { value: string; label: string }[];
	firstCategory: string;
	secondCategory: string;
	setFirstCategory: Dispatch<SetStateAction<string>>;
	setSecondCategory: Dispatch<SetStateAction<string>>;
}

const wrapperSelect: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	marginBottom: '30px',
};
const SelectComponent: FC<ISelectComponentProps> = ({
	uniqueCategories,
	firstCategory,
	secondCategory,
	setFirstCategory,
	setSecondCategory,
}) => (
	<Space style={wrapperSelect}>
		<Select
			defaultValue={'Select Category'}
			style={{ width: 200 }}
			onChange={(value): void => setFirstCategory(value)}
			options={uniqueCategories.filter((item) => item.value !== secondCategory)}
		/>
		<Select
			defaultValue={'Select Category'}
			style={{ width: 200 }}
			onChange={(value): void => setSecondCategory(value)}
			options={uniqueCategories.filter((item) => item.value !== firstCategory)}
		/>
	</Space>
);

export default SelectComponent;

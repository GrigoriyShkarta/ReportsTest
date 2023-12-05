import { FC } from 'react';
import LineDiagram from './lineChart';
import PieDiagram from './pieChart';

const Charts: FC = () => {
	return (
		<div>
			<LineDiagram />
			<PieDiagram />
		</div>
	);
};

export default Charts;

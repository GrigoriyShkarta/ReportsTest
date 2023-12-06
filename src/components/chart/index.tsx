import { CSSProperties, FC } from 'react';
import { Col, Row } from 'antd';
import LineDiagram from './lineChart';
import BarDiagram from './barChart';

const chartsStyle: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	flexWrap: 'wrap',
	margin: '30px 0',
};

const Charts: FC = () => (
	<Row style={chartsStyle}>
		<Col xs={24} sm={24} md={24} lg={24} xl={{ span: 12 }}>
			<LineDiagram />
		</Col>
		<Col xs={24} sm={24} md={24} lg={24} xl={{ span: 12 }}>
			<BarDiagram />
		</Col>
	</Row>
);

export default Charts;

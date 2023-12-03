export function mapTitles(title: string): string {
	switch (title) {
		case 'Day':
			return 'date';
		case 'Revenue':
			return 'revenue';
		case 'UnitsSold':
			return 'unitsSold';
		case 'Profit':
			return 'profit';
		default:
			return 'date';
	}
}

export const useGetDay = (date: string): number => {
	const dateObject = new Date(date);
	return dateObject.getDate();
};

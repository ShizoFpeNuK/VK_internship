export const getTotalPageCount = (countElements: number, count: number): number => {
	return Math.ceil(countElements / count);
};
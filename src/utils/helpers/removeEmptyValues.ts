export const removeEmptyValues = (obj: Object) =>
	Object.fromEntries(Object.entries(obj).filter(([_, val]) => val !== null));

// Возвращает false, если нет пустых значений, иначе true

const isEmpty = (value: any): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string" && value.trim() === "") return true;
	if (Array.isArray(value) && value.length === 0) return true;
	if (typeof value === "object" && Object.keys(value).length === 0) return true;
	return false;
};

export const hasEmptyValues = (obj: any, notCheckFields: string[] = []): boolean => {
	if (typeof obj !== "object" || obj === null) {
		return isEmpty(obj);
	}

	for (const key in obj) {
		if (obj.hasOwnProperty(key) && !notCheckFields.includes(key)) {
			if (typeof obj[key] === "object") {
				if (hasEmptyValues(obj[key], notCheckFields)) {
					return true;
				}
			} else if (isEmpty(obj[key])) {
				return true;
			}
		}
	}

	return false;
};

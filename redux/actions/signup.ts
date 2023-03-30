export function set(field: string, value: string) {
	return {
		type: field,
		payload: value,
	}
}

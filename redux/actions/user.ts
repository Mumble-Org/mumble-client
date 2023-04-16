/**
 * set a field in reducer
 * 
 * @param field redux case string
 * @param value value to be set
 * @return
 */
export function set(field: string, value: any) {
	return {
		type: field,
		payload: value,
	}
}

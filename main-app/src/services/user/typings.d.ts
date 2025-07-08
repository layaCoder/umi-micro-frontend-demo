declare namespace User {

export interface LoginResponse {
	message: string;
	code: string;
	total: number;
	returnUrl: string;
	data: string;
}
}
export interface IInitialValues {
	name: string;
	surname: string;
	data: string;
	gender: string;
	email: string;
}

export interface IResponseValidationEmail {
	status: number;
	status_message: string;
	validation_status: boolean;
	email: string;
}

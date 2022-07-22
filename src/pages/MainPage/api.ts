import axios from 'axios';
import { IResponseValidationEmail } from './types';

export async function requestValidateEmail(email: string) {
	const url: string = 'https://corsproxy.io/?' + encodeURIComponent(`https://extensi.io/api/email-validator.php?email=${email}`);
	return await axios.get<IResponseValidationEmail>(url);
}

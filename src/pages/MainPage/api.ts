import axios from 'axios';
import { IResponseValidationEmail } from './types';

export async function requestValidateEmail(email: string) {
	const url: string = 'https://api.codetabs.com/v1/proxy?quest=' + `https://extensi.io/api/email-validator.php?email=${encodeURIComponent(email)}`;

	return await axios.get<IResponseValidationEmail>(url);
}

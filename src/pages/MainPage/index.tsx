import './style.scss';
import { Field, Form, Formik } from 'formik';
import { IEmail, IInitialValues } from './types';
import React, { useState } from 'react';
import { requestValidateEmail } from './api';

export const MainPage = () => {
	const [validationStatus, setValidationStatus] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');

	const initialValues: IInitialValues = {
		name: '',
		surname: '',
		data: '',
		gender: '',
		email: '',
	};

	const validate = async (values: IInitialValues) => {
		const errors: IInitialValues = {};
		if (!values.name) {
			errors.name = 'Required';
		}

		if (!values.email) {
			errors.email = 'Required';
		} else {
			const response = await requestValidateEmail(values.email);
			if (!response.data.validation_status) {
				errors.email = 'Not valid mail';
			}
		}

		if (!values.gender) {
			errors.gender = 'Required';
		}

		return errors;
	};

	async function sendEmail(email: string) {
		console.log('sendMial');
		alert('Data for verification departure');
		try {
			const response = await requestValidateEmail(email);
			if (response.data.status == 200) {
				setValidationStatus(true);
				setEmail(response.data.email);
			}
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div className="main-page">
			<div className="main-page__container">
				{!validationStatus ? (
					<div className="main-page__form">
						<Formik initialValues={initialValues} validate={validate} onSubmit={(values) => sendEmail(values.email ? values.email : '')}>
							{({ errors, touched, values, isValid, dirty }) => {
								return (
									<Form className="form">
										<h2>Verify your email</h2>
										<div className="form__item-wrap">
											<Field type="text" placeholder="Name" name="name" className="form__input" />
											{errors.name && touched.name ? <div className="form__item-error">{errors.name}</div> : null}
										</div>
										<div className="form__item-wrap">
											<Field type="text" placeholder="Surname" name="surname" className="form__input" />
										</div>
										<div className="form__item-wrap">
											<Field type="email" placeholder="Email" name="email" className="form__input" />
											{errors.email && (touched.email || values.email) ? <div className="form__item-error">{errors.email}</div> : null}
										</div>
										<div className="form__item-wrap">
											<Field type="date" placeholder="birth of data" name="data" className="form__input" />
										</div>
										<div className="form__radio-btn-wrap">
											<div className="form__radio-btn-wrap-item">
												<Field type="radio" name="gender" className="form__radio-btn" value="Female" />
												<label>Female</label>
											</div>
											<div className="form__radio-btn-wrap-item">
												<Field type="radio" name="gender" className="form__radio-btn" value="Male" />
												<label>Male</label>
											</div>
											<div className="form__radio-btn-wrap-item">
												<Field type="radio" name="gender" className="form__radio-btn" value="Other" />
												<label>Other</label>
											</div>
											{errors.gender && touched.gender ? <div className="form__item-error">{errors.gender}</div> : null}
										</div>
										<button className="form__btn" type="submit">
											Verify
										</button>
									</Form>
								);
							}}
						</Formik>
					</div>
				) : (
					<div className="main-page__verify-status">
						<h2 className="verify__status">Your email verified</h2>
						<div className="verify__email">{email}</div>
						<button className="form__btn" onClick={() => setValidationStatus(false)}>
							Back to verify
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

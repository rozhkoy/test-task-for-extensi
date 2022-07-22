import './style.scss';
import { Field, Form, Formik } from 'formik';
import { IEmail, IInitialValues } from './types';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { requestValidateEmail } from './api';

export const MainPage = () => {
	const [validationStatus, setValidationStatus] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [emailStatus, setEmailStatus] = useState<IEmail>({ status: false, message: '' });

	const initialValues: IInitialValues = {
		name: '',
		surname: '',
		data: '',
		gender: '',
	};

	const DisplayingErrorMessagesSchema = Yup.object().shape({
		name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
		data: Yup.string().required('Required'),
		gender: Yup.string().required('Required'),
	});

	async function sendEmail(email: string) {
		alert('Data for verification departure');
		try {
			if (emailStatus.status) {
				const response = await requestValidateEmail(email);
				console.log(response.data);
				if (response.data.status == 200) {
					setValidationStatus(true);
					setEmail(response.data.email);
				}
			}
		} catch (e) {
			alert(e);
		}
	}

	async function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
		const response = await requestValidateEmail(e.target.value);
		if (!response.data.validation_status) {
			setEmailStatus((prevState) => {
				prevState.message = 'Not valid email';
				return prevState;
			});
		} else {
			setEmailStatus((prevState) => {
				prevState.status = true;
				prevState.message = '';
				return prevState;
			});
		}
	}

	function buttonHandler() {
		if (!emailStatus.status) {
			setEmailStatus((prevState) => {
				prevState.message = 'Required';
				return prevState;
			});
		}
	}

	return (
		<div className="main-page">
			<div className="main-page__container">
				{!validationStatus ? (
					<div className="main-page__form">
						<Formik initialValues={initialValues} validationSchema={DisplayingErrorMessagesSchema} onSubmit={() => sendEmail(email)}>
							{({ errors, touched }) => {
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
											<Field type="email" placeholder="Email" value={email} onChange={validateEmail} name="email" className="form__input" />
											<div className="form__item-error">{emailStatus.message}</div>
										</div>
										<div className="form__item-wrap">
											<Field type="date" placeholder="birth of data" name="data" className="form__input" />
											{errors.data && touched.data ? <div className="form__item-error">{errors.data}</div> : null}
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
										<button onClick={buttonHandler} className="form__btn" type="submit">
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
						<button
							className="form__btn"
							onClick={() => {
								setValidationStatus(false);
								setEmailStatus({ status: false, message: '' });
								setEmail('');
							}}>
							Back to verify
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

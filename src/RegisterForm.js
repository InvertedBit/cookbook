import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';

const RegisterForm = (props) => {
    const data = {
        name: '',
        username: '',
        password: ''
    };
    const { t } = useTranslation('translations');
    return (
        <div>
            <Formik
            initialValues={data}
            onSubmit={(values) => {
                props.callback(values);
            }}
            >
                <Form>
                    <div className="uk-form-controls">
                        <label className="uk-form-label" htmlFor="name">
                            <Trans i18nKey="registerForm.name.label">
                                Name
                            </Trans>
                        </label>
                        <Field className="uk-input" id="name" name="name" />
                    </div>

                    <div className="uk-form-controls">
                        <label className="uk-form-label" htmlFor="email">
                            <Trans i18nKey="registerForm.email.label">
                                E-Mail
                            </Trans>
                        </label>
                        <Field className="uk-input" id="email" name="email" />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                        <label className="uk-form-label" htmlFor="password">
                            <Trans i18nKey="registerForm.password.label">
                                Password
                            </Trans>
                        </label>
                        <Field className="uk-input" id="password" name="password" type="password" />
                    </div>

                    
                    <button className="uk-button-primary uk-margin-top" type="submit">
                        <Trans i18nKey="registerForm.submitButton.text">
                            Register
                        </Trans>
                    </button>

                </Form>
            </Formik>
        </div>
    );
};

export default RegisterForm;

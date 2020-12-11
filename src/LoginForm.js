import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';

const LoginForm = (props) => {
    const data = {
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
                    <label className="uk-form-label" htmlFor="email">
                        <Trans i18nKey="loginForm.email.label">
                            E-Mail
                        </Trans>
                    </label>
                        <Field className="uk-input" id="email" name="email" />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                    <label className="uk-form-label" htmlFor="password">
                        <Trans i18nKey="loginForm.password.label">
                            Password
                        </Trans>
                    </label>
                        <Field className="uk-input" id="password" name="password" type="password" />
                    </div>

                    
                    <button className="uk-button-primary uk-margin-top" type="submit">
                        <Trans i18nKey="loginForm.submitButton.text">
                            Login
                        </Trans>
                    </button>

                </Form>
            </Formik>
        </div>
    );
};

export default LoginForm;

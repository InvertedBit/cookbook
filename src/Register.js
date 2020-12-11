import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import Header from './Header';
import AuthService from './services/auth.service';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values) {
        AuthService.register(values.name, values.email, values.password).then((res) => {
            let user = res;
            if (user) {
                this.props.history.replace('/recipes');
            }
        });
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <Header onLanguageChange={this.props.onLanguageChange}>
                    <h1>{t('register.title', 'Register')}</h1>
                </Header>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <RegisterForm callback={this.onFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(withTranslation('translations')(Register));

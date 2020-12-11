import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import LoginForm from './LoginForm';
import AuthService from './services/auth.service';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values) {
        AuthService.login(values.email, values.password).then((res) => {
            let { from } = this.props.location.state || { from: { pathname: '/recipes' } }
            let user = res;
            if (user) {
                this.props.history.replace(from);
            }
        });
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <Header onLanguageChange={this.props.onLanguageChange}>
                    <h1>{t('login.title', 'Login')}</h1>
                </Header>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <LoginForm callback={this.onFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(withTranslation('translations')(Login));

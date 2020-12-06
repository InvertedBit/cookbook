import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import AuthService from './services/auth.service';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        if (this.state === undefined) {
            this.state = {
                success: false
            }
        }
        
        AuthService.logout().then((res) => {
            let success = res;
            if (success) {
                props.history.push('/login');
            }

            this.state = {
                success: success
            };
        });


    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <Header onLanguageChange={this.props.onLanguageChange}>
                    <h1>{t('logout.title', 'Logout')}</h1>
                </Header>
                <div className="uk-section uk-section-default">
                    {this.state.success ?
                        <h2 className="uk-h2">{t('logout.success', 'Successfully logged out')}</h2>
                    :
                        <h2 className="uk-h2">{t('logout.failure', 'Failed logging out')}</h2>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(withTranslation('translations')(Logout));

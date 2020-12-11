import React from 'react';
import { useTranslation } from "react-i18next";
import AuthService from './services/auth.service';
import './i18n';
import {Link} from 'react-router-dom';

function Header(props) {
        const { t, i18n } = useTranslation('translations');

        let curLang = i18n.language;

        let languageSwitcher = (
            <div className="uk-margin-top">
                <select className="uk-select" name="language" onChange={props.onLanguageChange} defaultValue={curLang}>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
        );

    const user = AuthService.getCurrentUser();

    let userSectionContent = (
        <React.Fragment>
            <ul className="uk-list">
                <li>
                    <Link className="uk-button uk-button-default uk-width-expand" to="/login">{t('header.loginLink', 'Login')}</Link>
                </li>
                <li>
                    <Link className="uk-button uk-button-default uk-width-expand" to="/register">{t('header.registerLink', 'Register')}</Link>
                </li>
            </ul>
        </React.Fragment>
    );

    if (user) {
        userSectionContent = (
            <React.Fragment>
                <ul className="uk-list">
                    <li>
                        {t('header.userSection.loggedInAs', 'Logged in as {{name}}', {name: user.user.name})}
                    </li>
                    <li>
                        <Link className="uk-button uk-button-default uk-width-expand" to="/logout">{t('header.logoutLink', 'Logout')}</Link>
                    </li>
                </ul>
            </React.Fragment>
        );
    }


    let userSection = (
        <div className="uk-margin-top">
            {userSectionContent}
        </div>
    );

    let rightHeaderSection = (
        <div className="uk-position-right uk-margin-right uk-margin-top">
            {languageSwitcher}
            {userSection}
        </div>
    );

        

    if (props.backgroundImage) {
        return (
            <div className="uk-section-default">
                <div className="uk-section uk-light uk-background-cover" style={{backgroundImage: "url(" + props.backgroundImage + ")" }}>
                    <div className="uk-container">
                        {props.children}
                        {rightHeaderSection}
                    </div>
                </div>
            </div>
        );

    } else {
        return (
            <div className="uk-section uk-section-primary">
                <div className="uk-container">
                    {props.children}
                    {rightHeaderSection}
                </div>
            </div>
        );
    }

}

export default Header;

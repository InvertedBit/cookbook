import React from 'react';
import { useTranslation } from "react-i18next";
import './i18n';

function Header(props) {
        const { t, i18n } = useTranslation('translations');

        let curLang = i18n.language;

        let languageSwitcher = (
            <div className="uk-position-top-right uk-margin-right uk-margin-top">
                <select className="uk-select" name="language" onChange={props.onLanguageChange} defaultValue={curLang}>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
        );

    if (props.backgroundImage) {
        return (
            <div className="uk-section-default">
                <div className="uk-section uk-light uk-background-cover" style={{backgroundImage: "url(" + props.backgroundImage + ")" }}>
                    <div className="uk-container">
                        {props.children}
                        {languageSwitcher}
                    </div>
                </div>
            </div>
        );

    } else {
        return (
            <div className="uk-section uk-section-primary">
                <div className="uk-container">
                    {props.children}
                    {languageSwitcher}
                </div>
            </div>
        );
    }

}

export default Header;

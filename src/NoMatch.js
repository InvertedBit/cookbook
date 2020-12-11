import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import Header from "./Header";


function NoMatch(props) {
    let location = useLocation();
    let { t } = useTranslation('translations');

    return (
            <div>
                <Header onLanguageChange={props.onLanguageChange}>
                    <h1>{t('noMatch.title', 'Page not found...')}</h1>
                </Header>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <h2 className="uk-h2">{t('noMatch.message', 'Error 404: No page found at "{{pathname}}"', { pathname: location.pathname })}</h2>
                        <Link to="/recipes">{t('noMatch.recipeListLink', 'Go to recipe list')}</Link>
                    </div>
                </div>
            </div>
    );
}

export default NoMatch;

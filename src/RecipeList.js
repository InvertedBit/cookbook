import React from 'react';
import {useHistory} from 'react-router-dom';
import CONFIG from './Config';
import { useTranslation } from "react-i18next";
import './i18n';
import Header from './Header';

function RecipeList(props) {

        const { t, i18n } = useTranslation('translations');
        let history = useHistory();
        let curLang = i18n.language;

        let recipeList = (
            <div></div>
        );

        let languageSwitcher = (
            <div className="uk-position-top-right uk-margin-right uk-margin-top">
                <select className="uk-select" name="language" onChange={props.onLanguageChange}>
                    <option selected={curLang === 'en'} value="en">English</option>
                    <option selected={curLang === 'de'} value="de">Deutsch</option>
                </select>
            </div>
        );

        if (props.recipes !== null) {
            recipeList = props.recipes.map((recipe) => 
                <div key={recipe._id}>
                    <div className="uk-card uk-card-default">
                        { recipe.thumbnail &&
                        <div className="uk-card-header">
                            <div className="uk-inline">
                                <img src={CONFIG.API_URL + recipe.thumbnail.path} />
                                <div className="uk-overlay uk-overlay-default uk-position-bottom">
                                    <h3 className="uk-card-title">{recipe.name}</h3>
                                </div>
                            </div>
                        </div>
                        }
                        { (recipe.thumbnail === undefined) &&
                        <div className="uk-card-header">
                            <h3 className="uk-card-title">{recipe.name}</h3>
                        </div>
                        }
                        <div className="uk-card-body">
                            <p>{recipe.description}</p>
                        </div>
                        
                        <div className="uk-card-footer">
                            <div className="uk-button-group">
                                <button className="uk-button uk-button-secondary" onClick={() => history.push("/recipes/"+recipe._id)}>{t('recipeList.viewButton', 'View')}</button>
                                <button className="uk-button uk-button-primary" onClick={() => history.push("/recipes/edit/"+recipe._id)}>{t('recipeList.editButton', 'Edit')}</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        return (
            <div>
                <Header onLanguageChange={props.onLanguageChange}>
                    <h1>{t('recipeList.title', 'Recipe List')}</h1>
                    <button className="uk-icon-button" data-uk-icon="plus" onClick={() => history.push('/recipes/new')}></button>
                </Header>
                <div className="uk-section uk-section-default">
                    <div className ="uk-container">
                        <div className="uk-child-width-1-3 uk-text-center uk-grid-match" data-uk-grid>
                            {recipeList}
                        </div>
                    </div>
                </div>
            </div>
        );
}


export default RecipeList;

/*
 *

                <div className="uk-section uk-section-primary">
                    <div className="uk-container">
                        <h1>{t('recipeList.title', 'Recipe List')}</h1>
                        <button className="uk-icon-button" data-uk-icon="plus" onClick={() => history.push('/recipes/new')}></button>
                        {languageSwitcher}
                    </div>
                </div>


 *
 */

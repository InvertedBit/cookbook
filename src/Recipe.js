import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CONFIG from './Config';
import RecipeSteps from './RecipeSteps';
import Header from './Header';

function Recipe(props) {
    const { t } = useTranslation('translations');
    let params = useParams();
    let recipe = undefined;
    if (props.recipes) {
        recipe = props.recipes.find(r => r._id === params.recipeId);
    }
    let recipeHeader = (
            <Header onLanguageChange={props.onLanguageChange}>
                <h1>Recipe not found</h1>
            </Header>

    );
    if (recipe !== undefined) {

        if (recipe.thumbnail === undefined) {
            recipeHeader = (
                    <Header onLanguageChange={props.onLanguageChange}>
                        <Link to="/recipes">{t('recipeView.recipeListLink', 'Back to Recipe List')}</Link>
                        <h1>{recipe.name}</h1>
                    </Header>
            );
        } else {
            recipeHeader = (
                    <Header onLanguageChange={props.onLanguageChange} backgroundImage={CONFIG.API_URL + recipe.thumbnail.path}>
                        <Link to="/recipes">{t('recipeView.recipeListLink', 'Back to Recipe List')}</Link>
                        <h1>{recipe.name}</h1>
                    </Header>
            );
        }

    }

    return (
        <div>
            {recipeHeader}
            {recipe !== undefined &&
                <div>
                    <div className="uk-section uk-section-default">
                        <div className="uk-container">
                            <article className="uk-article">
                                <p className="uk-article-meta">{recipe.description}</p>
                            </article>
                        </div>
                    </div>
                    <div className="uk-section uk-section-primary">
                        <div className="uk-container">
                            <h3 className="uk-h3">{t('recipeView.ingredientTable.title', 'Ingredients')}</h3>
                            <table className="uk-table">
                                <thead>
                                    <th>
                                        <td>{t('recipeView.ingredientTable.heading.name', 'Name')}</td>
                                        <td>{t('recipeView.ingredientTable.heading.amount', 'Amount')}</td>
                                        <td>{t('recipeView.ingredientTable.heading.unit', 'Unit')}</td>
                                    </th>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div className="uk-section uk-section-muted">
                        <div className="uk-container">
                            <RecipeSteps steps={recipe.steps} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Recipe;

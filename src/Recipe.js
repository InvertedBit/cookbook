import { Link, useParams } from 'react-router-dom';
import CONFIG from './Config';
import RecipeSteps from './RecipeSteps';

function Recipe(props) {
    let params = useParams();
    let recipe = props.recipes.find(r => r._id === params.recipeId);
    let recipeHeader = (
            <div className="uk-section uk-section-primary">
                <div className="uk-container">
                    <h1>Recipe not found</h1>
                </div>
            </div>

    );

    if (recipe !== undefined && recipe.images.length === 0 || !recipe.images.some(i => i.thumbnail)) {
        recipeHeader = (
                <div className="uk-section uk-section-primary">
                    <div className="uk-container">
                        <Link to="/recipes">Back to Recipe List</Link>
                        <h1>{recipe.name}</h1>
                    </div>
                </div>
        );
    } else {
        recipeHeader = (
                <div className="uk-section-default">
                    <div className="uk-section uk-light uk-background-cover" style={{backgroundImage: "url(" + CONFIG.API_URL + "/" + recipe.images.find(i => i.thumbnail).path + ")" }}>
                        <div className="uk-container">
                            <Link to="/recipes">Back to Recipe List</Link>
                            <h1>{recipe.name}</h1>
                        </div>
                    </div>
                </div>
        );
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
                            <h3 className="uk-h3">Ingredients</h3>
                            <table className="uk-table">
                                <thead>
                                    <th>
                                        <td>Name</td>
                                        <td>Amount</td>
                                        <td>Unit</td>
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

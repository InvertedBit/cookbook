import { Link, useParams } from 'react-router-dom';

function Recipe(props) {
    let params = useParams();
    let recipe = props.recipes.find(r => r._id === params.recipeId);
    if (recipe === undefined) {
        return (
            <div>
                <div className="uk-section uk-section-primary">
                    <div className="uk-container">
                        <h1>Recipe not found</h1>
                    </div>
                </div>
            </div>
        );
    } else if (recipe.images.length === 0 || !recipe.images.some(i => i.thumbnail)) {
        return (
            <div>
                <div className="uk-section uk-section-primary">
                    <div className="uk-container">
                        <Link to="/recipes">Back to Recipe List</Link>
                        <h1>{recipe.name}</h1>
                    </div>
                </div>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <article className="uk-article">
                            <p className="uk-article-meta">{recipe.description}</p>
                        </article>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="uk-section-default">
                    <div className="uk-section uk-light uk-background-cover" style={{backgroundImage: "url(http://localhost:3001/" + recipe.images.find(i => i.thumbnail).path + ")" }}>
                        <div className="uk-container">
                            <Link to="/recipes">Back to Recipe List</Link>
                            <h1>{recipe.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <article className="uk-article">
                            <p className="uk-article-meta">{recipe.description}</p>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipe;

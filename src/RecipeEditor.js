import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import RecipeForm from './RecipeForm';


class RecipeEditor extends React.Component {
    constructor(props) {
        super(props);
        let recipeId = this.props.match.params ? this.props.match.params.recipeId : false;
        let hasValidRecipe = recipeId && this.props.recipes.some(r => r._id === recipeId);
        this.state = {
            recipe:  hasValidRecipe ? this.props.recipes.find(r => r._id === recipeId) : {},
            title: hasValidRecipe ? "Edit" : "Create",
            recipeId: recipeId
        }
    }

    deleteRecipe(id) {
        fetch('http://localhost:3001/api/v1/recipes/'+id, {
            method: 'DELETE'
        })
            .then(response => {
                this.props.history.push('/recipes');
                console.log(response);
            })
            .catch(console.log);
    }

    onFormSubmit(data) {
        console.log(data);
        console.log("submitting!");
        // return;

        let formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('ingredients', JSON.stringify(data.ingredients));
        formData.append('steps', JSON.stringify(data.steps));


        if (data.images !== undefined && data.images.length > 0) {

            data.images.forEach( function(image, i) {
                formData.append("image-"+i, image.fileObject);

                if (image.isDefault) {
                    formData.append("defaultImage", i);
                }
            }, formData);

        }

        fetch('http://localhost:3001/api/v1/recipes', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch(console.log);
    }

    render() {
        return (
            <div>
                <div className="uk-section uk-section-primary">
                    <div className="uk-container">
                        <Link to="/recipes">Back to Recipe List</Link>
                        <h1>{this.state.title} recipe</h1>
                        {this.props.match.params.recipeId !== undefined &&
                        <button className="uk-icon-button" data-uk-icon="trash" onClick={() => this.deleteRecipe(this.props.match.params.recipeId)}></button>
                        }
                    </div>
                </div>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <RecipeForm recipe={this.state.recipe} callback={this.onFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RecipeEditor);

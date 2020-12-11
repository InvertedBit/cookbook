import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import CONFIG from './Config';
import RecipeForm from './RecipeForm';
import { withTranslation } from 'react-i18next';
import Header from './Header';
import AuthService from './services/auth.service';


class RecipeEditor extends React.Component {
    constructor(props) {
        super(props);
        let recipeId = this.props.match.params ? this.props.match.params.recipeId : false;
        let hasValidRecipe = recipeId && this.props.recipes && this.props.recipes.some(r => r._id === recipeId);
        const t = this.props.t;
        let editTitle = t('recipeEditor.editTitle', 'Edit recipe');
        let createTitle = t('recipeEditor.createTitle', 'Create recipe');
        this.state = {
            recipe:  hasValidRecipe ? this.props.recipes.find(r => r._id === recipeId) : {},
            title: hasValidRecipe ? editTitle : createTitle,
            recipeId: recipeId
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidUpdate() {
        let recipeId = this.props.match.params ? this.props.match.params.recipeId : false;
        let hasValidRecipe = recipeId && this.props.recipes && this.props.recipes.some(r => r._id === recipeId);
        const t = this.props.t;
        let editTitle = t('recipeEditor.editTitle', 'Edit recipe');
        let createTitle = t('recipeEditor.createTitle', 'Create recipe');

        if (hasValidRecipe) {
            if (this.state.title !== editTitle) {
                this.setState({
                    title: editTitle
                });
            }
        } else {
            if (this.state.title !== createTitle) {
                this.setState({
                    title: createTitle
                });
            }
        }
    }

    deleteRecipe(id) {
        fetch(CONFIG.API_URL + 'api/v1/recipes/'+id, {
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

        let formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('ingredients', JSON.stringify(data.ingredients));
        formData.append('steps', JSON.stringify(data.steps));


        if (data.images !== undefined && data.images.length > 0) {

            let images = [];

            data.images.forEach( function(image, i) {
                if (image.uploaded) {
                    images.push(image._id);
                    if (image.isDefault) {
                        formData.append('thumbnail', image._id);
                    }
                }
            });

            formData.append('images', JSON.stringify(images));

        }

        fetch(CONFIG.API_URL + 'api/v1/recipes', {
            method: 'POST',
            headers: AuthService.getAuthHeader(),
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                console.log('response:',data);
                this.props.history.push('/recipes/' + data.data._id);
            })
            .catch(console.log);
    }

    render() {
        const t = this.props.t;
        return (
            <div id="recipeForm">
                <Header onLanguageChange={this.props.onLanguageChange}>
                        <Link to="/recipes">{t('recipeEditor.recipeListLink', 'Back to Recipe List')}</Link>
                        <h1>{this.state.title}</h1>
                        {this.props.match.params.recipeId !== undefined &&
                        <button className="uk-icon-button" data-uk-icon="trash" onClick={() => this.deleteRecipe(this.props.match.params.recipeId)}></button>
                        }
                </Header>
                <div className="uk-section uk-section-default">
                    <div className="uk-container">
                        <RecipeForm recipe={this.state.recipe} callback={this.onFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translations')(withRouter(RecipeEditor));

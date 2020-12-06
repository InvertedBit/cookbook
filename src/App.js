import React from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { Route, BrowserRouter as Router, Switch, withRouter, Redirect, useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './i18n';
import './App.scss';
import AuthService from './services/auth.service';
import RecipeList from './RecipeList';
import Recipe from './Recipe';
import RecipeEditor from './RecipeEditor';
import CONFIG from './Config';
import Login from './Login';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import NoMatch from './NoMatch';

UIkit.use(Icons);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            loadingState: 'Starting App...',
            splash: true,
            lang: 'en',
            redirectToLogin: false,
            user: AuthService.getCurrentUser(),
            authHeader: AuthService.getAuthHeader()
        }

        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentDidUpdate() {
        const newUser = AuthService.getCurrentUser();
        if (!this.state.user && newUser) {
            console.log('data  update needed!');
        }
    }

    componentDidMount() {
        this.setState({
            loadingState: 'Loading API Data...'
        });
        fetch(CONFIG.API_URL + 'api/v1/recipes', {
            method: 'GET',
            headers: this.state.authHeader
        })
            .then((res) => {
                if (res.status === 401) {
                    this.setState({
                        redirectToLogin: true,
                        recipes: []
                    });
                }
                return res.json();
            })
            .then((data) => {
                let recipes = [];
                if (data.data) {
                    recipes = data.data;
                }
                this.setState({
                    recipes: recipes,
                    loadingState: 'Done!'
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            splash: false
                        });
                }, 1000)});
            })
            .catch(console.log);
    }

    onLanguageChange = (event) => {
        let newLang = event.target.value;
        this.setState({
            lang: newLang
        });
        this.props.i18n.changeLanguage(newLang);
    }


    render() {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/">
                            {this.state.splash ? 
                            <div>
                                <div className="uk-position-center" data-uk-spinner="ratio: 5">
                                </div>
                                <div className="uk-position-center">{this.state.loadingState}</div>
                            </div>
                            :
                            <Redirect to="/recipes" />
                            }
                        </Route>
                        <Route exact path="/login">
                            <Login onLanguageChange={this.onLanguageChange} />
                        </Route>
                        <Route exact path="/logout">
                            <Logout onLanguageChange={this.onLanguageChange} />
                        </Route>
                        <PrivateRoute exact path="/recipes">
                            <RecipeList onLanguageChange={this.onLanguageChange} recipes={this.state.recipes} />
                        </PrivateRoute>
                        <PrivateRoute exact path="/recipes/new">
                            <RecipeEditor onLanguageChange={this.onLanguageChange} recipes={this.state.recipes} />
                        </PrivateRoute>
                        <PrivateRoute exact path="/recipes/:recipeId">
                            {this.state.recipes &&
                                <Recipe onLanguageChange={this.onLanguageChange} recipes={this.state.recipes} />
                            }
                        </PrivateRoute>
                        <PrivateRoute exact path="/recipes/edit/:recipeId">
                            {this.state.recipes &&
                                <RecipeEditor onLanguageChange={this.onLanguageChange} recipes={this.state.recipes} />
                            }
                        </PrivateRoute>
                        <Route path="*">
                            <NoMatch onLanguageChange={this.onLanguageChange} />
                        </Route>
                    </Switch>
                </Router>
            );
        // }
    }
}


export default withTranslation('translations')(App);
/*

                        <Route exact path="/recipes">
                            {this.state.redirectToLogin ?
                                <Redirect to={{
                                        pathname: '/login',
                                        state: { from: '/recipes' }
                                    }} />
                                :
                                <RecipeList onLanguageChange={this.onLanguageChange} recipes={this.state.recipes} />
                            }
                        </Route>
                        */

import React from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { Route, BrowserRouter as Router, Switch, withRouter, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
//import './App.css';
import './App.scss';
import RecipeList from './RecipeList';
import Recipe from './Recipe';
import RecipeEditor from './RecipeEditor';
import CONFIG from './Config';

UIkit.use(Icons);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            loadingState: 'Starting App...',
            splash: true
        }
    }

    componentDidMount() {
        this.setState({
            loadingState: 'Loading API Data...'
        });
        fetch(CONFIG.API_URL + 'api/v1/recipes')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    recipes: data.data,
                    loadingState: 'Done!'
                }, () => {
//                    this.props.history.push('/recipes');
                    // document.getElementById("splashScreen").className = "animated";
                    setTimeout(() => {
                        this.setState({
                            splash: false
                        });
                }, 1000)});
            })
            .catch(console.log);
    }



    render() {
        // if (this.state.splash) {
        //     return (
        //     );
        // } else {
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
                        <Route exact path="/recipes">
                            <RecipeList recipes={this.state.recipes} />
                        </Route>
                        <Route exact path="/recipes/new">
                            <RecipeEditor recipes={this.state.recipes} />
                        </Route>
                        <Route exact path="/recipes/:recipeId">
                            <Recipe recipes={this.state.recipes} />
                        </Route>
                        <Route exact path="/recipes/edit/:recipeId">
                            <RecipeEditor recipes={this.state.recipes} />
                        </Route>
                    </Switch>
                </Router>
            );
        // }
    }
}


export default App;

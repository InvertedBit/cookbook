import {Redirect, Route} from "react-router-dom";
import AuthService from './services/auth.service';


function PrivateRoute({ children, ...rest }) {
    const user = AuthService.getCurrentUser();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        ></Route>
    );
}

export default PrivateRoute;

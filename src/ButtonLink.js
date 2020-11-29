import {useRouteMatch} from "react-router-dom";

function ButtonLink(label, to, activeOnlyWhenExact) {

    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <button></button>
    );

}

export default ButtonLink;

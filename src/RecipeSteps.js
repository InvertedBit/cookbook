

function RecipeSteps(props) {
    const stepList = props.steps.map(step => 
        <div className="uk-card uk-card-default uk-card-body">
            <h4 className="uk-card-title">{step.heading}</h4>
            <p>{step.content}</p>
        </div>
    );

    return (
        <div className="uk-child-width-1-1" data-uk-grid>
            {stepList}
        </div>
    );
}

export default RecipeSteps;

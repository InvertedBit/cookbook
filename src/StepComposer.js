import React from 'react';
import { withTranslation } from 'react-i18next';


class StepComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: this.props.value || []
        };
        this.addStepHandler = this.addStepHandler.bind(this);
        this.renderSteps = this.renderSteps.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteStepHandler = this.deleteStepHandler.bind(this);
    }

    onChange(e, i) {
        let newSteps = this.state.steps;
        if (e.target.name === "heading") {
            newSteps.find(step => step._id == i).heading = e.target.value;
        } else if (e.target.name === "content") {
            newSteps.find(step => step._id == i).content = e.target.value;
        } else if (e.target.name === "duration") {
            newSteps.find(step => step._id == i).duration = e.target.value;
        } else if (e.target.name === "unit") {
            newSteps.find(step => step._id == i).unit = e.target.value;
        }

        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.steps);
        }
    }

    addStepHandler(e) {
        e.preventDefault();
        let newId = 0;
        if (this.state.steps.length > 0) {
            this.state.steps.forEach(function (step, index) {
                if (step._id >= newId) {
                    newId = parseInt(step._id) + 1;
                }
            }, newId);
        }
        let newStep = {
            _id: newId,
            heading: '',
            content: '',
            duration: 0,
            unit: ''
        };
        let newSteps = this.state.steps;
        newSteps.push(newStep);
        this.setState({
            steps: newSteps
        });

        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.steps);
        }
    }

    deleteStepHandler(e, i) {
        let newSteps = this.state.steps.filter(step => step._id != i);
        this.setState({
            steps: newSteps
        });

        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.steps);
        }
    }

    renderSteps() {
        const { t } = this.props;
        let renderedSteps = this.state.steps.map(step => 
            <div key={step._id} className="uk-inline uk-width-expand">
                    <div className="uk-position-center-right-out">
                        <button className="uk-icon-button uk-margin-left uk-button-danger" data-uk-icon="trash" onClick={(e) => this.deleteStepHandler(e, step._id)}></button>
                    </div>
                    <div className="uk-form-controls uk-margin-bottom">
                        <label className="uk-form-label" htmlFor={"heading-" + step._id}>{t('stepComposer.heading', 'Heading')}</label>
                        <input className="uk-input" type="text" id={"heading-" + step._id} name="heading" value={step.heading} onChange={(e) => this.onChange(e, step._id)} />
                    </div>
                    <div className="uk-form-controls uk-margin-bottom">
                        <label className="uk-form-label" htmlFor={"content-" + step._id}>{t('stepComposer.content', 'Content')}</label>
                        <textarea className="uk-textarea" id={"content-" + step._id} name="content" value={step.content} onChange={(e) => this.onChange(e, step._id)} />
                    </div>
                    <div className="uk-form-controls uk-margin-bottom">
                        <label className="uk-form-label" htmlFor={"duration-" + step._id}>{t('stepComposer.duration', 'Duration')}</label>
                        <input className="uk-input uk-form-width-small" type="number" id={"duration-" + step._id} name="duration" value={step.duration} onChange={(e) => this.onChange(e, step._id)} />
                        <input className="uk-input uk-form-width-small" type="text" id={"unit-" + step._id} name="unit" value={step.unit} onChange={(e) => this.onChange(e, step._id)} />
                    </div>
            </div>
        );
        return renderedSteps;
    }

    render() {
        return (
            <div>
                {this.renderSteps()}
                <button className="uk-icon-button uk-button-primary uk-margin-top uk-margin-bottom" data-uk-icon="plus" onClick={this.addStepHandler}></button>
            </div>
        );
    }
}

export default withTranslation('translations')(StepComposer);

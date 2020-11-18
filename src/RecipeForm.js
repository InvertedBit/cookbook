import React from 'react';
import { Field, Form, Formik } from 'formik';
import ImagePicker from './ImagePicker';
import IngredientPicker from './IngredientPicker';
import StepComposer from './StepComposer';

const ImagePickerInput = () => (
    <Field name="images" id="images" type="file">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>
                <label htmlFor="images" className="uk-form-label">
                    Upload Images
                </label>
                <div>
                    <ImagePicker
                        value={value}
                        handleChange={file => setFieldValue("images", file)} />
                </div>
            </div>
        )}
    </Field>
);

const IngredientPickerInput = () => (
    <Field name="ingredients" id="ingredients" type="text">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>
                <label htmlFor="ingredients" className="uk-form-label">
                    Pick ingredients
                </label>
                <IngredientPicker
                    value={value}
                    handleChange={list => setFieldValue("ingredients", list)} />
            </div>
        )}
    </Field>
);

const StepComposerInput = () => (
    <Field name="steps" id="steps" type="text">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>
                <label htmlFor="steps" className="uk-form-label">
                    Compose steps
                </label>
                <StepComposer
                    value={value}
                    handleChange={list => setFieldValue("steps", list)} />
            </div>
        )}
    </Field>
);

const RecipeForm = (props) => {
    const { recipe = {} } = props;
    return (
        <div>
            <Formik
            enableReinitialize={true}
            initialValues={recipe}
            onSubmit={(values) => {
                props.callback(values);
            }}>
                <Form>
                    <div className="uk-form-controls">
                    <label className="uk-form-label" htmlFor="name">Name</label>
                        <Field className="uk-input" id="name" name="name" />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                    <label className="uk-form-label" htmlFor="description">Description</label>
                        <Field className="uk-textarea" id="description" name="description" as="textarea" />
                    </div>



                    <div className="uk-form-controls uk-margin-top">
                        <ImagePickerInput />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                        <IngredientPickerInput />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                        <StepComposerInput />
                    </div>
                    
                    <button className="uk-button-primary uk-margin-top" type="submit">Submit</button>

                </Form>
            </Formik>
        </div>
    );
};

export default RecipeForm;

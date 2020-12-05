import React from 'react';
import { Field, Form, Formik } from 'formik';
import ImagePicker from './ImagePicker';
import IngredientPicker from './IngredientPicker';
import StepComposer from './StepComposer';
import { Translation, Trans, useTranslation } from 'react-i18next';

const ImagePickerInput = (props) => (
    <Field name="images" id="images" type="file">
        {({field: { value }, form: { setFieldValue } }) => (
            <div>
                
                    <Translation>
                        {
                            (t, { i18n }) => <label htmlFor="images" className="uk-form-label">{t('recipeForm.imagePicker.label', 'Upload Images')}</label>
                        }
                    </Translation>
                
                <div>
                    <ImagePicker
                        value={value}
                        thumbnail={props.thumbnail}
                        handleChange={images => setFieldValue("images", images)} />
                </div>
            </div>
        )}
    </Field>
);

const IngredientPickerInput = () => (
    <Field name="ingredients" id="ingredients" type="text">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>
                
                    <Translation>
                        {
                            (t, { i18n }) => <label htmlFor="ingredients" className="uk-form-label">{t('recipeForm.ingredientPicker.label', 'Pick ingredients')}</label>
                        }
                    </Translation>
                
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
                
                    <Translation>
                        {
                            (t, { i18n }) => <label htmlFor="steps" className="uk-form-label">{t('recipeForm.stepComposer.label', 'Compose steps')}</label>
                        }
                    </Translation>
                <StepComposer
                    value={value}
                    handleChange={list => setFieldValue("steps", list)} />
            </div>
        )}
    </Field>
);

const RecipeForm = (props) => {
    const { recipe = {} } = props;
    const { t } = useTranslation('translations');
    return (
        <div>
            <Formik
            enableReinitialize={true}
            initialValues={recipe}
            onSubmit={(values) => {
                props.callback(values);
            }}
            >
                <Form>
                    <div className="uk-form-controls">
                    <label className="uk-form-label" htmlFor="name">
                        <Trans i18nKey="recipeForm.recipeName.label">
                            Name
                        </Trans>
                    </label>
                        <Field className="uk-input" id="name" name="name" />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                    <label className="uk-form-label" htmlFor="description">
                        <Trans i18nKey="recipeForm.recipeDescription.label">
                            Description
                        </Trans>
                    </label>
                        <Field className="uk-textarea" id="description" name="description" as="textarea" />
                    </div>



                    <div className="uk-form-controls uk-margin-top">
                        <ImagePickerInput thumbnail={props.recipe.thumbnail} />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                        <IngredientPickerInput />
                    </div>

                    <div className="uk-form-controls uk-margin-top">
                        <StepComposerInput />
                    </div>
                    
                    <button className="uk-button-primary uk-margin-top" type="submit">
                        <Trans i18nKey="recipeForm.submitButton.text">
                            Submit
                        </Trans>
                    </button>

                </Form>
            </Formik>
        </div>
    );
};

export default RecipeForm;

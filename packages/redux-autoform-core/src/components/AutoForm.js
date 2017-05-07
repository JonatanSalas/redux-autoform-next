import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import LayoutProvider from '../layout/provider';

import Form from './Form';


class AutoForm extends Component {
    static propTypes = {
        componentFactory: PropTypes.func,
        layout: PropTypes.object,
        entityName: PropTypes.string,
        layoutName: PropTypes.string,
        errorRenderer: PropTypes.func,
        buttonBar: PropTypes.func,
        fieldLayout: PropTypes.string,

        // Redux-Form props
        form: PropTypes.string,
        onSubmit: PropTypes.func,
        onSubmitSuccess: PropTypes.func,
        onSubmitFail: PropTypes.func,
        alwaysAsyncValidate: PropTypes.bool,
        destroyOnUnmount: PropTypes.bool,
        formKey: PropTypes.string,
        initialValues: PropTypes.object,
        overwriteOnInitialValuesChange: PropTypes.bool,
        readonly: PropTypes.bool,
        returnRejectedSubmitPromise: PropTypes.bool,
        touchOnBlur: PropTypes.bool,
        touchOnChange: PropTypes.bool
    };

    componentWillMount() {
        // we need to delete all undefined reduxFormProps specifically because overwriteOnInitialValuesChange cannot
        // be undefined, otherwise it triggers this errors:
        //  Failed prop type: Required prop `overwriteOnInitialValuesChange` was not specified in `ReduxForm(AutoFormInternal)`.
        Object.keys(this.props).forEach(key => {
            const property = this.props[key];

            if (this.props.hasOwnProperty(property) && property === undefined) {
                delete this.props[key];
            }
        });
    }

    render() {
        const { form, onSubmit, handleSubmit, buttonBar, submitting, layout, componentFactory } = this.props;

        return (
            <Form form={form} onSubmit={handleSubmit(onSubmit)}>
                {this.renderLayout(componentFactory, layout)}
                {this.renderButtonBar(buttonBar, submitting)}
            </Form>
        )
    }

    renderButtonBar = (buttonBar, submitting) => React.createElement(buttonBar, { submitting });

    renderLayout = (componentFactory, layout) => {
        const formLayout = LayoutProvider.canonizeLayout(layout);

        //TODO let componentFactory do the job
        if (formLayout.hasOwnProperty('entities')) {
            return formLayout['entities'].map(entity => {
                if (entity.hasOwnProperty('fields')) {
                    return entity['fields'].map((field, idx) => componentFactory(field, idx));
                }

                return false;
            });
        }
    }
}

export default reduxForm()(AutoForm);
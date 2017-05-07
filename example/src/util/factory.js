import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'material-ui';

const buildInput = ({ displayName }) => (
    ({ input }) => (
        <div>
            <TextField
                {...input}
                fullWidth
                floatingLabelText={displayName}
            />
        </div>
    )
);

export default function componentFactory(field, idx) {
    const component = buildInput(field);

    return (
        <Field
            name={field.name}
            key={`field-${idx}`}
            component={component}
        />
    );
};
import React from 'react';

const Form = ({ children, ...formProps }) => (
    <form {...formProps}>
        {children}
    </form>
);

export default Form;
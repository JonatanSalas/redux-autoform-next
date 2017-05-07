import React from 'react';
import { RaisedButton } from 'material-ui';

const ButtonBar = (props) => (
    <RaisedButton
        disabled={props.submitting || props.pristine}
        label='Submit'
        type='submit'
        fullWidth
        primary
    />
);

export default ButtonBar;
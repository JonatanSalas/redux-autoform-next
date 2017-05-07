import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, Card, CardText, CardTitle, RaisedButton } from 'material-ui';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectEventTapPlugin from 'react-tap-event-plugin';

import store from './redux/store';

import componentFactory from './util/factory';
import exampleLayout from './schema/exampleLayout';

import Autoform from '../../packages/redux-autoform-core/src/components/AutoForm';

injectEventTapPlugin();

const handleSubmit = values => alert(JSON.stringify(values, null, 2));

const ButtonBar = (props) => (
    <RaisedButton
        disabled={props.submitting || props.pristine}
        label='Submit'
        type='submit'
        fullWidth
        primary
    />
);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#E0E0E0'
                    }}>
                        <Card style={{ minWidth: 350 }}>
                            <CardTitle style={{
                              minWidth: 350,
                                textAlign: 'center'
                            }}>
                                Redux Autoform v6
                            </CardTitle>
                            <CardText>
                                <Autoform
                                    form='autoform'
                                    buttonBar={ButtonBar}
                                    layout={exampleLayout}
                                    onSubmit={handleSubmit}
                                    componentFactory={componentFactory}
                                />
                            </CardText>
                        </Card>
                    </div>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

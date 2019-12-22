import * as React from 'react';
import { Header } from 'react-native-elements';

export default class HeaderComponent extends React.Component {
    public render() {
        return (
            <Header
                containerStyle={{
                    backgroundColor: '#2089dc'
                }}
                centerComponent={{ text: 'Welcome to BAM repositories list', style: { color: '#fff' } }}
            />
        );
    }
}
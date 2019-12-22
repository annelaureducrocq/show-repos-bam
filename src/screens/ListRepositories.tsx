import * as React from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import Repositories from '../api/Repositories';

interface IState {
    isLoading: boolean;
    repositories: any[];
}

export default class ListRepositories extends React.Component<any, IState> {

    constructor(props) {
        super(props);
        this.state = { isLoading: true, repositories: [] }
    }

    componentDidMount() {
        return fetch('https://api.github.com/orgs/bamlab/repos?page=1')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    repositories: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View>
                <Text> First page for now ...</Text>
                <FlatList
                    data={this.state.repositories}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
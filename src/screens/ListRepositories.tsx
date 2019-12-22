import * as React from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import Repositories from '../api/Repositories';

interface IState {
    isLoading: boolean;
    repositories: any[];
    page: number;
}

export default class ListRepositories extends React.Component<any, IState> {

    constructor(props) {
        super(props);
        this.state = { isLoading: true, repositories: [], page: 1 }
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.loadRepositories();
        });
    };

    loadRepositories() {
        const page = this.state.page;
        const repositories = this.state.repositories;
        this.setState({ ...this.state, isLoading: true });
        return fetch('https://api.github.com/orgs/bamlab/repos?page=${page}')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(page);
                this.setState({
                    isLoading: false,
                    repositories: page === 1 ? responseJson : [...responseJson, ...repositories]
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadRepositories();
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
                {this.state.repositories && <FlatList
                    data={this.state.repositories}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                    keyExtractor={(item, index) => String(index)}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                />}
                {this.state.isLoading &&
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#ff6a00" />
                    </View>
                }
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
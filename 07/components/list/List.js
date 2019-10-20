import React from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helper';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
    
        fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
        .then(handleResponse)
        .then(data => {
            this.setState({
                loading: false,
                currencies: data.currencies
            });
        })
        .catch(error => {
            this.setState({
                error: error.errorMessage,
                loading: false
            });
        });
    }

    render() {
        // console.log(this.state);
        if (this.state.loading) {
            return <div>Loading...</div>
        } return <div>render</div>
    }
}

export default List;
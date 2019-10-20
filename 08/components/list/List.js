import React from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helper';
import Loading from '../common/Loading';
import './Table.css';

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

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        }
        else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        }
        else {return <span>{percent}</span>}
    }

    render() {
        const { loading, currencies, error} = this.state;
        if (loading) {
            return <div className="loading-container">
                <Loading />
            </div>
        } 
        if (error) {
        return <div className="error"> {error} </div>
        }

        return (
            <div className="Table-container">
               <table className="Table">
                   <thead className="Table-head">
                      <tr>
                          <th>Cryptocurrency</th>
                          <th>Price</th>
                          <th>Market Cap</th>
                          <th>24H Change</th>
                      </tr>
                   </thead>
                   <tbody className="Table-body">
                       {currencies.map((currency) => (
                          <tr key={currency.id}>
                            <td>
                              <span className="Table-rank">{currency.rank}</span>
                              {currency.name}
                            </td>
                            <td>
                              <span className="Table-dollar">$ {currency.price}</span>
                            </td>
                            <td>
                              <span className="Table-dollar">$ {currency.marketCap}</span>
                            </td>
                            <td>
                              <span>{this.renderChangePercent(currency.percentChange24h)}</span>
                            </td>
                          </tr>
                       ))}
                   </tbody>
               </table>
            </div>
        )
    }
}

export default List;
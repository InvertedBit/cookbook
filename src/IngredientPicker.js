import React from 'react';

class IngredientPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.value || []
        };
        this.addRowHandler = this.addRowHandler.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.deleteRowHandler = this.deleteRowHandler.bind(this);
    }

    handleChange(e, i) {
        let rows = this.state.rows;
        if (e.target.name === 'name') {
            rows.find(row => row._id == i).name = e.target.value;
        } else if (e.target.name === 'amount') {
            rows.find(row => row._id == i).amount = e.target.value;
        } else if (e.target.name === 'unit') {
            rows.find(row => row._id == i).unit = e.target.value;
        }

        this.setState({
            rows: rows
        });

        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.rows);
        }
    }

    addRowHandler(e) {
        e.preventDefault();
        let newId = 0;
        if (this.state.rows.length > 0) {
            this.state.rows.forEach(function (row, index) {
                if (row._id >= newId) {
                    newId = row._id + 1;
                }
            }, newId);
        }
        let newRow = {
            _id: newId,
            name: '',
            amount: 0,
            unit: ''
        }
        let newRows = this.state.rows;
        newRows.push(newRow);
        this.setState({
            rows: newRows
        });

        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.rows);
        }
    }

    deleteRowHandler(i) {
        if (this.state.rows.some(row => row._id == i)) {
            this.setState((state, props) => ({
                rows: state.rows.filter(row => row._id != i)
            }));
        }

        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.rows);
        }
    }

    renderRows() {
        let renderedRows = this.state.rows.map(row => 
            <tr key={row._id}>
                <td>
                    <input className="uk-input" name="name" type="text" value={row.name} onChange={(e) => this.handleChange(e, row._id)} />
                </td>
                <td>
                    <input className="uk-input" name="amount" type="text" value={row.amount} onChange={(e) => this.handleChange(e, row._id)} />
                </td>
                <td>
                    <input className="uk-input" name="unit" type="text" value={row.unit} onChange={(e) => this.handleChange(e, row._id)} />
                </td>
                <td>
                    <button className="uk-icon-button uk-button-danger" data-uk-icon="trash" onClick={() => this.deleteRowHandler(row._id)}></button>
                </td>
            </tr>
        );

        return renderedRows;
    }
    
    render() {
        return (
            <div>
                <table className="uk-table uk-table-striped">
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Amount</th>
                        <th>Unit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
                </table>
                <button className="uk-icon-button uk-button-primary" data-uk-icon="plus" onClick={this.addRowHandler}></button>
            </div>
        );
    }
}


export default IngredientPicker;

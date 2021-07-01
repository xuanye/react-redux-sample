import React from 'react';
import { connect } from 'react-redux';
import { filterChanged, setASCSortType, setDESCSortType, addItem } from '@/reducers/address';

class Toolbar extends React.Component {
    render() {
        return (
            <div className='toolbar'>
                <button onClick={this.props.handleAddAddress}>Add Address Items</button>
                <button onClick={this.props.handleSortTypeChange.bind(this, 0)}>A-Z</button>
                <button onClick={this.props.handleSortTypeChange.bind(this, 1)}>Z-A</button>
                <input type='text' onChange={this.props.handleChange.bind(this)} />
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        handleChange(event) {
            dispatch(filterChanged(event.target.value));
        },
        handleSortTypeChange(sortType) {
            sortType == 0 ? dispatch(setASCSortType()) : dispatch(setDESCSortType());
        },
        handleAddAddress() {
            dispatch(addItem());
        },
    }),
)(Toolbar);

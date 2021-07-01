import React from 'react';
import { connect } from 'react-redux';
import {
    editAddressItem,
    saveAddressItem,
    removeAddressItem,
    cancelSaveItem,
} from '@/reducers/address';

import AddressItem from './AddressItem';

class AddressGrid extends React.Component {
    render() {
        const itemList = this.props.list.map((item, i) => {
            let show = true;
            if (this.props.filterText) {
                show =
                    item.name.indexOf(this.props.filterText) >= 0 ||
                    item.email.indexOf(this.props.filterText) >= 0 ||
                    item.address.indexOf(this.props.filterText) >= 0;
            }

            if (show) {
                return (
                    <AddressItem
                        key={i}
                        data={item}
                        highLightText={this.props.filterText}
                        onEdit={this.props.handleEdit.bind(this, i)}
                        onRemove={this.props.handleRemove.bind(this, i)}
                        onSave={this.props.handleSave.bind(this, i)}
                        onCancel={this.props.handleCancel.bind(this, i)}></AddressItem>
                );
            } else {
                return null;
            }
        });

        return <ul>{itemList}</ul>;
    }
}

export default connect(
    state => ({
        list: state.address.list,
        sortType: state.address.sortType,
        filterText: state.address.filterText,
    }),
    dispatch => ({
        handleEdit(index) {
            dispatch(editAddressItem({ index }));
        },
        handleRemove(index) {
            dispatch(removeAddressItem({ index }));
        },
        handleSave(index, data) {
            dispatch(saveAddressItem({ index, data }));
        },
        handleCancel(index, data) {
            dispatch(cancelSaveItem({ index, data }));
        },
    }),
)(AddressGrid);

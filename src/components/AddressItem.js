import React from 'react';
import PropTypes from 'prop-types';

export default class AddressItem extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        highLightText: PropTypes.string,
        onEdit: PropTypes.func,
        onRemove: PropTypes.func,
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: props.data.name,
            email: props.data.email,
            address: props.data.address,
            status: props.data.status,
        };
    }
    handleRemove() {
        this.props.onRemove();
    }
    handleEdit() {
        this.setState({ ...this.state, status: 2 });
        this.props.onEdit();
    }
    handleSave() {
        this.props.onSave(this.state);
    }
    handleCancel() {
        this.props.onCancel(this.state);
    }
    handleChange(propName, event) {
        var newState = {};
        newState[propName] = event.target.value;
        console.log(newState);
        this.setState({ ...this.state, ...newState });
        console.log(this.state);
    }
    procHighLightText(text, ht) {
        const index = text.indexOf(ht);
        if (index < 0) {
            return text;
        }
        //const re = new RegExp(ht, 'ig');
        //return text.replace(re, "<span class='highLight'>" + ht + '</span>');

        const length = ht.length;
        if (index == 0) {
            return (
                "<span class='highLight'>" +
                text.substr(0, length) +
                '</span>' +
                text.substr(length)
            );
        }

        return (
            text.substr(0, index - 0) +
            "<span class='highLight'>" +
            text.substr(index, length) +
            '</span>' +
            text.substr(index + length)
        );
    }
    render() {
        let { name, email, address, status } = this.props.data;

        if (status == 0) {
            const firstLetter = name[0].toUpperCase();
            const ht = this.props.highLightText;
            if (ht) {
                name = this.procHighLightText(name, ht);
                address = this.procHighLightText(address, ht);
                email = this.procHighLightText(email, ht);
            }
            return (
                <li className='addressItem'>
                    <div className='firstLetter'>{firstLetter}</div>
                    <div className='infoContainer'>
                        <div dangerouslySetInnerHTML={{ __html: name }}></div>
                        <div dangerouslySetInnerHTML={{ __html: address }}></div>
                        <div dangerouslySetInnerHTML={{ __html: email }}></div>
                        <div>
                            <button onClick={this.handleEdit.bind(this)}>edit</button>
                            <button onClick={this.handleRemove.bind(this)}>remove</button>
                        </div>
                    </div>
                </li>
            );
        } else {
            return (
                <li className='addressItem editMode'>
                    <div className='editContainer'>
                        <div>
                            name:
                            <input
                                type='text'
                                value={this.state.name}
                                onChange={this.handleChange.bind(this, 'name')}
                            />
                        </div>
                        <div>
                            email:
                            <input
                                type='text'
                                value={this.state.email}
                                onChange={this.handleChange.bind(this, 'email')}
                            />
                        </div>
                        <div>
                            address:
                            <input
                                type='text'
                                value={this.state.address}
                                onChange={this.handleChange.bind(this, 'address')}
                            />
                        </div>
                        <div>
                            <button onClick={this.handleSave.bind(this)}>save</button>
                            <button onClick={this.handleCancel.bind(this)}>cancel</button>
                        </div>
                    </div>
                </li>
            );
        }
    }
}

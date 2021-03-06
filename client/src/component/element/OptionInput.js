'use strict';

var _ = require('lodash');
var React = require('react');

var ReactBootstrap = require('react-bootstrap');

var OptionInput = React.createClass({

    getValueFromObject: function(){
        return _.get(this.state.valueObject, this.props.path);
    },

    handleChangeInputValue: function (e) {
        var value = null;
        if(this.state.propertyType){
            if(this.state.propertyType === 'text'){
                value = React.findDOMNode(this.refs.inputElement).value;
            } else if(this.state.propertyType === 'checkbox'){
                value = React.findDOMNode(this.refs.inputElement).checked;
            } else if(this.state.propertyType === 'number'){
                value = parseFloat(React.findDOMNode(this.refs.inputElement).value);
            }
        }
        var valueObject = _.set({}, this.props.path, value);
        this.setState({
            valueObject: valueObject
        });
    },

    handleChangeCheckboxValue: function (e) {
        var value = null;
        if(this.state.propertyType){
            if(this.state.propertyType === 'checkbox'){
                value = React.findDOMNode(this.refs.inputElement).checked;
            }
        }
        var valueObject = _.set({}, this.props.path, value);
        if(this.props.onChangeValue){
            this.props.onChangeValue(valueObject);
        }

    },

    handleChange: function(){
        if(this.props.onChangeValue){
            this.props.onChangeValue(this.state.valueObject);
        }
    },

    handleDelete: function(e){
        if(this.props.onDeleteValue){
            this.props.onDeleteValue({
                path: this.props.path
            })
        }
    },

    handleFocus: function(){
        if(this.props.onSetFocus){
            this.props.onSetFocus({
                elementId: this.props.path
            });
        }
    },

    handleOnKeyDown: function(e){
        if(e.keyCode == 13 || e.keyCode == 27){
            this.handleChange();
        }
    },

    getTypeOfProperty: function(propertyValue){
        if(_.isString(propertyValue)) {
            return 'text';
        } else if(_.isNumber(propertyValue)){
            return 'number';
        } else if(_.isBoolean(propertyValue)){
            return 'checkbox';
        }
    },

    getInitialState: function () {
        var valueType = 'text';
        if(this.props.valueObject && _.isObject(this.props.valueObject)){
            var value = _.get(this.props.valueObject, this.props.path);
            valueType = this.getTypeOfProperty(value);
        }
        var label = this.props.path.replace('.', ' / ');
        return {
            valueObject: this.props.valueObject,
            label: label,
            propertyType: valueType
        }
    },

    getDefaultProps: function () {
        return {
            valueObject: null,
            label: 'Option:'
        };
    },

    componentDidMount: function(){
        if(this.props.focused){
            var input = React.findDOMNode(this.refs.inputElement);
            if(this.state.propertyType !== 'checkbox') {
                var len = input.value ? input.value.length : 0;
                input.focus();
                input.setSelectionRange(len, len);
            } else {
                input.focus();
            }
        }
    },

    render: function () {
        var element = null;
        var style = {
            height: '1.55em', paddingTop: '2px', paddingBottom: '2px'
        };
        if(this.state.propertyType === 'checkbox') {
            style.width = '1em';
            element = (
                <div style={{position: 'relative'}}>
                <input ref="inputElement"
                       type={this.state.propertyType}
                       className="form-control"
                       checked={this.getValueFromObject()}
                       onFocus={this.handleFocus}
                       style={style}
                       onChange={this.handleChangeCheckboxValue}/>
                    <span
                        style={{position: 'absolute', top: '0.5em', left: '-1em', cursor: 'pointer'}}
                        className="fa fa-trash-o"
                        onClick={this.handleDelete}></span>
                </div>
            );

        } else if(this.state.propertyType === 'text' || this.state.propertyType === 'number') {
            element = (
                <div style={{position: 'relative'}}>
                    <input ref="inputElement"
                           type={this.state.propertyType}
                           className="form-control"
                           value={this.getValueFromObject()}
                           style={style}
                           onFocus={this.handleFocus}
                           onChange={this.handleChangeInputValue}
                           onKeyDown={this.handleOnKeyDown}/>
                    <span
                        style={{position: 'absolute', top: '0.5em', left: '-1em', cursor: 'pointer'}}
                        className="fa fa-trash-o"
                        onClick={this.handleDelete}></span>
                </div>
            );
        }

        return (
            <div {...this.props}>
                <p style={{marginBottom: '3px'}}>{this.state.label}</p>
                {element}
            </div>
        );
    }

});

module.exports = OptionInput;
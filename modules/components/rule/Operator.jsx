import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {getFieldConfig, getOperatorConfig} from "../../utils/configUtils";
import keys from "lodash/keys";
import pickBy from "lodash/pickBy";
import mapValues from "lodash/mapValues";
import {useOnPropsChanged} from "../../utils/reactUtils";


export default class Operator extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    groupId: PropTypes.string,
    config: PropTypes.object.isRequired,
    selectedField: PropTypes.string,
    selectedOperator: PropTypes.string,
    readonly: PropTypes.bool,
    //actions
    setOperator: PropTypes.func.isRequired,
    lhsValueType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    useOnPropsChanged(this);

    this.onPropsChanged(props);
  }

  onPropsChanged(nextProps) {
    const prevProps = this.props;
    // update meta also when lhsValueType changes
    const keysForMeta = ["config", "selectedField", "selectedOperator", "lhsValueType"];
    const needUpdateMeta = !this.meta || keysForMeta.map(k => (nextProps[k] !== prevProps[k])).filter(ch => ch).length > 0;

    if (needUpdateMeta) {
      this.meta = this.getMeta(nextProps);
    }
  }

  // returns operators from config according to left-hand side operand type
  getOperatorsForFunction(lhsValueType, config) {
    return config.types[lhsValueType].operators;
  }

  getMeta({config, selectedField, selectedOperator, lhsValueType}) {
    const fieldConfig = getFieldConfig(config, selectedField);
    // when no field is selected (e.g. when function is selected as value source in LHS), get operators according to left-hand side value type
    const operators = fieldConfig?.operators || this.getOperatorsForFunction(lhsValueType, config);
    const operatorOptions 
      = mapValues(
        pickBy(
          config.operators, 
          (item, key) => operators?.indexOf(key) !== -1
        ), 
        (_opts, op) => getOperatorConfig(config, op, selectedField)
      );
      
    const items = this.buildOptions(config, operatorOptions, operators);

    const isOpSelected = !!selectedOperator;
    const currOp = isOpSelected ? operatorOptions[selectedOperator] : null;
    const selectedOpts = currOp || {};
    const placeholder = this.props.config.settings.operatorPlaceholder;
    const selectedKey = selectedOperator;
    const selectedKeys = isOpSelected ? [selectedKey] : null;
    const selectedPath = selectedKeys;
    const selectedLabel = selectedOpts.label;
    
    return {
      placeholder, items,
      selectedKey, selectedKeys, selectedPath, selectedLabel, selectedOpts, fieldConfig
    };
  }

  buildOptions(config, fields, ops) {
    if (!fields || !ops)
      return null;

    return keys(fields).sort((a, b) => (ops.indexOf(a) - ops.indexOf(b))).map(fieldKey => {
      const field = fields[fieldKey];
      const label = field.label;
      return {
        key: fieldKey,
        path: fieldKey,
        label,
      };
    });
  }

  render() {
    const {config, customProps, setOperator, readonly, id, groupId} = this.props;
    const {renderOperator} = config.settings;
    const renderProps = {
      id,
      groupId,
      config, 
      customProps, 
      readonly,
      setField: setOperator,
      ...this.meta
    };
    if (!renderProps.items)
      return null;
    return renderOperator(renderProps);
  }


}

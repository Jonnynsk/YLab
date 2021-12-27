import React, { useCallback } from 'react';
import propTypes from "prop-types";
import { cn } from '@bem-react/classname'
import './styles.css';

function Select(props) {

  // CSS классы по БЭМ
  const className = cn('Select');

  const onSelect = useCallback((e) => {
    props.name
      ? props.onChange(e, props.options.find(item => item.title === e.target.value))
      : props.onChange(e.target.value)
  }, [props.onChange])

  return (
    <select className={className()} onChange={onSelect} name={props.name || 'sort'} value={props.value}>
      {props.options.map(item => (
        <option key={item._id} >{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  name: propTypes.string
}

Select.defaultProps = {
  onChange: () => { },
  name: ''
}

export default React.memo(Select);
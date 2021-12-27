import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'

function SelectBy(props){

  // CSS классы по БЭМ
  const className = cn('Select');

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className={className()} onChange={onSelect} value={props.value}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

SelectBy.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

SelectBy.defaultProps = {
  onChange: () => {
  }
}

export default React.memo(SelectBy);
import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import throttle from "lodash.throttle";

function Textarea(props) {

 
  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = props.delay && useCallback(throttle(value => props.onChange(value), 1000), [props.onChange])

  // Обработчик изменений в поле
  const onChange = useCallback(e => {
    change(e.target.value);
    props.delay ? changeThrottle(e.target.value) : props.onChange(e)
  }, [change, changeThrottle]);

  // CSS классы по БЭМ
  const className = cn('Textarea');

  return (
    <textarea
      className={className({ theme: props.theme })}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
      name={props.name || props.placeholder}
    />
  )
}

Textarea.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  type: propTypes.string,
  placeholder: propTypes.string,
  name: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
  delay: propTypes.bool
}

Textarea.defaultProps = {
  onChange: () => { },
  type: 'text',
  theme: '',
  delay: false
}


export default React.memo(Textarea);
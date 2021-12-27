import React from 'react';
import propTypes from "prop-types";
import { cn } from '@bem-react/classname'
import './styles.css';

function LayoutEdit(props) {

    const className = cn('LayoutEdit');

    return (
        <div className={'desc'}>
            <div className={className('Label')}>{props.label}</div>
            {props.children}
            <div className={className('Error')}>
                {props.error}
            </div>
        </div>
    )
}

LayoutEdit.propTypes = {
    label: propTypes.string,
    error: propTypes.string,
}

LayoutEdit.defaultProps = {
    label: '',
    error: '',
}

export default React.memo(LayoutEdit);
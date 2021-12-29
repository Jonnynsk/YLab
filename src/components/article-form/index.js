import React, { useCallback } from 'react'
import Input from '../input'
import Textarea from '../textarea'
import LayoutEdit from '../layout-edit'
import Select from '../select'
import { useNavigate } from 'react-router-dom';
import './styles.css'

function ArticleForm({ fields, countries, categories, onChange, onSubmit, onDelete, error }) {

    const navigate = useNavigate()

    const onDeleteHandler = () => {
        onDelete()
        navigate('/');
    }

    const onChangeHandler = useCallback((name) => {
        return (value) => onChange(name, value);
    }, [onChange]);

    return (
        <>
            <form className='editing' onSubmit={event => onSubmit(event)}>

                <LayoutEdit label='Название'>
                    <Input
                        type='text'
                        name='title'
                        value={fields.title}
                        onChange={onChangeHandler('title')}
                        placeholder='название' />
                </LayoutEdit>
                <LayoutEdit label='Описание'>
                    <Textarea
                        type='text'
                        name='description'
                        value={fields.description}
                        onChange={onChangeHandler('description')}
                        placeholder='Описание товара' />
                </LayoutEdit>
                <LayoutEdit label='Страна производитель'>
                    <Select
                        options={countries}
                        name='maidIn'
                        value={fields.maidIn}
                        onChange={onChangeHandler('maidIn')} />
                </LayoutEdit>
                <LayoutEdit label='Категория'>
                    <Select
                        options={categories}
                        name='category'
                        value={fields.category}
                        onChange={onChangeHandler('category')} />
                </LayoutEdit>
                <LayoutEdit label='Год выпуска'>
                    <Input
                        type='number'
                        name='edition'
                        value={fields.edition}
                        onChange={onChangeHandler('edition')}
                        placeholder='Год выпуска' />
                </LayoutEdit>
                <LayoutEdit label='Цена (₽)'>
                    <Input
                        type='number'
                        name='price'
                        value={fields.price}
                        onChange={onChangeHandler('price')}
                        placeholder='Цена' />
                </LayoutEdit>

                <input className='editing-submit' type='submit' value='Сохранить' />
                <div className='error'>{error}</div>

            </form>

            <div className='delete-button'>
                <button className='delete' onClick={onDeleteHandler}>Удалить</button>
            </div>

        </>
    )
}

export default React.memo(ArticleForm)

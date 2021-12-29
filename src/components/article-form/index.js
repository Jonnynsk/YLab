import React, { useCallback } from 'react'
import Input from '../input'
import Textarea from '../textarea'
import LayoutEdit from '../layout-edit'
import Select from '../select'
import { useNavigate } from 'react-router-dom';
import './styles.css'

function ArticleForm({ article, error, maidIn, category, onChange, onSubmit, onDelete }) {

    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        onSubmit()
        e.preventDefault()
    }

    const onDeleteHandler = () => {
        onDelete()
        navigate('/');
    }

    const onChangeHandler = useCallback((name) => {
        return (value) => onChange(name, value);
      }, [onChange]);

    return (
        <>
            <form className='editing' onSubmit={onSubmitHandler}>

                <LayoutEdit label='Название'>
                    <Input type='text' 
                           name='title' 
                           value={article.title} 
                           onChange={onChangeHandler('title')} 
                           placeholder='название' />
                </LayoutEdit>
                <LayoutEdit label='Описание'>
                    <Textarea type='text' 
                              name='description' 
                              value={article.description} 
                              onChange={onChangeHandler('description')} 
                              placeholder='Описание товара' />
                </LayoutEdit>
                <LayoutEdit label='Страна производитель'>
                    <Select options={maidIn} 
                            name='maidIn' 
                            value={article?.maidIn?.title} 
                            onChange={onChangeHandler('maidIn')}  />
                </LayoutEdit>
                <LayoutEdit label='Категория'>
                    <Select options={category} 
                            name='category' 
                            value={category.find(item => item.title.replace(/-\s/gm, '') === article?.category?.title)?.title} 
                            onChange={onChangeHandler('category')}  />
                </LayoutEdit>
                <LayoutEdit label='Год выпуска'>
                    <Input type='number' 
                           name='edition' 
                           value={article.edition} 
                           onChange={onChangeHandler('edition')} 
                           placeholder='Год выпуска' />
                </LayoutEdit>
                <LayoutEdit label='Цена (₽)'>
                    <Input type='number' 
                           name='price' 
                           value={article.price} 
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

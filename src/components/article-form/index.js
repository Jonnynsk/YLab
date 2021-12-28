import React from 'react'
import Input from '../input'
import Textarea from '../textarea'
import LayoutEdit from '../layout-edit'
import Select from '../select'
import { useNavigate } from 'react-router-dom';
import './styles.css'


function ArticleForm({ article, error, maidIn, category, onChangeInput, onChangeSelect, onSubmit, onDelete }) {

    const navigate = useNavigate()

    function onSubmitHandler(e) {
        onSubmit()
        e.preventDefault()
    }

    function onDeleteItem() {
        onDelete()
        navigate('/');
    }

    return (
        <>
            <form className='editing' onSubmit={onSubmitHandler}>

                <LayoutEdit label='Название'>
                    <Input type='text' 
                           name='title' 
                           value={article.title} 
                           onChange={onChangeInput} 
                           placeholder='название' />
                </LayoutEdit>
                <LayoutEdit label='Описание'>
                    <Textarea type='text' 
                              name='description' 
                              value={article.description} 
                              onChange={onChangeInput} 
                              placeholder='Описание товара' />
                </LayoutEdit>
                <LayoutEdit label='Страна производитель'>
                    <Select options={maidIn} 
                            name='maidIn' 
                            value={article?.maidIn?.title} 
                            onChange={onChangeSelect} />
                </LayoutEdit>
                <LayoutEdit label='Категория'>
                    <Select options={category} 
                            name='category' 
                            value={category.find(item => item.title.replace(/-\s/gm, '') === article?.category?.title)?.title} 
                            onChange={onChangeSelect} />
                </LayoutEdit>
                <LayoutEdit label='Год выпуска'>
                    <Input type='number' 
                           name='edition' 
                           value={article.edition} 
                           onChange={onChangeInput} 
                           placeholder='Год выпуска' />
                </LayoutEdit>
                <LayoutEdit label='Цена (₽)'>
                    <Input type='number' 
                           name='price' 
                           value={article.price} 
                           onChange={onChangeInput} 
                           placeholder='Цена' />
                </LayoutEdit>

                <input className='editing-submit' type='submit' value='Сохранить' />
                <div className='error'>{error}</div>

            </form>

            <div className='delete-button'>
                <button className='delete' onClick={onDeleteItem}>Удалить</button>
            </div>

        </>
    )
}

export default React.memo(ArticleForm)

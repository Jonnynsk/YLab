import React, { useCallback } from 'react'
import useSelector from '../../utils/use-selector'
import useStore from '../../utils/use-store'
import Input from '../input'
import Textarea from '../textarea'
import LayoutEdit from '../layout-edit'
import Select from '../select'
import { useNavigate } from 'react-router-dom';
import './styles.css'


function ArticleForm() {

    const store = useStore()
    const navigate = useNavigate()

    const select = useSelector(state => ({
        article: state.article.formData,
        maidIn: state.countries.data,
        category: state.categories.data
    }))

    const callbacks = {
        onChangeInput: useCallback((e) => store.article.update(e), [store]),
        onChangeSelect: useCallback((e, item) => store.article.update(e, item), [store]),
        onSubmit: useCallback(() => store.article.send(), [store]),
        onDelete: useCallback(() => store.article.delete(), [store])
    }

    function onSubmitHandler(e) {
        callbacks.onSubmit()
        e.preventDefault()
    }

    function onDeleteItem() {
        callbacks.onDelete()
        navigate('/');
    }

    return (
        <>
            <form className='editing' onSubmit={onSubmitHandler}>

                <LayoutEdit label='Название'>
                    <Input value={select.article.title} placeholder='название' onChange={callbacks.onChangeInput} name='title' />
                </LayoutEdit>
                <LayoutEdit label='Описание'>
                    <Textarea type='text' name='description' value={select.article.description} onChange={callbacks.onChangeInput} placeholder='Описание товара' />
                </LayoutEdit>
                <LayoutEdit label='Страна производитель'>
                    <Select options={select.maidIn} value={select.article?.maidIn?.title} name='maidIn' onChange={callbacks.onChangeSelect} />
                </LayoutEdit>
                <LayoutEdit label='Категория'>
                    <Select options={select.category} value={select.category.find(item => item.title.replace(/-\s/gm, '') === select.article?.category?.title)?.title} name='category' onChange={callbacks.onChangeSelect} />
                </LayoutEdit>
                <LayoutEdit label='Год выпуска'>
                    <Input type='number' name='edition' value={select.article.edition} onChange={callbacks.onChangeInput} placeholder='Год выпуска' />
                </LayoutEdit>
                <LayoutEdit label='Цена (₽)'>
                    <Input type='number' name='price' value={select.article.price} onChange={callbacks.onChangeInput} placeholder='Цена' />
                </LayoutEdit>

                <input className='editing-submit' type='submit' value='Сохранить' />
            </form>
            
            <div className='delete-button'>
                <button className='delete' onClick={onDeleteItem}>Удалить</button>
            </div>

        </>
    )
}

export default React.memo(ArticleForm)

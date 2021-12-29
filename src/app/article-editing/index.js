import React, { useCallback } from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import ArticleForm from '../../components/article-form';

function ArticleEditing() {

  const store = useStore();
  const params = useParams();

  useInit(async () => {
    store.get('article').load(params.id),
    store.categories.loadCategories()
    store.countries.loadCountries()
  }, [params.id]);

  const select = useSelector(state => ({
    articleTitle: state.article.data,
    waiting: state.article.waiting || state.countries.waiting || state.categories.waiting,
    article: state.article.formData,
    error: state.article.error,
    maidIn: state.countries.data,
    category: state.categories.data
  }));

const callbacks = {
    onChangeInput: useCallback((name, value) => store.article.update(name, value), [store]),
    onChangeSelect: useCallback((e, item) => store.article.updateSelect(e, item), [store]),
    onSubmit: useCallback(() => store.article.send(), [store]),
    onDelete: useCallback(() => store.article.delete(), [store])
}

  return (
    <Layout head={<h1>{select.articleTitle.title}</h1>}>
      <Header />
      <Spinner active={select.waiting}>
        <ArticleForm article={select.article} 
                     error={select.error}  
                     maidIn={select.maidIn}  
                     category={select.category}
                     onChange={callbacks.onChangeInput}
                     onChangeSelect={callbacks.onChangeSelect}
                     onSubmit={callbacks.onSubmit}
                     onDelete={callbacks.onDelete}
         />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEditing);
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
    article: state.article.data,
    fields: state.article.fields,
    countries: state.countries.items,
    categories: state.categories.items,
    waiting: state.article.waiting,
    error: state.article.error
  }));

  const callbacks = {
    onChange: useCallback((name, value) => store.article.update(name, value), [store]),
    onSubmit: useCallback(event => store.article.send(event), [store]),
    onDelete: useCallback(() => store.article.delete(), [store])
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />
      <Spinner active={select.waiting}>
        <ArticleForm
          fields={select.fields}
          countries={select.countries}
          categories={select.categories}
          onChange={callbacks.onChange}
          onSubmit={callbacks.onSubmit}
          onDelete={callbacks.onDelete}
          error={select.error}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEditing);
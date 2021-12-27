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
    waiting: state.article.waiting || state.countries.waiting || state.categories.waiting,
  }));

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />
      <Spinner active={select.waiting}>
        <ArticleForm />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEditing);
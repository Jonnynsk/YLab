import React, { useCallback, useEffect, useMemo } from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";
import Select from "../../components/select";

function CatalogFilter() {

  const store = useStore();

  useEffect(() => {
    store.categories.loadCategories()
  }, [])

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.items,
  }));

  // Опции для полей
  const options = {
    category: useMemo(() => [{value:'', title: 'Все'}].concat(select.categories), [select.categories]),
    sort: useMemo(() => ([
      {value:'key', title: 'По коду'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  const callbacks = {
    onSort: useCallback(sort => store.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
    onChangeCategory: useCallback(category => store.catalog.setParams({ category, page: 1 }), [store]),
  }

  return (
    <LayoutTools>
      <Select onChange={callbacks.onChangeCategory} value={select.category} options={options.category} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" delay />
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);

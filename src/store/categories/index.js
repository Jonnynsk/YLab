import StoreModule from "../module";

class CategoriesStore extends StoreModule {

  initState() {
    return {
      items: [],
    };
  }

  async loadCategories() {
    const response = await fetch(`api/v1/categories?limit=*&fields=_id,parent,title`);
    const json = await response.json();

    const categoriesTree = getCategoriesTree(json.result.items);
    const categoriesOptions = getCategoriesOptions(categoriesTree);

    function getCategoriesTree(categories, parentId = null) {
      let result = [];

      for (let category of categories) {
        let categoryParentId = category.parent ? category.parent._id : null;

        if (categoryParentId == parentId) {
          result.push(category);
          category.children = getCategoriesTree(categories, category._id);
        }
      }

      return result;
    }

    function getCategoriesOptions(categories, prefixAmount = 0) {
      let result = [];

      for (let category of categories) {
        result.push({ value: category._id, title: '- '.repeat(prefixAmount) + category.title });
        if (category.children.length > 0) {
          let children = getCategoriesOptions(category.children, prefixAmount + 1);
          for (let child of children) {
            result.push(child);
          }
        }
      }

      return result;
    }

    this.setState({
      items: categoriesOptions
    });
  }
}

export default CategoriesStore;

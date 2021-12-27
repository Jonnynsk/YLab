import StoreModule from "../module";

class CategoriesStore extends StoreModule {

    initState() {
        return {
          waiting: false,
          data: [],
        };
      }
    
      async loadCategories() {
        this.updateState({
          data: [],
          waiting: true
        });
    
        try {
          const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
          const { result } = await response.json();
          const sortItems = []
    
          sortCategories(sortItems, result.items)
    
          function sortCategories(arr, items, parentId = null, prefixCount = 0) {
            for (let item of items) {
              if (item.parent === parentId || item.parent?._id === parentId) {
                const data = { ...item }
    
                if (prefixCount) {
                  data.title = '- '.repeat(prefixCount) + data.title
                }
    
                arr.push(data)
                sortCategories(arr, items, data._id, prefixCount + 1)
              }
            }
          }
    
          this.updateState({
            data: sortItems,
            waiting: false
          });
        } catch (e) {
          this.updateState({
            data: [],
            waiting: false
          });
        }
    
      }
    }

export default CategoriesStore;

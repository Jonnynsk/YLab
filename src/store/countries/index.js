import StoreModule from "../module";

class CountriesStore extends StoreModule {

    initState() {
        return {
          data: [],
          waiting: false
        };
      }
    
      async loadCountries() {
        this.updateState({
          data: [],
          waiting: true
        });
    
        try {
          const response = await fetch(`/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`)
          const { result } = await response.json()
    
          this.updateState({
            data: result.items,
            waiting: false
          });
        }
        catch (e) {
          this.updateState({
            data: [],
            waiting: false
          });
        }
    
      }
    }
export default CountriesStore;
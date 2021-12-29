import StoreModule from "../module";

class CountriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
    };
  }

  async loadCountries() {
    const response = await fetch(`api/v1/countries?sort=title&limit=*&skip=0&fields=*`);
    const json = await response.json();

    const result = json.result.items;
    const options = result.map((item) => {
      return { value: item._id, title: item.title }
    })

    this.setState({
      items: options
    });
  }
}

export default CountriesStore;
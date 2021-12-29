import StoreModule from "../module";

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
   initState() {
    return {
      data: {},
      formData: {},
      waiting: true,
      error: ''
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {

    this.updateState({
      data: {},
      formData: {},
      waiting: true,
      error: ''
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        formData: json.result,
        waiting: false
      });

    } catch (e) {
      this.updateState({
        data: {},
        formData: {},
        waiting: false
      });
    }
  }

  async send() {
    this.updateState({
      waiting: true,
      data: this.getState().formData
    })
    try {
      const response = await fetch(`/api/v1/articles/${this.getState().data._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.getState().data),
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await response.json()
      if (json.error) {
        this.updateState({
          error: json.error.message + ': ' + json.error.data.issues[0].path + ' ' + json.error.data.issues[0].message,
        });
        throw new Error(json.error);
      }

      this.updateState({
        waiting: false,
        error: ''
      })
    } catch (e) {
      this.updateState({
        waiting: false,
      });
    } 
  }

  update(e, item = null) {
    if (item) {
      this.updateState({
        formData: { ...this.getState().formData, [e.target.name]: { ...item, title: item.title.replace(/-\s/gm, '') } }
      })
    } else {
      this.updateState({
        formData: { ...this.getState().formData, [e.target.name]: e.target.value }
      })
    }
  }

  async delete() {
    this.updateState({
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${this.getState().data._id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      const json = await response.json();
      
      if (json.error) {
        this.updateState({
          error: json.error.message + ': ' + json.error.data.issues[0].path + ' ' + json.error.data.issues[0].message,
        });
        throw new Error(json.error);
      }

      this.updateState({
        deleted: true
      });
    } catch (e) {
    } finally {
      this.updateState({
        waiting: false
      });
    }
  }

}

export default ArticleStore;

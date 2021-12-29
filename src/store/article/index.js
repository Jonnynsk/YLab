import StoreModule from "../module";

class ArticleStore extends StoreModule {

  /**
  * Начальное состояние
  */
  initState() {
    return {
      data: {},
      fields: {
        title: '',
        description: '',
        maidIn: '',
        category: '',
        edition: 0,
        price: 0
      },
      waiting: true,
      error: ''
    };
  }

  async load(id) {
    this.updateState({
      waiting: true,
      data: {}
    });
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        fields: {
          title: json.result.title,
          description: json.result.description,
          maidIn: json.result.maidIn._id,
          category: json.result.category._id,
          edition: json.result.edition,
          price: json.result.price
        },
        waiting: false
      });

    } catch (e) {
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

  update(name, value, item = null) {
    if (item) {
      this.updateState({
        fields: { ...this.getState().fields, [name]: { ...item } }
      })
    } else {
      this.updateState({
        fields: { ...this.getState().fields, [name]: value }
      })
    }
  }

  async send(event) {
    event.preventDefault();

    const fields = this.getState().fields;
    const newData = {
      ...this.getState().data,
      title: fields.title,
      description: fields.description,
      price: fields.price,
      maidIn: {
        _id: fields.maidIn
      },
      edition: fields.edition,
      category: {
        _id: fields.category
      }
    }

    this.edit(newData);
  }

  async edit(data) {
    this.updateState({
      error: ' ',
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${data._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await response.json();
      if (json.error) {
        this.updateState({
          error: json.error.message + ': ' + json.error.data.issues[0].path + ' ' + json.error.data.issues[0].message,
        });
        throw new Error(json.error);
      }
      this.updateState({
        data: data
      });
    } catch (e) {
    } finally {
      this.updateState({
        waiting: false
      });
    }
  }

  async delete() {
    this.updateState({
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${this.getState().data._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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

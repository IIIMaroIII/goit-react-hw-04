import Axios from 'axios';

class SearchAPI {
  static #ACCESS_KEY = 'Lt06gGOjSpjGzshph9kQrPfWiYwVdYvZ95u1xCEXric';

  constructor() {
    this.BASE_URL = 'https://api.unsplash.com/search/photos';
    this.page = 1;
    this.per_page = 12;
    this.total = null;
    this.total_pages = null;
  }

  async getImages(value, page) {
    const axios = Axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: `Client-ID ${SearchAPI.#ACCESS_KEY}`,
      },
      params: {
        query: value,
        per_page: this.per_page,
        page: page,
      },
    });
    const response = await axios.get();
    return response.data;
  }
}

export default SearchAPI;

import Axios from 'axios';

class SearchAPI {
  static #ACCESS_KEY = 'Lt06gGOjSpjGzshph9kQrPfWiYwVdYvZ95u1xCEXric';
  static BASE_URL = 'https://api.unsplash.com/';
  constructor() {}

  async getImages(value, orderBy = 'relevant') {
    const END_POINT = 'search/photos';
    try {
      const axios = Axios.create({
        baseURL: SearchAPI.BASE_URL,
        headers: {
          Authorization: `Client-ID ${SearchAPI.#ACCESS_KEY}`,
        },
        params: {
          query: value,
          per_page: 15,
          order_by: orderBy,
        },
      });
      const response = await axios.get(END_POINT);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default SearchAPI;

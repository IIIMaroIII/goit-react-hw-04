import Axios from 'axios';

async function API(value, page, onError) {
  const accessKey = 'Lt06gGOjSpjGzshph9kQrPfWiYwVdYvZ95u1xCEXric';
  try {
    const axios = Axios.create({
      baseURL: 'https://api.unsplash.com',
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },

      params: {
        query: value,
        page: page,
        per_page: 30,
      },
    });
    const response = await axios.get('/search/photos');
    return response.data;
  } catch (error) {
    onError({ message: error.message });
  }
}

export default API;

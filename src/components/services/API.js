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
        per_page: 50,
      },
    });
    const response = await axios.get('/search/photos');
    return response.data;
  } catch (error) {
    onError({ message: error.message });
  }
}

export default API;

// useEffect(() => {
//   if (isTheFirstRender.current) {
//     isTheFirstRender.current = true;
//     return;
//   }
//   setResults([]);
//   setError(null);
//   if (query.trim() === '') {
//     setError({ message: 'Type in your request' });
//     return;
//   }

//   async function fetch() {
//     try {
//       setIsLoading(true);
//       const { total, total_pages, results } = await API.getImages(query, 1);
//       if (results.length === 0) {
//         setResults([]);
//         setError({ message: 'I`m sorry we have not found any images' });
//       }
//       setResults(results);
//       setLoadMore(true);
//       setError(null);
//       setIsLoading(false);
//       setPage(1);
//     } catch (error) {
//       setError({ message: error.message });
//     }
//   }
//   fetch();
// }, [query]);

// useEffect(() => {
//   if (page <= 1) {
//     return;
//   }
//   setError(null);
//   setIsLoading(true);
//   setLoadMore(false);
//   async function fetchData() {
//     try {
//       const { results } = await API.getImages(query, page);
//       setResults(prev => [...prev, ...results]);
//       setIsLoading(false);
//       setLoadMore(true);
//     } catch (error) {
//       setError({ message: error.message });
//     }
//   }
//   fetchData();
// }, [page]);

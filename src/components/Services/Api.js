export const api = (searchImg, page, loadData, changeStatus) => {
  const URL = `https://pixabay.com/api/`;
  const API_KEY = `34859456-27066b05c1480cb7e2dfb47d0`;
  changeStatus(`pending`);
  fetch(
    `${URL}?q=${searchImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return console.log(` Error ${res.status}`);
    })
    .then(responce => {
      loadData(responce.hits);
      changeStatus(`resolved`);
    })
    .catch(error => console.log(`Error ${error.status}`));
};

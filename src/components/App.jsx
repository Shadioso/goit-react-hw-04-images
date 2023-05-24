import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { api } from './Services/Api';
export const App = () => {
  const [searchImg, setSearchImg] = useState(``);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(`idle`);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(``);

  useEffect(() => {
    if (searchImg === ``) {
      return;
    }
    api(searchImg, page, loadData, changeStatus);
  }, [searchImg, page]);

  const onSubmit = searchImg => {
    setSearchImg(searchImg);
    setData([]);
    setPage(1);
  };

  const loadMore = page => {
    setPage(prevState => prevState + 1);
  };

  const loadData = data => {
    setData(prevState => [...prevState, ...data]);
  };

  const changeStatus = status => {
    setStatus(status);
  };

  const showModalOnClick = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL(``);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery data={data} showModal={showModalOnClick} />
      {status === `pending` && <Loader />}
      {data.length > 1 && <Button onClick={loadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </>
  );
};

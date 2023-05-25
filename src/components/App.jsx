import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { api } from 'services/Api';

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
    const fetchGallary = async (searchImg, page) => {
      try {
        changeStatus(`pending`);
        const responce = await api(searchImg, page);
        setData(prevState => [...prevState, ...responce]);
      } catch (error) {
        console.log(`Error ${error.status}`);
      } finally {
        changeStatus(`resolved`);
      }
    };
    fetchGallary(searchImg, page);
  }, [searchImg, page]);

  const onSubmit = searchImg => {
    setSearchImg(searchImg);
    setData([]);
    setPage(1);
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
      {data.length > 11 && (
        <Button
          onClick={() => {
            setPage(prevState => prevState + 1);
          }}
        />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </>
  );
};

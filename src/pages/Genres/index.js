import React, { useState, useEffect } from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

import api from '../../services/api';
import GenreForm from '../../components/GenreForm';
import { BoxLoading, AlertMessage } from '../../components/Utils';

const Genres = props => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(null);

  useEffect(() => {
    getGenders();
  }, []);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let timer = null;
    if (success) {
      timer = setInterval(() => {
        setSuccess(!success);
      }, 10000);
    }

    if (error) {
      timer = setInterval(() => {
        setError(!error);
      }, 10000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [success, error]);

  const getGenders = () => {
    api.get('genres').then(res => {
      setLoad(true);
      setGenres(res.data.data);
      setLoad(false);
    });
  };

  const deleteGenre = id => {
    if (window.confirm('Deseja mesmo excluir esse registro?')) {
      api.delete('genres/' + id).then(res => {
        if (res.data.success) {
          getGenders();
          setMessage('Gênero excluído com sucesso!');
          setSuccess(true);
        }
      });
    }
  };

  const editGenre = id => {
    setGenreId(id);
  };

  const renderRow = genre => {
    return (
      <tr key={genre.id}>
        <th scope="row">{genre.id}</th>
        <td>{genre.name}</td>
        <td className="w-25">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => editGenre(genre.id)}
              title="Editar"
            >
              <FaRegEdit />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteGenre(genre.id)}
              title="Excluir"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="container">
      <h1 className="display-5 mt-3 mb-3">Gêneros</h1>
      <GenreForm
        genreId={genreId}
        getGenders={getGenders}
        setSuccess={setSuccess}
        setError={setError}
        setMessage={setMessage}
      />
      {success && <AlertMessage color="success" message={message} />}
      {error && <AlertMessage color="danger" message={message} />}
      {load && <BoxLoading message="Carregando..." />}
      {genres.length === 0 ? (
        <AlertMessage color="warning" message={'Nenhum registro encontrado'} />
      ) : (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>{genres.map(renderRow)}</tbody>
        </table>
      )}
    </div>
  );
};

export default Genres;

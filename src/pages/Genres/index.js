import React, { useState, useEffect, Fragment } from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

import api from '../../services/api';
import GenreForm from '../../components/GenreForm';
import { BoxLoading, AlertMessage } from '../../components/Utils';

const Genres = props => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenders();
  }, []);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (success) {
      setInterval(() => {
        setSuccess(!success);
      }, 10000);
    }

    if (error) {
      setInterval(() => {
        setError(!error);
      }, 10000);
    }
  }, [success, error]);

  const getGenders = () => {
    api.get('genres').then(res => {
      setGenres(res.data.data);
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

  const renderRow = genre => {
    return (
      <tr key={genre.id}>
        <th scope="row">{genre.id}</th>
        <td>{genre.name}</td>
        <td className="w-25">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" title="Editar">
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
      <h1 className="display-5 mt-5 mb-3">Gêneros</h1>
      {success && <AlertMessage color="success" message={message} />}
      {error && <AlertMessage color="danger" message={message} />}
      <GenreForm />
      {genres.length === 0 ? (
        <BoxLoading message="Carregando..." />
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

import React, { useState, useEffect } from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

import api from '../../services/api';
import SerieForm from '../../components/SerieForm';
import { BoxLoading, AlertMessage } from '../../components/Utils';

const Series = props => {
  const [series, setSeries] = useState([]);
  const [serieId, setSerieId] = useState(null);

  useEffect(() => {
    getSeries();
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

  const getSeries = () => {
    api.get('series').then(res => {
      setSeries(res.data.data);
    });
  };

  const deleteSerie = id => {
    if (window.confirm('Deseja mesmo excluir esse registro?')) {
      api.delete('series/' + id).then(res => {
        if (res.data.success) {
          getSeries();
          setMessage('Gênero excluído com sucesso!');
          setSuccess(true);
        }
      });
    }
  };

  const editSerie = id => {
    setSerieId(id);
  };

  const renderRow = serie => {
    return (
      <tr key={serie.id}>
        <th scope="row">{serie.id}</th>
        <td>{serie.name}</td>
        <td className="w-25">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => editSerie(serie.id)}
              title="Editar"
            >
              <FaRegEdit />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteSerie(serie.id)}
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
      <h1 className="display-5 mt-3 mb-3">Series</h1>
      <SerieForm
        serieId={serieId}
        getSeries={getSeries}
        setSuccess={setSuccess}
        setError={setError}
        setMessage={setMessage}
      />
      {success && <AlertMessage color="success" message={message} />}
      {error && <AlertMessage color="danger" message={message} />}
      {series.length === 0 ? (
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
          <tbody>{series.map(renderRow)}</tbody>
        </table>
      )}
    </div>
  );
};

export default Series;

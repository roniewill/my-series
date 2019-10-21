import React, { useState, useEffect, Fragment } from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { FiPlus, FiMinus, FiSave } from 'react-icons/fi';
import api from '../../services/api';

const GenreForm = props => {
  const { genreId, getGenders, setSuccess, setError, setMessage } = props;
  const [collapse, setCollapse] = useState(false);
  const [genre, setGenre] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Salvar');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (genreId) {
      setId(genreId);
      editGenre(id);
      if (!collapse) setCollapse(!collapse);
    }
  }, [genreId]);

  const toggle = () => {
    setCollapse(!collapse);
    if (id) {
      setId(null);
      setButtonLabel('Salvar');
      setGenre('');
    }
  };

  // Save or Update Genre
  const handleSaveOrUpdate = e => {
    e.preventDefault();
    if (!id && genre) {
      api
        .post('genres', { name: genre })
        .then(res => {
          setSuccess(true);
          setMessage('Cadastrado com sucesso!');
          setGenre('');
          getGenders();
        })
        .catch(error => {
          setError(true);
          setMessage(error);
        });
    }

    if (id && genre) {
      api
        .put('genres/' + id, { name: genre })
        .then(res => {
          setSuccess(true);
          setMessage('Atualizado com sucesso!');
          setGenre('');
          getGenders();
        })
        .catch(error => {
          setError(true);
          setMessage(error);
        });
    }
  };

  const editGenre = () => {
    api.get('/genres/' + genreId).then(res => {
      setGenre(res.data.name);
      setButtonLabel('Atualizar');
    });
  };

  const handleChange = e => {
    setGenre(e.target.value);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <Button
            color="info"
            onClick={toggle}
            style={{ marginBottom: '1rem' }}
            className="float-right"
            title="Adiciona ou Atualiza um Gênero"
          >
            {collapse === false ? <FiPlus /> : <FiMinus />}
          </Button>
        </div>
        <div className="col-12">
          <Collapse isOpen={collapse}>
            <Card className="m-3">
              <CardBody>
                <form className="form-inline">
                  <input
                    type="text"
                    name="genre"
                    className="form-control mr-sm-2 col-md-9"
                    placeholder="Nome do gênero"
                    value={genre}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-success my-2 my-sm-0"
                    type="submit"
                    onClick={handleSaveOrUpdate}
                    disabled={genre === '' || genre.length < 4}
                  >
                    {buttonLabel} <FiSave />
                  </button>
                </form>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    </Fragment>
  );
};

export default GenreForm;

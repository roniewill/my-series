import React, { useState, useEffect, Fragment } from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { FiPlus, FiMinus, FiSave } from 'react-icons/fi';
import api from '../../services/api';

const SerieForm = props => {
  const { serieId, getSeries, setSuccess, setError, setMessage } = props;
  const [collapse, setCollapse] = useState(false);
  const [serie, setSerie] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Salvar');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (serieId) {
      setId(serieId);
      editSerie(id);
      if (!collapse) setCollapse(!collapse);
    }
  }, [serieId]);

  const toggle = () => {
    setCollapse(!collapse);
    if (id) {
      setId(null);
      setButtonLabel('Salvar');
      setSerie('');
    }
  };

  // Save or Update Genre
  const handleSaveOrUpdate = e => {
    e.preventDefault();
    if (!id && serie) {
      api
        .post('series', { name: serie })
        .then(res => {
          setSuccess(true);
          setMessage('Serie cadastrada com sucesso!');
          setSerie('');
          getSeries();
        })
        .catch(error => {
          setError(true);
          setMessage(error);
        });
    }

    if (id && serie) {
      api
        .put('series/' + id, { name: serie })
        .then(res => {
          setSuccess(true);
          setMessage(`Serie #${id} atualizada com sucesso!`);
          setSerie('');
          getSeries();
        })
        .catch(error => {
          setError(true);
          setMessage(error);
        });
    }
  };

  const editSerie = () => {
    api.get('/series/' + serieId).then(res => {
      setSerie(res.data.name);
      setButtonLabel('Atualizar');
    });
  };

  const handleChange = e => {
    setSerie(e.target.value);
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
            title="Adiciona ou Atualiza uma Serie"
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
                    name="serie"
                    className="form-control mr-sm-2 col-md-9"
                    placeholder="Nome da Serie"
                    value={serie}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-success my-2 my-sm-0"
                    type="submit"
                    onClick={handleSaveOrUpdate}
                    disabled={serie === '' || serie.length < 4}
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

export default SerieForm;

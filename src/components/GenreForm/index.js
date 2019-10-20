import React, { useState, Fragment } from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { FiPlusSquare, FiMinusSquare, FiSave } from 'react-icons/fi';
import api from '../../services/api';

const GenreForm = props => {
  const [collapse, setCollapse] = useState(false);
  const [genre, setGenre] = useState('');

  const toggle = () => setCollapse(!collapse);

  const save = e => {
    e.preventDefault();
    if (genre !== null && genre !== '') {
      api
        .post('genres', { name: genre })
        .then(res => {
          console.log('result data: ', res);
        })
        .catch(error => console.log('returned error: ', error));
    }
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
            title="Novo Gênero"
          >
            {collapse === false ? <FiPlusSquare /> : <FiMinusSquare />}
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
                    className="form-control mr-sm-2 col-md-10"
                    placeholder="Nome do gênero"
                    value={genre}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-success my-2 my-sm-0"
                    type="submit"
                    onClick={save}
                    disabled={genre === '' || genre.length < 4}
                  >
                    <FiSave /> {` Salvar`}
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

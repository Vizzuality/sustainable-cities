import React from 'react';
import PropTypes from 'prop-types';

// components
import Button from 'components/common/Button';
import Radio from 'components/common/form/Radio';
import DownloadFilters from 'components/common/modal/filtersDownload';

export default class DownloadDataModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radio: 'projects',
      dropdowns: {
        bmes: [],
        solutions: [],
        cities: []
      }
    };
  }

  onSelectRadio(value) {
    this.setState({
      radio: value
    });

    if (value === 'projects') {
      this.setState({
        dropdowns: {
          ...this.state.dropdowns,
          bmes: []
        }
      });
    }
  }

  onChangeDropwdown(name, values) {
    this.setState({
      dropdowns:
      { ...this.state.dropdowns,
        [name]: values
      }
    });
  }

  _getResume() {
    const { radio, dropdowns } = this.state;
    const { bmes, cities, solutions } = dropdowns;
    let resume = '';
    const checkedCities = (cities || []).map(city => city.label);
    const checkedBmes = (bmes || []).map(bme => bme.label);
    const checkedSolution = (solutions || []).map(solution => solution.label);
    const citiesString = checkedCities.length ? `in ${checkedCities.toString()}` : '';
    const bmesString = checkedBmes.length ? `, containing the next business model elements: ${checkedBmes.toString()}` : '';
    const solutionString = checkedSolution.length ? ` and the next solutions: ${checkedSolution.toString()}` : '';

    switch (radio) {
      case 'projects':
        resume = `Downloading CSV file with project details, such as situation,
          what was done, key actors, impacts, etc., of all projects ${citiesString}${bmesString}${solutionString}`;
        break;
      case 'bmes':
        resume = `Downloading CSV file with element details such as their descriptions, success factors,
        barriers know, etc. of all business model elements ${citiesString}${bmesString}${solutionString}`;
        break;
      default:
        resume = '';
    }

    return resume;
  }

  _getDownloadLink() {
    const { radio, dropdowns } = this.state;
    const { bmes, cities, solutions } = dropdowns;
    const checkedCities = (cities || []).map(city => city.id);
    const checkedBmes = radio === 'projects' ?
      (bmes || []).map(bme => bme.id) : (bmes[0] || {}).id;
    const checkedSolution = (solutions || []).map(solution => solution.id);
    const citiesString = checkedCities.length ? `city_ids=${checkedCities.toString()}` : '';
    const solutionString = checkedSolution.length ? `solution_ids=${checkedSolution.toString()}` : '';
    const bmesString = checkedBmes.length ? `bme_ids=${checkedBmes.toString()}` : '';

    const params = [bmesString, citiesString, solutionString].filter(s => s.length).join('&');

    return `${process.env.API_URL}/csvs/${radio}?${params}`;
  }

  render() {
    const { bmes, cities, onClose, solutions } = this.props;
    const { radio, dropdowns } = this.state;
    const { bmes: selectedBmes } = dropdowns;

    const firstLevelSelected = (radio === 'bmes') && selectedBmes ? (selectedBmes[0] || {}).id : undefined;

    return (
      <div className="c-download-data-modal">
        <div className="row">
          <div className="column small-12">
            <h2 className="c-title -fw-thin -fs-huge -dark">Download</h2>
            <p className="c-text -fs-small -fw-light -dark">Select the part of the dataset you are interested in, then click download to get the file.</p>
            <div className="row">
              <div className="column small-12">
                <Radio
                  labelString={'Projects'}
                  value={'projects'}
                  name={'projects'}
                  isChecked={radio === 'projects'}
                  onCheck={e => this.onSelectRadio(e.target.value)}
                />
              </div>
            </div>

            <div className="bme-categories">
              <div className="row">
                {bmes.map(bme =>
                  <div className="column small-12 medium-6" key={bme.id}>
                    <Radio
                      labelString={bme.label}
                      value={bme.id}
                      name={'bmes'}
                      isChecked={firstLevelSelected === bme.id}
                      onCheck={(e) => {
                        this.onSelectRadio('bmes');
                        this.onChangeDropwdown('bmes', [{ id: e.target.value }]);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <p className="c-text -fs-small -fw-light -dark download-fields-description">Download CSV file with descriptions of Funding,
              Financing, Legal Arrangements, and Technical components, including: descriptions,
              enabling conditions affecting them.</p>

            <DownloadFilters
              bmes={bmes}
              solutions={solutions}
              cities={cities}
              type={radio}
              onChangeDropwdown={(name, values) => this.onChangeDropwdown(name, values)}
            />

            <div className="buttons">
              <Button secondary onClick={onClose}>Cancel</Button>
              <a className="c-button -primary" href={this._getDownloadLink()} download="a">Download</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DownloadDataModal.propTypes = {
  cities: PropTypes.array,
  bmes: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  solutions: PropTypes.array
};

DownloadDataModal.defaultProps = {
  cities: [],
  bmes: [],
  solutions: []
};

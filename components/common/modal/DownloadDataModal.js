import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import DownloadFilters from 'components/common/modal/filtersDownload';

export default class DownloadDataModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radio: 'projects',
      dropdowns: {}
    };
  }


  onSelectRadio(value) {
    this.setState({
      radio: value
    });
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
    const checkedBmes = (bmes || []).map(bme => bme.id);
    const checkedSolution = (solutions || []).map(solution => solution.id);
    const bmesString = checkedBmes.length ? `bme_ids=${checkedBmes.toString()}` : '';
    const citiesString = checkedCities.length ? `city_ids=${checkedCities.toString()}` : '';
    const solutionString = checkedSolution.length ? `solution_ids=${checkedSolution.toString()}` : '';

    const params = [bmesString, citiesString, solutionString].filter(s => s.length).join('&');

    return `${process.env.API_URL}/csvs/${radio}?${params}`;
  }

  render() {
    const { bmes, cities, onClose, solutions } = this.props;
    const { radio } = this.state;

    return (
      <div className="c-download-data-modal">
        <h2 className="c-title -fw-thin -fs-huge">Download</h2>
        <p className="c-text -fs-small -fw-light">Select the part of the dataset you are interested on, then click download to get the file</p>
        <div className="selector">
          <label htmlFor="projects" className="c-text -fs-small -dark input-item">
            <input
              name="projects"
              id="projects"
              type="radio"
              value="projects"
              checked={radio === 'projects'}
              onChange={e => this.onSelectRadio(e.target.value)}
            />
            Projects
          </label>
          <label htmlFor="bmes" className="c-text -fs-small -dark input-item">
            <input
              name="bmes"
              id="bmes"
              type="radio"
              value="bmes"
              checked={radio === 'bmes'}
              onChange={e => this.onSelectRadio(e.target.value)}
            />
            Business Model Elements
          </label>
        </div>

        <DownloadFilters
          bmes={bmes}
          solutions={solutions}
          cities={cities}
          onChangeDropwdown={(name, values) => this.onChangeDropwdown(name, values)}
        />

        {this._getResume()}

        <div className="buttons">
          <Button secondary onClick={onClose}>Cancel</Button>
          <a href={this._getDownloadLink()} download="a">Download</a>
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

import React from 'react';
import PropTypes from 'prop-types';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import Button from 'components/common/Button';

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
    const bmesString = checkedBmes.length ? `?bme_ids=${checkedBmes.toString()}` : '';
    const citiesString = checkedCities.length ? `&city_ids=${checkedCities.toString()}` : '';
    const solutionString = checkedSolution.length ? `&solution_ids=${checkedSolution.toString()}` : '';

    return `${process.env.API_URL}/csvs/${radio}${bmesString}${citiesString}${solutionString}`;
  }

  render() {
    const { bmes, cities, onClose, solutions } = this.props;
    const { radio, dropdowns } = this.state;
    const checkedCities = (dropdowns.cities || []).map(city => city.id);
    const checkedBmes = (dropdowns.bmes || []).map(bme => bme.id);
    const checkedSolution = (dropdowns.solutions || []).map(solution => solution.id);

    cities.forEach((cityOption) => {
      cityOption.checked = checkedCities.includes(cityOption.id);
    });

    bmes.forEach((bmeOption) => {
      bmeOption.checked = checkedBmes.includes(bmeOption.id);
    });

    solutions.forEach((solutionOption) => {
      solutionOption.checked = checkedSolution.includes(solutionOption.id);
    });

    return (
      <div className="c-download-data-modal">
        <h2 className="modal-title">Download</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, eos quod et, quos,
          mollitia ad quis maxime facere sunt rem aperiam vitae aliquid. Ratione hic voluptatum
          quidem repellat nihil illum!</p>
        <label htmlFor="projects">
          <input
            name="projects"
            type="radio"
            value="projects"
            checked={radio === 'projects'}
            onChange={e => this.onSelectRadio(e.target.value)}
          />
          Projects
        </label>
        <label htmlFor="bmes">
          <input
            name="bmes"
            type="radio"
            value="bmes"
            checked={radio === 'bmes'}
            onChange={e => this.onSelectRadio(e.target.value)}
          />
          Business Model Elements
        </label>

        <span>Filtered by</span>

        <div className="filters">
          <DropdownTreeSelect
            placeholderText={radio === 'projects' ? 'Any city' : 'Used in any city'}
            data={cities}
            onChange={(currentNode, selectedNodes) => this.onChangeDropwdown('cities', selectedNodes)}
          />

          <DropdownTreeSelect
            placeholderText={radio === 'projects' ?
              'Any business model element or category used' : 'All business model elements'}
            data={bmes}
            onChange={(currentNode, selectedNodes) => this.onChangeDropwdown('bmes', selectedNodes)}
          />

          <DropdownTreeSelect
            placeholderText={radio === 'projects' ?
              'Any solution' : 'Used in any solution'}
            data={solutions}
            onChange={(currentNode, selectedNodes) => this.onChangeDropwdown('solutions', selectedNodes)}
          />
        </div>

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

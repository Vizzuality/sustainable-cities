import React from 'react';

export default class DownloadDataModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radios: {
        project: false,
        bme: false
      }
    };
  }

  onSelectRadio(name, value) {
    this.setState({
      radios: {
        [name]: value
      }
    });
  }

  render() {
    return (
      <div className="c-download-data-modal">
        <h2 className="modal-title">Download</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, eos quod et, quos, mollitia ad quis maxime facere sunt rem aperiam vitae aliquid. Ratione hic voluptatum quidem repellat nihil illum!</p>

        <label htmlFor="projects">
          <input
            name="projects"
            type="radio"
            checked={this.state.radios.project}
            onChange={e => this.onSelectRadio('project', e.target.checked)}
          />
          Projects
        </label>
        <label htmlFor="bme">
          <input
            name="bme"
            type="radio"
            checked={this.state.radios.bme}
            onChange={e => this.onSelectRadio('bme', e.target.checked)}
          />
          Business Model Elements
        </label>

        <span>Filtered by</span>
      </div>
    );
  }
}

import React from 'react';
import copy from 'copy-to-clipboard';

import Button from 'components/common/Button';

class ShareModal extends React.Component {
  static defaultProps = {
    url: "https://financingsustainablecities.org/asd123?fghjkl",
    publicProject: false,
  }

  state = {
    showEditableURL: false,
  };

  onEditableClick = (showEditableURL) => {
    this.setState({ showEditableURL });
  }

  onCopyClick = () => {
    copy(this.props.url);
  }

  render() {
    return (
      <div className="c-modal">
        <div className="content">
          <section className="builder-help">
            <h1 className="c-title -fw-thin -fs-huge">Share</h1>

            <div className="row">
              {
                this.props.url ?
                  <div className="column u-flex-column u-pr-2">
                    <div>
                      <h2 className="c-title -fw-light -fs-extrabig">
                        {this.props.publicProject ? "URL to share" : "Private URL to share"}
                      </h2>

                      <input
                        className="u-block u-w-100 input-text u-mb-1"
                        type="text"
                        value={this.state.showEditableURL ? this.props.urlEditable : this.props.url}
                        readOnly={true}
                      />

                      { !this.props.publicProject &&
                          <label className="u-block u-mb-1">
                            <input
                              type="checkbox"
                              onChange={(e) => this.onEditableClick(e.target.checked)}
                            />
                            Share editable project (allow changes)
                          </label>
                      }
                    </div>

                    <div className="u-mt-1">
                      <Button primary onClick={this.onCopyClick}>Copy link</Button>
                    </div>
                  </div> :
                  <div className="column u-flex-column u-pr-2">
                    <div>
                      <h2 className="c-title -fw-light -fs-extrabig">
                        Unsaved project
                      </h2>

                      <p>Please, save your business model before sharing it.</p>
                    </div>
                    <div className="u-mt-1">
                      <Button primary onClick={this.props.onSave}>Save</Button>
                    </div>
                  </div>
              }

              <div className="column u-left-separator u-pl-2 u-flex-column">
                <div>
                  <h2 className="c-title -fw-light -fs-extrabig">Share a document</h2>

                  <p className="c-text">
                    Export a printable document to share by any other way. Please {}
                    <span className="c-text -underline">consider the environment before printing</span> {}
                    this document.
                  </p>
                </div>

                <div className="u-mt-1">
                  <Button primary onClick={this.props.onDownload}>Download</Button>
                </div>
              </div>
            </div>

            <div className="actions">
              <Button secondary onClick={this.props.onClose}>Close</Button>
            </div>

            <div className="dismiss" onClick={this.props.onClose}>&times;</div>
          </section>
        </div>
      </div>
    );
  }
}

export default ShareModal;

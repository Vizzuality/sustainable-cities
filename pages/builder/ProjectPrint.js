import { connect } from 'react-redux';

import BuilderPage from 'pages/builder/BuilderPage';
import Head from 'components/layout/head';
import ProjectOverview from 'components/builder-index/ProjectOverview';
import ProjectCategory from 'components/builder-index/ProjectCategory';
import Button from 'components/common/Button';

import { builderSelector } from 'selectors/builder';


class ProjectPrint extends React.Component {
  render() {
    return (
      <div>
        <Head
          title="Builder"
          description=""
        />

        <div className="row u-mt-2">
          <div className="u-flex u-ml-a u-hide-print">
            <Button secondary link={{ route: 'builder-project', params: this.props.bmRouteParams }} className="u-mr-1">
              Go back
            </Button>

            <Button primary onClick={() => window.print()}>
              Print
            </Button>
          </div>

          <div className="u-w-100 u-flex u-flex-sb u-pt-2 u-pb-2 u-bottom-separator u-align-items-center">
            <h1 className="c-title -fs-huge -fw-thin">{this.props.title}</h1>

            <div className="c-text u-flex -fw-bold -uppercase -fs-extrasmall">
              <div className="u-pr-1/2">powered by</div>
              <div className="u-left-separator u-bw-2 u-bc-cc u-pl-1/2">
                <div>financing</div>
                <div>sustainable</div>
                <div>cities</div>
              </div>
            </div>
          </div>
        </div>

        <ProjectOverview
          project={{ bmeTree: this.props.filteredBmeTree }}
        />

        {(this.props.filteredBmeTree || []).filter(category => category.children.length > 0).map(category => (
          <ProjectCategory
            key={category.id}
            category={category}
            readonly={true}
            bmeDescription={bme => bme.comment}
          />
        ))}
      </div>
    );
  }
}

export default BuilderPage(
  connect(
    builderSelector
  )(ProjectPrint)
);

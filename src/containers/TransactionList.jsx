import React from 'react';
import { connect } from 'react-redux';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Charge from '../components/Charge';

const TransactionList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'date',
    };
  }

  getData() {
    const charges = this.props.charges.filter(charge => {
      return charge.get('credit') !== '';
    });

    switch (this.state.sort) {
    case 'date':
      return charges.sort(
        (a, b) => a.get('date').localeCompare(b.get('date'))
      );
    case 'description':
      return charges.sort(
        (a, b) => a.get('description').localeCompare(b.get('description'))
      );
    case 'credit':
      return charges.sort((a, b) => {
        return parseFloat(a.get('credit')) < parseFloat(b.get('credit')) ? 1 : -1;
      });
    case 'category':
      return charges.sort(
        (a, b) => a.get('category').localeCompare(b.get('category'))
      );
    default:
      return charges;
    }
  }

  changeSort(sort) {
    this.setState({ sort });
  }

  render() {
    const selected = 'bg-white blue not-rounded';
    const unselected = 'btn-primary';
    const sort = this.state.sort;

    function className(chargeProperty) {
      return chargeProperty === sort ? selected : unselected;
    }

    return (
      <section className="">
        <table className="border">
          <thead className="white bg-blue">
            <tr className="flex bold">
              <th className="p0 col-2">
                <button type="button" { ...styles }
                  className={`btn center ${className('date')}`}
                  onClick={this.changeSort.bind(this, 'date')}>
                  Date</button>
              </th>
              <th className="p0 col-5">
                <button type="button" { ...styles }
                  className={`btn left-align ${className('description')}`}
                  onClick={this.changeSort.bind(this, 'description')}>
                  Description</button>
              </th>
              <th className="p0 col-3 pl0 center">
                <button type="button" { ...styles }
                  className={`btn center ${className('category')}`}
                  onClick={this.changeSort.bind(this, 'category')}>
                  Category</button>
              </th>
              <th className="p0 col-2">
                <button type="button" { ...styles }
                  className={`btn right-align pr3 ${className('credit')}`}
                  onClick={this.changeSort.bind(this, 'credit')}>
                  Credit</button>
              </th>
            </tr>
          </thead>
          <tbody className="block">
            {this.getData().map(charge =>
              <Charge key={charge.get('id')}
                date={charge.get('date')}
                description={charge.get('description')}
                credit={charge.get('credit')}
                category={charge.get('category')}
              />
            )}
          </tbody>
        </table>
      </section>
    );
  }
};

const styles = {
  style: {
    height: '44px',
    width: '100%',
  },
};


TransactionList.propTypes = {
  charges: ImmutablePropTypes.list,
};

function mapStateToProps(state) {
  return {
    charges: state.credit.get('charges'),
  };
}

export default connect(mapStateToProps)(TransactionList);

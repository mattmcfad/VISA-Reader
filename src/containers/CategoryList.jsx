import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

const CategoryList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [{
        name: 'apartment',
        percent: '100%',
        amount: '$ 100.00',
      }],
      totalCredit: 100.00,
      uncategorizedCredit: 15.00,
    };

    this.getData = this.getData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps);
  }

  getData(props) {
    const filteredData = props.charges.filter(charge => {
      return charge.get('category') !== '' && charge.get('credit') !== '';
    });

    const totalCredit = filteredData.reduce((sum, charge) => {
      return sum + parseFloat(charge.get('credit'));
    }, 0 );

    const reducedData = filteredData.reduce((categoryMap, charge ) => {
      const category = charge.get('category');
      return categoryMap.update(category, 0, (count) => {
        return count + parseFloat(charge.get('credit'));
      });
    }, new Map()).map((categoryTotal, category) => {
      return {
        name: category,
        percent: ((categoryTotal / totalCredit) * 100.0).toFixed(2) + '%',
        amount: '$' + categoryTotal.toFixed(2),
      };
    }).toList().toJS();

    const uncategorizedCredit = props.charges.filter(charge => {
      return charge.get('category') === '' && charge.get('credit') !== '';
    }).reduce((sum, charge) => {
      return sum + parseFloat(charge.get('credit'));
    }, 0 );

    this.setState({
      categories: reducedData,
      totalCredit: totalCredit.toFixed(2),
      uncategorizedCredit: uncategorizedCredit.toFixed(2),
    });
  }

  render() {
    return (
      <section className="ml2 col-12">
        <table className="border">
          <thead className="white bg-blue">
            <tr className="left-align rounded bold">
              <th className="">Category</th>
              <th className="">Percent</th>
              <th className="">Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {this.state.categories.map((category, index) =>
              <tr key={index}>
                <td className="">{category.name}</td>
                <td className="">{category.percent}</td>
                <td className="">{category.amount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="col-12 flex border flex-end" { ...styles }>
          <div className=" block p2 h2">Total Credit: ${this.state.totalCredit}</div>
          <div className=" block p2 h3">Total uncategorized Credit: ${this.state.uncategorizedCredit}</div>
        </div>
      </section>
    );
  }
};

const styles = {
  style: {
    'flex-direction': 'row-reverse',
  },
};

CategoryList.propTypes = {
  charges: ImmutablePropTypes.list,
};

function mapStateToProps(state) {
  return {
    charges: state.credit.get('charges'),
  };
}

export default connect(mapStateToProps)(CategoryList);

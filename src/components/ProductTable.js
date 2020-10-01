import React from "react";
import ProductTableCategory from "./ProductTableCategoryRow";
import ProductTableRow from "./ProductTableRow";
import { isEqual } from "lodash";

export default class ProductTable extends React.Component {
  static defaultProps = {
    filter: undefined,
    onlyStock: false,
  };
  state = {
    data: [],
  };

  componentDidUpdate = (prevProps) => {
      if (!isEqual(prevProps, this.props)) {
          this.fetchData();
      }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const query = [];

    if (this.props.filter) {
      query.push("filter=" + this.props.filter);
    }
    if (this.props.onlyStock) {
      query.push("onlyStock=" + this.props.onlyStock);
    }

    fetch(
      "/.netlify/functions/data" +
        (query.length > 0 ? "?" + query.join("&") : "")
    ).then(resp => {
        return resp.json();
    }).then(data => 
        this.setState({ data: data })
    );
  }

  render() {
    const rows = [];
    let lastCat;

    this.state.data.forEach((item) => {
      if (item.category !== lastCat) {
        lastCat = item.category;
        rows.push(<ProductTableCategory key={lastCat} value={lastCat} />);
      }

      rows.push(<ProductTableRow key={item.id} value={item} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

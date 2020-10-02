import React from "react";
import ProductTable from "./ProductTable";
import SearchField from "./SearchField";
import { debounce } from "lodash";

export default class FilterableProductTable extends React.Component {
  state = {
    filter: undefined,
    onlyStock: false,
  };

  onFilterChange = debounce((filter) => {
    this.setState({ filter: filter });
  }, 100);

  render() {
    return (
      <div>
        <SearchField
          filter={this.state.filter}
          onlyStock={this.state.onlyStock}
          onFilterChange={this.onFilterChange}
          onOnlyStockChange={(onlyStock) =>
            this.setState({ onlyStock: onlyStock })
          }
        />
        <ProductTable
          filter={this.state.filter}
          onlyStock={this.state.onlyStock}
        />
      </div>
    );
  }
}

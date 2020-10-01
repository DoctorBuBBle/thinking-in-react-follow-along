import React from "react";

export default function SearchField(props) {
  return (
    <div>
      <input
        type="text"
        value={props.filter}
        onChange={(event) => props.onFilterChange(event.target.value)}
        placeholder="Search"
      />
      <p>
        <input
          type="checkbox"
          checked={props.onlyStock}
          onChange={(event) => props.onOnlyStockChange(event.target.checked)}
        />
        Only Stock
      </p>
    </div>
  );
}

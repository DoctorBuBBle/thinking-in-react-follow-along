import React from "react";

export default function ProductTableRow(props) {
    const name = props.value.stocked ? props.value.name : <span className="red"> { props.value.name } </span>

    return (
        <tr>
            <td>{name}</td>
            <td>{props.value.price}</td>
        </tr>
    );
}
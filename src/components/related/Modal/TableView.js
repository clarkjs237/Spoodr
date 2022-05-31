import React from 'react';
import styled, { css } from 'styled-components';
import { TextH3, defFont } from '../Related';

const TableContainer = styled.div`
  height: 25rem;
  width: 25rem;
  position: absolute;
  background-color: #EAC9C1;
  background-image: linear-gradient(to bottom,white,transparent);
  border: 1.5px #32292F solid;
  transition: transform 0.5s ease-out;
  top: -69rem;
  // left: ${(props) => (props.index * 8.5) + 8.5}rem;
  left: 24rem;
`;

const CloseModalButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.8rem;
  &:before {
    content: "\\2716";
  }
  cursor: pointer;
  &:hover {
    color: #90D7FF;
  }
`;

const Table = styled.table`
  position: absolute;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";

  left: 2.25rem;
  // border: 2px red solid;
`;

const TableBody = styled.tbody`
`;

const TableRow = styled.tr`
`;

const TableHeader = styled.th`
`;

const TableData = styled.td`
`;

export default function TableView({
  modalCardIndex,
  overviewProduct,
  overviewStyle,
  overviewRating,
  relatedProduct,
  relatedStyle,
  relatedRating,
  closeModal
}) {
  // const [rows]

  // I want to look through overviewProduct

  return (
    <TableContainer>
      <TextH3
        style={{
        "fontSize": "0.85rem",
        "fontWeight": "3",
        "paddingLeft": "1rem",
        "transform": "translateY(-0.15rem)"
        }}
      >COMPARING</TextH3>
      <Table>
        <TableBody>
          <TableRow>
            <TableHeader>{overviewProduct.name}</TableHeader>
            <TableHeader />
            <TableHeader>{relatedProduct.name}</TableHeader>
          </TableRow>
          <TableRow>
            <TableData>{overviewProduct.category}</TableData>
            <TableData>Category</TableData>
            <TableData>{relatedProduct.category}</TableData>
          </TableRow>
        </TableBody>
      </Table>
      <CloseModalButton
        onClick={closeModal}
      />
    </TableContainer>

  );
}

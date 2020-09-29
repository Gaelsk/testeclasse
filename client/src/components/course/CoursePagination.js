import React from "react";
import Pagination from "@material-ui/lab/Pagination";
//import PaginationItem from "@material-ui/lab/PaginationItem";

export default function CoursePaginaion({ page }) {
  return (
    <Pagination siblingCount={1} variant="outlined" shape="rounded" page={page}>
      {/*
      {page !== 1 && <PaginationItem type="previous"></PaginationItem>}
      {page !== 1 && <PaginationItem type="first">1</PaginationItem>}
      {page > 2 && <PaginationItem>{page - 1}</PaginationItem>}
      
      <PaginationItem type="start-ellipsis"></PaginationItem>
  <PaginationItem type="next"></PaginationItem>*/}
    </Pagination>
  );
}

import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

// http://localhost:8080/edit/99?query=value
const EditExpensePage = (props) => {
  let params = useParams();
  console.log('params: ', params);

  const [ searchParams ] = useSearchParams();
  const entries = [];
  for(let entry of searchParams.entries()) {
    entries.push(entry);
  }
  console.log('entries: ', entries);

  console.log('query2: ', searchParams.get('query2'));
  return (
    <div>
      <h1>Edit Expense Page</h1>
      <p>ID: {params.id}</p>
      <p>Query: {searchParams.get('query')}</p>
      <p>Query2: {searchParams.get('query2')}</p>
    </div>
  );
}

export default EditExpensePage;

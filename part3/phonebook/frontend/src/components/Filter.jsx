const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input name="filter" value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;

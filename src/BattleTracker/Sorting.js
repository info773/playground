// TODO
// How to structure Components better with children prop?
// change init - only one letter at a time
// - Layout
// Left of -> SortBy TrackerContent

export function Sorting({ sortBy, setSortBy }) {
  return (
    <div className="sort-option">
      <select
        id="sorting"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="dec">decreasing</option>
        <option value="inc">increeasing</option>
        <option value="name-az">name (A-Z)</option>
        <option value="name-za">name (Z-A)</option>
      </select>
    </div>
  );
}

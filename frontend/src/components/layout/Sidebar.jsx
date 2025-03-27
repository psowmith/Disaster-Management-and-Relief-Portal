import PropTypes from "prop-types";

const Sidebar = ({ items }) => {
  // Check if items is defined and not an empty array before rendering
  if (!items || items.length === 0) {
    return null; // Return null if items is undefined or empty
  }

  return (
    <aside className="w-64 bg-gray-100 p-4 shadow-md">
      <ul className="space-y-2">
        {items.map((item, index) => {
          // Check if the item or index is undefined
          if (item === undefined || index === undefined) {
            return null; // Skip rendering if item or index is undefined
          }
          return (
            <li key={index} className="p-2 bg-white rounded shadow">
              {item}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default Sidebar;

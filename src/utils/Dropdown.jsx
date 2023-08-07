import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '../utils/Transition';

function Dropdown({ title, options, selectedOption, onSelectOption }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      onFocus={() => setDropdownOpen(true)}
      onBlur={() => setDropdownOpen(false)}
    >
      <a
        className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"
        href="#0"
        aria-expanded={dropdownOpen}
        onClick={(e) => e.preventDefault()}
      >
        {title}
        <svg
          className="w-3 h-3 fill-current text-gray-500 cursor-pointer ml-1 shrink-0"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
        </svg>
      </a>
      <Transition
        show={dropdownOpen}
        tag="ul"
        className="origin-top-right absolute top-full right-0 w-40 bg-gray-800 rounded shadow-lg py-1 mt-1"
        enter="transition ease-out duration-200"
        enterStart="opacity-0 translate-y-1"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-1"
      >
        {options.map((option) => (
          <li key={option}>
            <a
              className={`text-sm text-gray-300 hover:bg-gray-700 px-4 py-2 block ${
                selectedOption === option ? 'bg-gray-700' : ''
              }`}
              href="#0"
              onClick={(e) => {
                e.preventDefault();
                onSelectOption(option);
                setDropdownOpen(false);
              }}
            >
              {option}
            </a>
          </li>
        ))}
      </Transition>
    </li>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

export default Dropdown;

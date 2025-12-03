import { useState, useRef } from "react";

interface Option {
  id: number;
  name: string;
}

interface Props {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (val: Option) => void;
}

export const SearchableSelect = ({ label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>

      {/* Selected Box */}
      <div
        className="w-full border rounded-lg px-4 py-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {value ? value.name : "Select " + label}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full bg-white border mt-1 rounded-lg shadow-lg p-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder={`Search ${label}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="px-3 py-2 hover:bg-green-100 cursor-pointer rounded"
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-400">No result found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

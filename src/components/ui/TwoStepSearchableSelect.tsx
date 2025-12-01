import React, { useState, useRef, useEffect } from "react";
import { type UseFormSetValue } from "react-hook-form";

type District = {
  id: number;
  name: string;
};

export type Props = {
  name: string;
  placeholder?: string;
  className?: string;

  firstValue: string;
  setFirstValue: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<any>;
  DISTRICTS: District[]
};

// const DISTRICTS: District[] = [
//   { id: 1, name: "Bagerhat" },
//   { id: 2, name: "Bandarban" },
//   { id: 3, name: "Dhaka" },
//   { id: 4, name: "Chattogram" },
//   { id: 5, name: "Rajshahi" },
//   { id: 6, name: "Khulna" },
//   { id: 7, name: "Sylhet" },
//   { id: 8, name: "Rangpur" },
// ];

export default function TwoStepDistrictSelect({
  name,
  placeholder = "Search district...",
  className = "",
  firstValue,
  setFirstValue,
  setValue,
  DISTRICTS
}: Props) {

  const [query, setQuery] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = DISTRICTS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleFirstSelect(d: District) {
    setFirstValue(d.name);              // ✅ update local state
    setValue(name, d.name);             // ✅ set RHF value

    setQuery("");
    setShowSecond(false);
    setOpenDropdown(false);
  }

  function handleSecondSelect(d: District) {
    setFirstValue(d.name);              // ✅ update parent state
    setValue(name, d.name);             // ✅ set RHF value

    setQuery("");
    setShowSecond(false);
    setOpenDropdown(false);
  }

  function handleInputClick() {
    if (firstValue && !showSecond) {
      setShowSecond(true);
      setQuery("");
      setHighlightIndex(0);
      setOpenDropdown(true);
    } else {
      setOpenDropdown(true);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!openDropdown) setOpenDropdown(true);

    if (e.key === "ArrowDown") {
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
      e.preventDefault();
    }

    if (e.key === "ArrowUp") {
      setHighlightIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    }

    if (e.key === "Enter" && filtered[highlightIndex]) {
      showSecond
        ? handleSecondSelect(filtered[highlightIndex])
        : handleFirstSelect(filtered[highlightIndex]);

      e.preventDefault();
    }

    if (e.key === "Escape") {
      setOpenDropdown(false);
    }
  }

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* FIRST FIELD */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={showSecond ? firstValue : query || firstValue}
          readOnly={showSecond}
          className={`w-full border rounded-md px-3 py-2 
            ${showSecond ? "bg-gray-100 cursor-not-allowed" : ""}`}
          onClick={handleInputClick}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {openDropdown && !showSecond && (
          <ul className="absolute mt-1 z-50 max-h-52 w-full overflow-auto border rounded bg-white shadow">
            {filtered.map((d, i) => (
              <li
                key={d.id}
                className={`px-3 py-2 cursor-pointer ${
                  i === highlightIndex && "bg-gray-200"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFirstSelect(d)}
              >
                {d.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SECOND FIELD */}
      {openDropdown && showSecond && (
        <div className="relative mt-2">
          <input
            type="text"
            placeholder={`Search again...`}
            value={query}
            className="w-full border rounded-md px-3 py-2"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <ul className="absolute mt-1 z-50 max-h-52 w-full overflow-auto border rounded bg-white shadow">
            {filtered.map((d, i) => (
              <li
                key={d.id}
                className={`px-3 py-2 cursor-pointer ${
                  i === highlightIndex && "bg-gray-200"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSecondSelect(d)}
              >
                {d.name}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

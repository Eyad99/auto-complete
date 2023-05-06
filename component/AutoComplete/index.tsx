import React, { FC, useRef, useEffect } from "react";
import { Country } from "../../models";
import styles from "../../styles/AutoComponent.module.css";
import useAutocomplete from "../hooks/useAutocomplete";

interface AutoCompleteProps {
  data: Country[];
}
const AutoComplete: FC<AutoCompleteProps> = ({ data }) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  // useAutocomplete Hook
  const {
    searchedValue,
    suggestions,
    selectedSuggestion,
    activeSuggestion,
    handleChange,
    handleKeyDown,
    handleClick,
  } = useAutocomplete(data, inputSearchRef.current);

  const getHighlightedText = (text: string, highlight: string) => {
    // Split on highlight term and include term into parts
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part: any, i: any) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { color: "#83764F", fontWeight: "bolder" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className={styles.content}>
      <label className={styles.label}>Search your Country</label>
      <input
        className={styles["input-text"]}
        placeholder="Search your country"
        ref={inputSearchRef}
        value={searchedValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
      />

      {!suggestions.length &&
      searchedValue.length &&
      !selectedSuggestion.length ? (
        <h5>Nothing to show</h5>
      ) : (
        <div className={styles["list-item"]}>
          {suggestions.map(({ name }: Country, ind: any) => {
            return (
              <span
                key={ind}
                onClick={() => handleClick(name)}
                className={`${styles.item} ${
                  ind === activeSuggestion - 1 ? styles.activeItem : ""
                }`}
              >
                {getHighlightedText(name, searchedValue)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;

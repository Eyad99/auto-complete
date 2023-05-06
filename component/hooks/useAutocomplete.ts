import { SetStateAction, useEffect, useState } from "react";
import { Country } from "../../models";

const useAutocomplete = (
  data: Country[],
  inputSearchRef: HTMLInputElement | null
) => {
  const [searchedValue, setSearchedValue] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  useEffect(() => {
    if (inputSearchRef) {
      inputSearchRef.focus();
    }
  }, []);

  const handleChange = async (event: {
    target: { value: SetStateAction<string> };
  }): Promise<void> => {
    if (event.target.value !== "") {
      const filteredSuggestions = data.filter((itemData) => {
        const value = event.target.value.toString().toLowerCase();
        const name = itemData.name.toLowerCase();

        //To search for the word from the first letter
        // return value && name.startsWith(value) && name !== value;

        //To search about characters inside word
        return value && name.includes(value) && name !== value;
      });

      await setSearchedValue(event.target.value);
      await setSuggestions(filteredSuggestions);
    } else {
      setSearchedValue("");
      setSuggestions([]);
      setSelectedSuggestion("");
      setActiveSuggestion(0);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
      setActiveSuggestion(activeSuggestion + 1);
    } else if (event.key === "ArrowUp" && activeSuggestion > 1) {
      setActiveSuggestion(activeSuggestion - 1);
    } else if (event.key === "Enter") {
      if (activeSuggestion !== 0) {
        setSearchedValue(suggestions[activeSuggestion - 1].name);
        setSelectedSuggestion(suggestions[activeSuggestion - 1].name);
        setSuggestions([]);
        setActiveSuggestion(0);
      }
    }
  };

  const handleClick = (value: string) => {
    setSearchedValue(value);
    setSuggestions([]);
    setSelectedSuggestion(value);
    setActiveSuggestion(0);
  };

  return {
    searchedValue,
    suggestions,
    selectedSuggestion,
    activeSuggestion,
    handleChange,
    handleKeyDown,
    handleClick,
  };
};

export default useAutocomplete;

import { useEffect, useState } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[] | any >(() => {
    const ls = localStorage.getItem("favorites") as string;
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const toggleItemInLocalStorage = (id: string) => () => {
    const isFavorites = favorites.includes(id);
    if (isFavorites)
      setFavorites((prev: string[]) => prev.filter((b: string) => b !== id));
    else setFavorites((prev: string[]) => [...prev, id]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return [favorites, toggleItemInLocalStorage];
};

export default useFavorites;

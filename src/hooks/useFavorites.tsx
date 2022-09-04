import { useEffect, useState, FC } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<any>(() => {
    const ls = localStorage.getItem("favorites");
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const toggleItemInLocalStorage = (id: string) => () => {
    console.log("ID::", id)
    const isFavorites = favorites.includes(id);
    console.log("FBRT", isFavorites);
    if (isFavorites)
      setFavorites((prev: any) => prev.filter((b: any) => b !== id));
    else setFavorites((prev: any) => [...prev, id]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return [favorites, toggleItemInLocalStorage];
};

export default useFavorites;

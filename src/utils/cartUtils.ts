import { Ingredient, Extra } from "../data/menu";

export const generateCartItemId = (
  itemId: string,
  removedIngredients: Ingredient[],
  addedExtras: Extra[],
  notes: string
): string => {
  const extrasStr = addedExtras
    .map((e) => e.name)
    .sort()
    .join(",");
  const removedStr = removedIngredients.sort().join(",");
  const hash = btoa(`${itemId}|${removedStr}|${extrasStr}|${notes}`);
  return hash;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

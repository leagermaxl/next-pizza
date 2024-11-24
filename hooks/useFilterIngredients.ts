import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';

import React from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddIngredients: (id: string) => void;
}

export const useFilterIngredients = (queryIngredientsIds?: string[]): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedIngredients, { toggle }] = useSet<string>(new Set([]));

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const response = await Api.ingredients.getAll();
        setIngredients(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  queryIngredientsIds?.forEach((id) => selectedIngredients.add(id));

  return { ingredients, loading, onAddIngredients: toggle, selectedIngredients };
};

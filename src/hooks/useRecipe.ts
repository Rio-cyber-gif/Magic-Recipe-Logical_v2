import { useState } from 'react';
import { generateRecipe, type Recipe } from '../logic/generateRecipe';

export function useRecipe() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('すべて');

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else if (selectedIngredients.length < 3) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleCast = () => {
    if (selectedIngredients.length === 0) return;
    const generated = generateRecipe(selectedIngredients);
    setRecipe(generated);
    setShowRecipe(true);
  };

  const handleShare = (recipeName: string) => {
    const ingredients = selectedIngredients.join('・');
    const text = `Magic Recipe: Logical で錬成しました ✦\n「${recipeName}」\n\n使用食材：${ingredients}\n\n#MagicRecipeLogical`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  const handleReset = () => {
    setShowRecipe(false);
    setSelectedIngredients([]);
    setRecipe(null);
    setActiveCategory('すべて');
  };

  return {
    selectedIngredients,
    recipe,
    showRecipe,
    activeCategory,
    setActiveCategory,
    toggleIngredient,
    clearIngredients,
    handleCast,
    handleShare,
    handleReset,
  };
}

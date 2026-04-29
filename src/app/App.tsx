import { INGREDIENTS, INGREDIENT_CATEGORIES } from '../data/ingredients';
import { useRecipe } from '../hooks/useRecipe';

export default function App() {
  const {
    selectedIngredients,
    recipe,
    showRecipe,
    activeCategory,
    setActiveCategory,
    toggleIngredient,
    handleCast,
    handleShare,
    handleReset,
  } = useRecipe();

  const filteredIngredients = activeCategory === 'すべて'
    ? INGREDIENTS
    : INGREDIENTS.filter(i => INGREDIENT_CATEGORIES[activeCategory]?.includes(i));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-2xl border border-white/30 border-l-4 border-l-white/80 rounded-3xl p-8 shadow-2xl">
        {!showRecipe ? (
          <div className="space-y-8">
            <header className="text-center space-y-3">
              <h1 className="tracking-tight text-foreground">Magic Recipe: Logical</h1>
              <p className="text-muted-foreground leading-relaxed">
                マジックレシピ・ロジカル
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed break-keep">
                日常の食材を、エンジニアリングの視点と少しの魔法で<br />「論理的に錬成」する不思議な献立帖です。
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-foreground">
                  材料を選択（3つまで）
                </label>
                <div className="flex items-center gap-2 mb-4 min-h-[2rem]">
                  <span className="text-sm text-muted-foreground shrink-0">
                    選択中: {selectedIngredients.length}/3
                  </span>
                  {selectedIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedIngredients.map((ingredient) => (
                        <button
                          key={ingredient}
                          onClick={() => toggleIngredient(ingredient)}
                          className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground hover:opacity-75 transition-opacity cursor-pointer"
                        >
                          {ingredient}
                          <span className="opacity-70">×</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {Object.keys(INGREDIENT_CATEGORIES).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors
                        ${activeCategory === category
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-white/60 text-foreground border-white/40 hover:bg-white/80'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-80 overflow-y-auto p-1">
                  {filteredIngredients.map((ingredient) => {
                    const isSelected = selectedIngredients.includes(ingredient);
                    const isDisabled = !isSelected && selectedIngredients.length >= 3;

                    return (
                      <button
                        key={`${activeCategory}-${ingredient}`}
                        onClick={() => toggleIngredient(ingredient)}
                        disabled={isDisabled}
                        className={`
                          px-3 py-2 text-sm rounded-md border transition-colors
                          ${isSelected
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-white/60 text-foreground border-white/40 hover:bg-white/80'
                          }
                          ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        {ingredient}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleCast}
                disabled={selectedIngredients.length === 0}
                className="w-full px-6 py-5 bg-primary text-primary-foreground rounded-xl text-lg font-semibold tracking-widest uppercase shadow-lg hover:opacity-90 hover:shadow-primary/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                ✦ Cast ✦
              </button>
            </div>

            <footer className="text-center text-xs text-muted-foreground space-y-1">
              <p>Zero API Cost · Minimalist UI · Clean Experience</p>
              <p className="opacity-75">
                本アプリは空腹を物理的に満たすものではなく、精神的な充足を目的としています。
              </p>
            </footer>
          </div>
        ) : (
          <div className="space-y-8">
            <header className="text-center space-y-4 pb-8 border-b border-border">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground tracking-wider uppercase">
                  Build Successful
                </p>
                <h1 className="text-foreground text-xl leading-snug px-4 break-keep">
                  {recipe?.name}
                </h1>
              </div>
              <p className="text-xs text-muted-foreground">錬成完了 — Recipe Generated</p>
            </header>

            <div className="space-y-10">
              {recipe?.steps.map((phase, phaseIdx) => (
                <section key={phaseIdx} className="space-y-4">
                  <h3 className="text-foreground pb-2 border-b border-border/50">
                    {phase.phase}
                  </h3>
                  <ol className="space-y-3 list-none">
                    {phase.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex gap-3 text-sm leading-relaxed">
                        <span className="text-muted-foreground shrink-0 opacity-60">
                          {String(stepIdx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-foreground/90">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <button
                onClick={() => handleShare(recipe?.name ?? '')}
                className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                X でシェア
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                New Recipe
              </button>
            </div>

            <footer className="text-center text-xs text-muted-foreground pt-4">
              <p>
                生成されるレシピは型安全ですが、実際の味の再現性については「未定義」とさせていただきます。
              </p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

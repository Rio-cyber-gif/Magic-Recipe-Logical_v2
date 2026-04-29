import { INGREDIENT_ALIASES } from '../data/ingredients';
import {
  RECIPE_PREFIXES,
  RECIPE_SUFFIXES,
  ACTIONS,
  METHODS,
  STATES,
  METRICS,
  TOOLS,
  CONDITIONS,
  VERIFICATIONS,
  SERVE_MESSAGES,
  FINALIZATIONS,
} from '../data/words';

export interface RecipeStep {
  phase: string;
  steps: string[];
}

export interface Recipe {
  name: string;
  steps: RecipeStep[];
}

export function generateRecipe(ingredients: string[]): Recipe | null {
  if (ingredients.length === 0) return null;

  const seed = ingredients.join('').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const random = (index: number) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  const pick = <T,>(arr: readonly T[], index: number): T => {
    return arr[Math.floor(random(index) * arr.length)];
  };

  const initSteps: string[] = [];
  ingredients.forEach((ing, i) => {
    const action = pick(ACTIONS, i * 3);
    const method = pick(METHODS, i * 3 + 1);
    const tool = pick(TOOLS, i * 3 + 2);
    initSteps.push(`${ing}を${tool}に読み込み、${method}により${action}する。`);
  });

  const computeSteps: string[] = [];
  const numCompute = Math.min(ingredients.length + 1, 4);
  for (let i = 0; i < numCompute; i++) {
    const action = pick(ACTIONS, 100 + i * 4);
    const state = pick(STATES, 100 + i * 4 + 1);
    const metric = pick(METRICS, 100 + i * 4 + 2);
    const condition = pick(CONDITIONS, 100 + i * 4 + 3);
    computeSteps.push(`${condition}で${action}を実行し、${state}まで${metric}で加熱/冷却する。`);
  }

  const verifySteps: string[] = [];
  const numVerify = Math.min(Math.floor(ingredients.length / 2) + 1, 3);
  for (let i = 0; i < numVerify; i++) {
    verifySteps.push(pick(VERIFICATIONS, 200 + i));
  }

  const finalSteps: string[] = [];
  finalSteps.push(pick(FINALIZATIONS, 300));
  finalSteps.push(pick(SERVE_MESSAGES, 301));

  const steps: RecipeStep[] = [
    { phase: '01 — Initialization', steps: initSteps },
    { phase: '02 — Computation', steps: computeSteps },
    { phase: '03 — Verification', steps: verifySteps },
    { phase: '04 — Deployment', steps: finalSteps }
  ];

  // Generate recipe name
  const aliasIngredients = ingredients.map(ing => INGREDIENT_ALIASES[ing] ?? ing);
  const prefix = pick(RECIPE_PREFIXES, 500);
  const suffix = pick(RECIPE_SUFFIXES, 501);

  let mainIng = aliasIngredients[0];
  let subIng = aliasIngredients.length > 1 ? aliasIngredients[1] : null;

  if (subIng) {
    // 似た語彙が並ぶのを防ぐため、被りがあればサブ側の語を省略する
    const commonTerms = ['ノード', 'プロテイン', 'ソリューション', 'ファット', 'ダスト', 'リキッド', 'ブロック', 'レイヤー', 'スフィア', 'アシッド', 'リーフ', 'ペースト', 'オイル', 'グリーン', 'ゲル', 'エマルション', '結晶', 'フォーム', 'アルコール', 'クラスター', 'コンポーネント', 'モジュール'];

    for (const term of commonTerms) {
      if (mainIng.includes(term) && subIng.includes(term)) {
        subIng = subIng.replace(term, '').replace(/・$/, '').replace(/^・/, '');
      }
    }
    // 省略結果が短すぎたり空になった場合は隠す
    if (!subIng || subIng.length < 2) subIng = null;
  }

  const shortIng = mainIng.split('・')[0];

  const TITLE_FORMATS = [
    () => `[ ${mainIng} ] ${prefix}`,
    () => subIng ? `${mainIng} × ${subIng} : ${suffix}` : `${mainIng}型${suffix}`,
    () => `${prefix}・${mainIng}`,
    () => `${mainIng}式 ${suffix}`,
    () => `ƒ(${shortIng}): ${prefix}${suffix}`
  ];
  const recipeName = pick(TITLE_FORMATS, 600)();

  return { name: recipeName, steps };
}

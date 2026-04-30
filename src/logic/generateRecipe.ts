import { INGREDIENT_ALIASES } from '../data/ingredients';
import {
  INIT_VERBS,
  RECIPE_PREFIXES,
  RECIPE_SUFFIXES,
  COMPUTE_CONNECTORS,
  COMPUTE_ENDINGS,
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

  // 重複なしで複数選択する（v1のpickUniqueに相当）
  const pickUnique = <T,>(arr: readonly T[], count: number, startIndex: number): T[] => {
    const pool = [...arr];
    const result: T[] = [];
    for (let i = 0; i < count && pool.length > 0; i++) {
      const idx = Math.floor(random(startIndex + i) * pool.length);
      result.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return result;
  };

  const initSteps: string[] = [];
  ingredients.forEach((ing, i) => {
    const action = pick(ACTIONS, i * 4);
    const method = pick(METHODS, i * 4 + 1);
    const tool = pick(TOOLS, i * 4 + 2);
    const verb = pick(INIT_VERBS, i * 4 + 3);
    initSteps.push(`${ing}を${tool}に${verb}し、${method}により${action}する。`);
  });

  const computeSteps: string[] = [];
  const numCompute = 3 + Math.floor(random(99) * 2); // 3 or 4 steps
  for (let i = 0; i < numCompute; i++) {
    const action = pick(ACTIONS, 100 + i * 6);
    const state = pick(STATES, 100 + i * 6 + 1);
    const metric = pick(METRICS, 100 + i * 6 + 2);
    const condition = pick(CONDITIONS, 100 + i * 6 + 3);
    const connector = pick(COMPUTE_CONNECTORS, 100 + i * 6 + 4);
    const ending = pick(COMPUTE_ENDINGS, 100 + i * 6 + 5);
    computeSteps.push(`${condition}で${action}${connector}、${state}まで${metric}で${ending}`);
  }

  const numVerify = Math.min(Math.floor(ingredients.length / 2) + 1, 3);
  const verifySteps = pickUnique(VERIFICATIONS, numVerify, 200);

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

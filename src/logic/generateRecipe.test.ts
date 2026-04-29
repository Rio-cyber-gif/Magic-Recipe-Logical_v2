import { describe, it, expect } from 'vitest';
import { generateRecipe } from './generateRecipe';

describe('generateRecipe', () => {
  describe('純粋関数の検証', () => {
    it('同じ食材を渡すと毎回同じレシピを返す', () => {
      const ingredients = ['いちご', '生クリーム', '砂糖'];
      const result1 = generateRecipe(ingredients);
      const result2 = generateRecipe(ingredients);
      expect(result1).toEqual(result2);
    });

    it('食材の順序が変わるとレシピも変わる', () => {
      const a = generateRecipe(['いちご', '砂糖']);
      const b = generateRecipe(['砂糖', 'いちご']);
      expect(a).not.toEqual(b);
    });
  });

  describe('入力バリデーション', () => {
    it('食材が空のとき null を返す', () => {
      expect(generateRecipe([])).toBeNull();
    });

    it('食材が1つでもレシピを生成する', () => {
      const result = generateRecipe(['卵']);
      expect(result).not.toBeNull();
    });

    it('食材が2つでもレシピを生成する', () => {
      const result = generateRecipe(['卵', '牛乳']);
      expect(result).not.toBeNull();
    });

    it('食材が3つでもレシピを生成する', () => {
      const result = generateRecipe(['卵', '牛乳', 'バター']);
      expect(result).not.toBeNull();
    });
  });

  describe('出力構造の検証', () => {
    it('name が空でない文字列を返す', () => {
      const result = generateRecipe(['いちご']);
      expect(typeof result?.name).toBe('string');
      expect(result?.name.length).toBeGreaterThan(0);
    });

    it('steps が4フェーズ（Initialization / Computation / Verification / Deployment）を持つ', () => {
      const result = generateRecipe(['いちご', '生クリーム']);
      expect(result?.steps).toHaveLength(4);
      expect(result?.steps[0].phase).toBe('01 — Initialization');
      expect(result?.steps[1].phase).toBe('02 — Computation');
      expect(result?.steps[2].phase).toBe('03 — Verification');
      expect(result?.steps[3].phase).toBe('04 — Deployment');
    });

    it('Initialization フェーズのステップ数が食材数と一致する', () => {
      const ingredients = ['いちご', '砂糖', '卵'];
      const result = generateRecipe(ingredients);
      expect(result?.steps[0].steps).toHaveLength(ingredients.length);
    });

    it('各ステップが空でない文字列である', () => {
      const result = generateRecipe(['いちご', '生クリーム', '砂糖']);
      result?.steps.forEach((phase) => {
        phase.steps.forEach((step) => {
          expect(typeof step).toBe('string');
          expect(step.length).toBeGreaterThan(0);
        });
      });
    });

    it('Deployment フェーズが2ステップ（完了 + サーブ）を持つ', () => {
      const result = generateRecipe(['醤油']);
      expect(result?.steps[3].steps).toHaveLength(2);
    });
  });

  describe('食材ごとの独立性', () => {
    it('異なる食材は異なるレシピ名を生成する', () => {
      const a = generateRecipe(['いちご']);
      const b = generateRecipe(['醤油']);
      expect(a?.name).not.toBe(b?.name);
    });

    it('INGREDIENT_ALIASES にない食材名はそのままレシピに使用される', () => {
      const result = generateRecipe(['いちご']);
      // Initialization ステップに食材名が含まれる
      const initStep = result?.steps[0].steps[0];
      expect(initStep).toContain('いちご');
    });
  });
});

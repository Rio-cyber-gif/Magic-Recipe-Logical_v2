import { useState } from 'react';

// Ingredient options
const INGREDIENTS = [
  'いちご', '生クリーム', '醤油', 'バター', '砂糖', '卵', '小麦粉', '牛乳',
  '塩', 'コショウ', 'にんにく', '玉ねぎ', 'トマト', 'レモン', 'チーズ', 'ベーコン',
  '鶏肉', '豚肉', '牛肉', 'じゃがいも', 'にんじん', 'キャベツ', 'ほうれん草', '米',
  'パスタ', 'パン', '味噌', 'みりん', '酒', '酢', 'ごま油', 'オリーブオイル',
  '唐辛子', '生姜', 'ネギ', 'きのこ', 'なす', 'ピーマン', 'ブロッコリー', 'アボカド',
  'ツナ缶', '納豆', '豆腐', 'わかめ', '昆布', 'かつお節', 'チョコレート', 'はちみつ',
  'ヨーグルト', 'バニラ', 'シナモン', 'カレー粉', 'マヨネーズ', 'ケチャップ', 'ソース', 'ワイン'
];

const INGREDIENT_ALIASES: Record<string, string> = {
  'いちご': 'ストロベリー・ノード', '生クリーム': '乳脂肪エマルション', '醤油': 'アミノ酸ソリューション', 
  'バター': 'ソリッド・ファット', '砂糖': 'スクロース結晶体', '卵': 'オーバル・プロテイン', 
  '小麦粉': '精製ウィート・ダスト', '牛乳': 'カルシウム・リキッド', '塩': '塩化ナトリウム結晶', 
  'コショウ': 'ブラック・ペッパー・ダスト', 'にんにく': 'ガーリック・クラスタ', '玉ねぎ': 'オニオン・レイヤー', 
  'トマト': 'リコピン・スフィア', 'レモン': 'シトラス・アシッド', 'チーズ': '発酵カゼイン・ブロック', 
  'ベーコン': 'スモーク・ポーク・スライス', '鶏肉': 'Avianプロテイン', '豚肉': 'Porcineコンポーネント', 
  '牛肉': 'Bovineモジュール', 'じゃがいも': 'スターチ・ブロック', 'にんじん': 'βカロテン・コーン', 
  'キャベツ': '多層グリーン・リーフ', 'ほうれん草': 'アイアン・リーフ', '米': 'ライス・クラスター', 
  'パスタ': 'デュラム・ストリング', 'パン': '発酵ウィート・フォーム', '味噌': '発酵ソイ・ペースト', 
  'みりん': 'スイート・ライス・アルコール', '酒': 'ライス・ワイン・ソルベント', '酢': 'アセティック・アシッド', 
  'ごま油': 'セサミ・オイル', 'オリーブオイル': 'オリーブ・エキストラクト', '唐辛子': 'カプサイシン・エミッター', 
  '生姜': 'ジンジャー・ルート', 'ネギ': 'グリーン・シリンダー', 'きのこ': '菌糸体ノード', 
  'なす': 'パープル・シェル', 'ピーマン': 'グリーン・ベル', 'ブロッコリー': 'フラクタル・ツリー', 
  'アボカド': 'リッチ・ファット・グリーン', 'ツナ缶': '水圧式シー・プロテイン', '納豆': '発酵ソイ・スレッド', 
  '豆腐': 'ソリッド・ソイ・キューブ', 'わかめ': 'フレキシブル・シーウィード', '昆布': 'ケルプ・プレート', 
  'かつお節': 'スモーク・フィッシュ・フレーク', 'チョコレート': 'カカオ・マトリックス', 'はちみつ': 'ゴールデン・ネクター', 
  'ヨーグルト': 'プロバイオティクス・ゲル', 'バニラ': 'アロマ・エッセンス', 'シナモン': 'スパイス・バーク', 
  'カレー粉': 'イエロー・コンプレックス', 'マヨネーズ': 'エッグ・オイル・エマルション', 'ケチャップ': 'レッド・トマト・ペースト', 
  'ソース': 'ブラウン・ミクスチャー', 'ワイン': 'グレープ・ソリューション'
};

// Recipe name components
const RECIPE_PREFIXES = [
  'デュアルフェーズ', 'トリプルレイヤード', 'マルチスレッド', 'アシンクロナス', 'リアクティブ',
  'イベントドリブン', 'ステートフル', 'ステートレス', 'スケーラブル', 'フォールトトレラント',
  'ハイアベイラビリティ', 'ロードバランシング', 'ディストリビューテッド', 'マイクロサービス',
  'モノリシック', 'サーバーレス', 'クラウドネイティブ', 'コンテナライズド', 'オーケストレーテッド',
  'パイプライン', 'ストリーミング', 'バッチプロセス', 'リアルタイム', 'エンドツーエンド',
  'フルスタック', 'レイヤードアーキテクチャ', 'ヘキサゴナル', 'クリーンアーキテクチャ',
  'ドメイン駆動', 'テスト駆動', 'ビヘイビア駆動', 'データ駆動', 'メッセージ駆動'
];

const RECIPE_SUFFIXES = [
  '錬成プロトコル', 'コンパイルスキーマ', 'デプロイメントパターン', 'ビルドシーケンス',
  'プロセッシングフロー', 'トランザクション', 'アルゴリズム', 'アーキテクチャ',
  'フレームワーク', 'ミドルウェア', 'インフラストラクチャ', 'プラットフォーム',
  'エコシステム', 'パイプライン', 'ワークフロー', 'オーケストレーション',
  'レンダリングエンジン', 'ランタイム', 'コンパイラ', 'インタープリタ',
  '仮想マシン', 'コンテナ', 'クラスタ', 'ノード構成', 'メッシュネットワーク',
  'ゲートウェイ', 'プロキシ層', 'ファサード', 'アダプタ', 'ブリッジ構造'
];

// Word arrays for recipe generation
const ACTIONS = [
  'インスタンス化', 'デプロイ', 'コンパイル', 'ビルド', 'マージ', 'リファクタリング', 'スタック積載',
  'バッファリング', 'キャッシング', '並列処理', '非同期実行', 'イテレーション', 'ソート',
  'フィルタリング', 'マッピング', 'トランスパイル', 'パース', 'シリアライズ', 'エンコード',
  'ハッシュ化', '暗号化', 'デコード', '正規化', '最適化', 'プリロード', 'レンダリング',
  '仮想化', 'コンテナ化', 'オーケストレーション', 'スケーリング', 'ロードバランシング',
  'モニタリング', 'ログ記録', 'サニタイズ', 'バリデーション', 'トランザクション開始',
  'ロールバック準備', 'コミット', 'プッシュ', 'フェッチ', 'プル', 'リベース', 'チェックアウト',
  'ブランチ作成', 'タグ付け', 'アーカイブ', '解凍', '展開', '初期化', '起動', 'シャットダウン',
  'サスペンド', 'レジューム', 'リスタート', 'リロード', 'リフレッシュ', 'クリア', 'フラッシュ'
];

const METHODS = [
  '依存性注入法', 'ファクトリパターン', 'シングルトン化', 'イベント駆動設計', 'リアクティブ処理',
  'ストリーム処理', 'パイプライン構成', 'レイヤードアーキテクチャ', 'マイクロサービス分割',
  '関数型アプローチ', '宣言的記述', '命令的制御', '条件分岐', 'ループ展開', '再帰的深掘り',
  'メモ化技法', '遅延評価', '先行評価', 'ガベージコレクション', 'メモリプール確保',
  'スレッド分離', 'プロセス間通信', 'セマフォ制御', 'ミューテックス管理', 'デッドロック回避',
  'ポーリング監視', 'イベントループ待機', 'コールバック登録', 'プロミス連鎖', 'async/await構文',
  'ジェネレータ使用', 'プロキシ設定', 'デコレータ適用', 'ミドルウェア挿入', 'インターセプト',
  'フック実装', 'ライフサイクル管理', '状態機械設計', 'オブザーバー登録', 'パブリッシュ',
  'サブスクライブ', 'イベントエミット', 'シグナル送信', 'ブロードキャスト', 'ユニキャスト',
  'マルチキャスト', 'バッチ処理', 'チャンク分割', 'ページネーション', 'カーソル移動'
];

const STATES = [
  '半透明な状態', '結晶化した形態', '液状化した様相', '気化寸前の段階', 'ゲル化した質感',
  'エマルション状態', 'サスペンション形成', 'コロイド構造', '層状配置', '螺旋構造',
  '網目状組織', '粒状集合', '繊維状伸長', '球形凝集', '立方体配列', '六角形格子',
  '不規則散布', '均一混合', '不均一分散', '勾配形成', '界面張力下', '臨界点通過後',
  '準安定状態', '相転移中', '平衡到達', '非平衡維持', '動的平衡', '静的安定',
  '準定常流', '乱流域', '層流保持', 'ラミナー構造', 'タービュレント域', 'カオス的挙動',
  '周期的振動', '非周期変動', 'ランダムウォーク', '確率的分布', '決定論的配置', '確率的収束',
  '漸近的接近', '指数的増加', '対数的減衰', '線形推移', '非線形応答', 'ステップ変化',
  'インパルス応答', 'ランプ入力', '正弦波変調', '矩形波形成', '三角波生成', 'ノコギリ波出力'
];

const METRICS = [
  '273K', '293K', '373K', '473K', '200ms', '500ms', '1.2s', '3.5s', '10μm', '50μm',
  '100μm', '1mm', '5mm', '1cm', '5cm', '100ml', '200ml', '500ml', '1L', '3g', '10g',
  '50g', '100g', '500g', '1kg', 'pH 3.5', 'pH 5.0', 'pH 7.0', 'pH 9.0', '45%', '60%',
  '75%', '90%', '95%', '128 bit', '256 bit', '512 bit', '1024 次元', '50 dB', '60 dB',
  '80 dB', '100 dB', '0.1 MPa', '0.5 MPa', '1.0 MPa', '2000 rpm', '5000 rpm', '10000 rpm',
  '1 Hz', '50 Hz', '1 kHz', '10 kHz', '440 Hz', '0.5 mol/L', '1.0 mol/L', '2.0 mol/L'
];

const TOOLS = [
  'スパチュラ型インタフェース', 'ボウル型コンテナ', 'ミキサー型プロセッサ', 'フライパン型ヒートシンク',
  '鍋型リアクター', 'まな板型メモリ領域', '包丁型セグメンター', 'ザル型フィルタ', '計量カップ型メーター',
  'タイマー型クロック', '温度計型センサー', 'レンジ型エミッター', 'オーブン型コンパイラ',
  '冷蔵庫型ストレージ', '冷凍庫型アーカイブ', '蒸し器型バッファ', '圧力鍋型コンプレッサー',
  'ミル型パーサー', 'ブレンダー型マージャー', 'スライサー型スプリッター', 'ピーラー型ストリッパー',
  'おろし金型デグレーダー', 'フードプロセッサー型トランスフォーマー', '炊飯器型オートメーション',
  'ケトル型ボイラー', 'トースター型サーマルユニット', 'グリル型レンダラー', 'スケール型アナライザー',
  'スプーン型スクーパー', 'フォーク型ピッカー', 'トング型グリッパー', '泡立て器型エアレーター',
  'すり鉢型グラインダー', 'すりこぎ型アジテーター', '型抜き型テンプレート', '麺棒型ローラー'
];

const CONDITIONS = [
  '真空環境下', '大気圧環境', '加圧条件下', '減圧状態', '密閉系内', '開放系内',
  '断熱条件', '等温過程', '等圧変化', '定容積下', '定エントロピー', '可逆的過程',
  '不可逆過程', '平衡状態維持', '非平衡駆動', '外部場印加', '磁場中', '電場下',
  '重力場内', '無重力環境', '慣性系', '非慣性系', '回転座標系', '並進運動中',
  '振動環境', '静止状態', '層流条件', '乱流条件', '遷移領域', '境界層内',
  '自由表面', '固定境界', '周期境界条件', 'ノイマン境界', 'ディリクレ境界'
];

const VERIFICATIONS = [
  'レスポンスタイムが基準値以下であることを確認', '色相の収束を目視で検証',
  'テクスチャのハッシュ値が一致することを確認', '香りのスペクトル分析を実施',
  '温度勾配が許容範囲内であることをチェック', '粘度の対数値が理論値と一致することを確認',
  'エラーハンドリングが適切に機能しているか検証', 'ロールバックが可能な状態を維持',
  'ログ出力に異常値が含まれないことを確認', 'メモリリークが発生していないか監視',
  'スタックトレースに警告がないことを確認', 'コンソールに例外が出力されないことを検証',
  'パフォーマンスメトリクスが閾値を超えないことを確認', 'スループットが低下していないか観測',
  'レイテンシが増加傾向にないか確認', 'キャッシュヒット率が維持されているか検証'
];

const FINALIZATIONS = [
  '本番環境へデプロイ', '製品版としてリリース', 'プロダクションビルドを生成',
  'マスターブランチへマージ', 'バージョンタグを付与して公開', 'CDNへ配信',
  'エッジサーバーへ配置', 'グローバル展開を実行', 'A/Bテストを開始',
  'カナリアリリースを実施', 'ブルーグリーンデプロイメント', 'ローリングアップデート',
  'フィーチャーフラグを有効化', 'ダークローンチを実行', 'ソフトローンチを開始',
  '段階的ロールアウト', 'シャドウモード運用', 'パイロット運用開始', '限定公開リリース',
  '正式サービス開始', '一般提供開始', 'エンドユーザーへ配信'
];

interface RecipeStep {
  phase: string;
  steps: string[];
}

interface Recipe {
  name: string;
  steps: RecipeStep[];
}

function generateRecipe(ingredients: string[]): Recipe | null {
  if (ingredients.length === 0) return null;

  const seed = ingredients.join('').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const random = (index: number) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  const pick = <T,>(arr: T[], index: number): T => {
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
  finalSteps.push('食卓という本番環境にて、ユーザー（あなた）の感覚器官APIへリクエストを送信してください。');

  const steps = [
    { phase: '01 — Initialization', steps: initSteps },
    { phase: '02 — Computation', steps: computeSteps },
    { phase: '03 — Verification', steps: verifySteps },
    { phase: '04 — Deployment', steps: finalSteps }
  ];

  // Generate recipe name
  const aliasIngredients = ingredients.map(ing => INGREDIENT_ALIASES[ing] || ing);
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

  return {
    name: recipeName,
    steps
  };
}

export default function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);

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

  const handleShare = () => {
    const ingredients = selectedIngredients.join('・');
    const text = `Magic Recipe: Logical で錬成しました ✦\n「${recipe?.name}」\n\n使用食材：${ingredients}\n\n#MagicRecipeLogical`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setShowRecipe(false);
    setSelectedIngredients([]);
    setRecipe(null);
  };

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
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                日常の食材を、エンジニアリングの視点と少しの魔法で「論理的に錬成」する不思議な献立帖です。
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-foreground">
                  材料を選択（3つまで）
                </label>
                <p className="mb-4 text-sm text-muted-foreground">
                  選択中: {selectedIngredients.length}/3
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-80 overflow-y-auto p-1">
                  {INGREDIENTS.map((ingredient) => {
                    const isSelected = selectedIngredients.includes(ingredient);
                    const isDisabled = !isSelected && selectedIngredients.length >= 3;

                    return (
                      <button
                        key={ingredient}
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
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cast
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
                <h1 className="text-foreground leading-tight px-4">
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
                onClick={handleShare}
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
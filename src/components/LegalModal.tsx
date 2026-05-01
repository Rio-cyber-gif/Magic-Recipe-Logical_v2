interface LegalModalProps {
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-pink-950/30" />

      {/* モーダル本体 */}
      <div
        className="relative w-full max-w-lg bg-white/80 border border-white/30 border-l-4 border-l-white/80 rounded-3xl p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-muted-foreground hover:text-foreground transition-colors text-xl leading-none cursor-pointer"
          aria-label="閉じる"
        >
          ×
        </button>

        {type === 'terms' ? <TermsContent /> : <PrivacyContent />}
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-5 pr-2">
      <h2 className="text-foreground">利用規約</h2>
      <p className="text-xs text-muted-foreground">最終更新: 2026年4月</p>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">第1条　目的</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本アプリ「Magic Recipe Logical」（以下「本サービス」）は、入力された食材をもとにエンジニアリングのメタファーで構成された架空のレシピを生成するエンターテインメントサービスです。生成されるレシピは実際の調理を目的とするものではありません。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">第2条　禁止事項</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          利用者は以下の行為を行ってはなりません。
        </p>
        <ul className="text-sm text-foreground/80 leading-relaxed space-y-1 list-disc list-inside">
          <li>本サービスのソースコードの無断複製・改変・再配布</li>
          <li>本サービスを商用目的で利用すること</li>
          <li>本サービスの運営を妨害する行為</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">第3条　免責事項</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本サービスが生成するレシピは型安全ですが、実際の味の再現性については「未定義」とさせていただきます。生成されたレシピを実際に調理した結果について、開発者は一切の責任を負いません。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">第4条　知的財産権</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本サービスに関する著作権その他の知的財産権は開発者に帰属します。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">第5条　規約の変更</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          開発者は必要に応じて本規約を変更できるものとします。変更後の規約は本サービス上に掲示した時点で効力を生じます。
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-5 pr-2">
      <h2 className="text-foreground">プライバシーポリシー</h2>
      <p className="text-xs text-muted-foreground">最終更新: 2026年4月</p>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">収集する情報</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本サービスは、いかなる個人情報も収集・保存しません。入力された食材データはお使いのブラウザ上でのみ処理され、外部サーバーへ送信されることはありません。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">外部サービスとの通信</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本サービスは外部 API・データベース・アナリティクスツールを一切使用しません。「X でシェア」ボタンを押した場合のみ、X（旧Twitter）の外部サービスへ遷移します。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Cookie・ローカルストレージ</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本サービスは Cookie およびローカルストレージを使用しません。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">フォントの読み込み</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          表示フォント（M PLUS Rounded 1c）の読み込みに Google Fonts を使用しています。Google のプライバシーポリシーが適用される場合があります。
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">お問い合わせ</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          本ポリシーに関するご質問は、X（旧Twitter）のシェア機能経由でお知らせください。
        </p>
      </section>
    </div>
  );
}

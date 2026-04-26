# Teams Stamp Generator

Microsoft Teams向けのカスタムスタンプ / カスタム絵文字を、ブラウザ上で作成できる静的Webツールです。

テキストを入力し、フォント・色・背景・縁取り・アニメーションを調整して、Teamsで使いやすい正方形のPNG / GIF画像を作成できます。

## 主な機能

- テキスト入力
- リアルタイムプレビュー
- PNG保存
- GIF保存
- 背景透過
- 背景色 / 背景グラデーション
- 文字色 / 文字グラデーション
- 日本語向けフォント選択
- 字間・行間調整
- 横幅 / 縦幅の自動調整
- 文字の縁取り・影
- スタンプ全体の縁取り
- 簡易図形プリセット
- 軽量なGIFアニメーション

## 使い方

1. テキストを入力します。
2. フォント、文字サイズ、太字、文字色を調整します。
3. 必要に応じて、背景・縁取り・アニメーションなどのオプションを設定します。
4. プレビューを確認します。
5. `PNGで保存` または `GIFで保存` を押して画像を保存します。
6. 保存した画像をMicrosoft Teamsのカスタム絵文字 / スタンプとして登録します。

## Microsoft Teamsでの利用について

Microsoft Teamsでは、カスタム絵文字として画像ファイルをアップロードできます。

このツールはTeamsで使いやすいように、正方形のPNG / GIFを作成することを想定しています。

ただし、Teamsでのカスタム絵文字やスタンプの利用可否は、組織や管理者の設定によって異なる場合があります。職場や組織で使う場合は、所属組織のTeams利用ルールや社内ポリシーに従ってください。

## データの扱い

このツールは、入力されたテキストや生成画像を専用サーバーへ送信しません。

入力内容はブラウザ内でCanvasに描画され、PNG / GIFとして保存されます。

ただし、WebフォントやGIF生成ライブラリを読み込むため、ブラウザから外部サービスへアクセスします。外部サービス側には、一般的なWebアクセスと同様に、IPアドレス、User-Agent、リファラーなどの通信情報が送信される可能性があります。

## 利用ライブラリと外部通信先

このツールは専用バックエンドを持たない静的Webアプリです。

ただし、以下の外部サービスを利用します。

| 種別 | 用途 | 外部通信先 |
|---|---|---|
| Google Fonts CSS API | 日本語WebフォントのCSS読み込み | `https://fonts.googleapis.com` |
| Google Fonts font files | Webフォントファイルの読み込み | `https://fonts.gstatic.com` |
| gif.js | GIF生成ライブラリ本体の読み込み | `https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js` |
| gif.js worker | GIF生成用Workerの読み込み | `https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js` |

## ブラウザ標準機能

以下はブラウザ標準APIを使用しています。外部ライブラリではありません。

- Canvas API
- Blob / Object URL
- Web Worker
- `requestAnimationFrame`
- `Intl.Segmenter`

## フォントとライセンスについて

このツールで使用している日本語フォントは、Google Fonts経由で読み込まれます。

Google Fontsのフォントはオープンソースフォントとして提供されており、商用利用も可能と説明されています。

このツールではフォントファイルをリポジトリ内に同梱せず、Google Fonts CSS API経由で読み込んでいます。そのため、フォントファイルそのものをこのリポジトリで再配布していません。

### 現在利用している主なフォント

- M PLUS Rounded 1c
- Shippori Mincho
- Mochiy Pop One
- Zen Maru Gothic
- Yusei Magic
- Kaisei Decol
- RocknRoll One
- Rampart One
- Reggae One
- Hachi Maru Pop
- DotGothic16
- Zen Kurenaido
- Kiwi Maru
- Hina Mincho
- Kosugi Maru
- Sawarabi Gothic
- Stick
- Dela Gothic One
- Potta One
- Yomogi
- Noto Sans JP

## 生成画像の利用について

Google Fonts公式FAQでは、Google Fontsで作成した文字をビットマップ画像やベクター画像として加工・利用できる旨が説明されています。

そのため、このツールで作成したPNG / GIFスタンプをMicrosoft Teamsなどで利用することは、フォントライセンス上は基本的に問題になりにくい想定です。

ただし、次の内容については利用者自身で確認してください。

- 所属組織のTeams利用ルール
- カスタム絵文字 / スタンプの社内ポリシー
- 入力する文言、ロゴ、商標、キャラクター等の権利
- 機密情報や個人情報をスタンプ化しないこと

## gif.jsについて

GIF生成には `gif.js` を使用しています。

`gif.js` はMIT Licenseで提供されています。

このツールはCDN経由で `gif.js` と `gif.worker.js` を読み込みます。

## セキュリティ上の注意

- このツールにはログイン機能やサーバー保存機能はありません。
- 入力された文字列はHTMLとして挿入せず、Canvasへ描画します。
- 生成ファイル名には、ファイル名として危険な文字を除去する処理を入れています。
- APIキー、認証情報、社内資料、機密情報などをリポジトリやスタンプ内容に含めないでください。
- 外部CDNに依存するため、企業環境で利用する場合は、通信先の許可や社内ポリシーを確認してください。

## 公開サイト

GitHub Pagesで公開している場合、サイトURLは通常次の形式になります。

```text
https://<GitHubユーザー名>.github.io/<リポジトリ名>/
```

例:

```text
https://yourname.github.io/teams-stamp-generator/
```

GitHub上では、リポジトリの `Settings` → `Pages` から公開URLを確認できます。

## 利用状況の計測について

このサイトでは、利用状況の把握と改善のため Google Analytics を利用しています。  
ページの閲覧状況などの利用情報が、Cookie等を通じてGoogleに送信される場合があります。

主な外部通信先は以下です。

- `fonts.googleapis.com` / `fonts.gstatic.com`: Google Fonts
- `cdnjs.cloudflare.com`: GIF生成ライブラリ
- `www.googletagmanager.com`: Google Analyticsタグ
- `google-analytics.com`: Google Analyticsの計測通信

詳しくは、サイト下部のプライバシーポリシーをご確認ください。


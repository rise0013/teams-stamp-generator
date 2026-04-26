# Teamsスタンプジェネレーター

Microsoft Teams向けのカスタムスタンプ / カスタム絵文字を、ブラウザだけで作成する静的Webアプリです。  
GitHub Pagesに配置するだけで公開でき、専用サーバーは不要です。

## 概要

このツールでは、入力したテキストをもとに、Teams向けの正方形PNG / GIFスタンプを作成できます。  
画像生成はすべてユーザーのブラウザ内で行われます。

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

## ファイル構成

```text
teams-stamp-generator/
├─ index.html
├─ style.css
├─ main.js
└─ README.md
```

## ローカルでの使い方

### 簡易確認

`index.html` をブラウザで開くと利用できます。

ただし、ブラウザやセキュリティ設定によっては、GIF生成用のWorkerが正しく動かない場合があります。GIFまで確認する場合は、次のようにローカルサーバー経由で開くことを推奨します。

```bash
cd teams-stamp-generator
python3 -m http.server 8000
```

その後、ブラウザで次を開きます。

```text
http://localhost:8000/
```

## GitHub Pagesで公開する方法

### 1. リポジトリを作成する

GitHubで新しいリポジトリを作成します。

例:

```text
teams-stamp-generator
```

GitHub FreeでGitHub Pagesを使う場合、通常は公開リポジトリにするのが分かりやすいです。GitHub Pagesは静的サイトホスティングで、HTML / CSS / JavaScriptをリポジトリから公開できます。

### 2. ファイルをアップロードする

このフォルダ内の以下4ファイルを、リポジトリ直下にアップロードします。

```text
index.html
style.css
main.js
README.md
```

アップロード後、リポジトリ直下が次のようになっていればOKです。

```text
<repository root>/
├─ index.html
├─ style.css
├─ main.js
└─ README.md
```

### 3. GitHub Pagesを有効化する

GitHubのリポジトリ画面で、以下の順に設定します。

1. `Settings` を開く
2. 左メニューの `Pages` を開く
3. `Build and deployment` の `Source` を `Deploy from a branch` にする
4. `Branch` を `main` にする
5. `Folder` を `/root` にする
6. `Save` を押す

しばらくすると、以下のようなURLで公開されます。

```text
https://<GitHubユーザー名>.github.io/<リポジトリ名>/
```

例:

```text
https://yourname.github.io/teams-stamp-generator/
```

## 公開時の設定上の注意点

### リポジトリの公開範囲

GitHub Pagesサイトはインターネット上に公開されます。  
公開したくない情報、社内資料、秘密情報、APIキーなどはリポジトリに含めないでください。

### HTTPS

`github.io` ドメインのGitHub Pagesは通常HTTPSで配信されます。  
独自ドメインを設定する場合は、GitHub Pagesの `Enforce HTTPS` を有効にすることを推奨します。

### 独自ドメインを使う場合

独自ドメインを使う場合は、GitHub側でカスタムドメイン設定とDNS設定が必要です。  
ドメイン乗っ取り対策として、GitHubのドメイン検証も検討してください。

### 反映に時間がかかる場合

GitHub Pagesの設定後、公開URLが有効になるまで数分かかることがあります。  
404が出る場合は、以下を確認してください。

- `index.html` がリポジトリ直下にあるか
- Pagesの公開元が `main / root` になっているか
- 直近の変更がpushまたはアップロードされているか
- GitHub Actions / Pagesのビルドが失敗していないか

### 会社・職場で使う場合

職場環境では、以下の外部ドメインへのアクセスが制限されている場合があります。

- `fonts.googleapis.com`
- `fonts.gstatic.com`
- `cdnjs.cloudflare.com`

外部通信が制限されている場合、フォント読み込みやGIF生成ライブラリの読み込みに失敗する可能性があります。  
その場合は、フォントやGIFライブラリの自己ホスト化を検討してください。

## 利用ライブラリと外部通信先

このアプリは専用バックエンドを持ちません。  
ただし、ブラウザから以下の外部サービスへアクセスします。

| 種別 | 用途 | 外部通信先 |
|---|---|---|
| Google Fonts CSS API | 日本語WebフォントのCSS読み込み | `https://fonts.googleapis.com` |
| Google Fonts font files | Webフォントファイルの読み込み | `https://fonts.gstatic.com` |
| gif.js | GIF生成ライブラリ本体の読み込み | `https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js` |
| gif.js worker | GIF生成用Workerの読み込み | `https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js` |

### ブラウザ標準機能

以下はブラウザ標準APIを使用しています。外部ライブラリではありません。

- Canvas API
- Blob / Object URL
- Web Worker
- `requestAnimationFrame`
- `Intl.Segmenter`

## データの扱い

このアプリは、入力されたテキストや生成画像を専用サーバーへ送信しません。  
入力内容はブラウザ内でCanvasに描画され、PNG / GIFとして保存されます。

ただし、WebフォントやGIFライブラリを読み込むため、ブラウザは上記の外部通信先へアクセスします。  
外部サービス側には、一般的なWebアクセスと同様に、IPアドレス、User-Agent、リファラー等の通信情報が送信される可能性があります。

## フォントとライセンスについて

このアプリで使用している日本語フォントは、Google Fonts経由で読み込まれます。  
Google Fontsのフォントはオープンソースフォントとして提供されており、商用利用も可能と説明されています。

このアプリでは、フォントファイルをリポジトリ内に同梱せず、Google Fonts CSS API経由で読み込んでいます。  
そのため、フォントファイルそのものの再配布はしていません。

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

### 生成画像の利用について

Google Fonts公式FAQでは、Google Fontsで作成した文字をビットマップ画像やベクター画像として加工・利用できる旨が説明されています。  
そのため、このツールで作成したPNG / GIFスタンプをTeams等で使うことは、フォントライセンス上は基本的に問題になりにくい想定です。

ただし、以下は利用者側で確認してください。

- 会社・組織のTeams利用ルール
- カスタム絵文字 / スタンプの社内ポリシー
- 入力する文言・ロゴ・商標・キャラクター等の権利
- 機密情報や個人情報をスタンプ化しないこと

## gif.jsについて

GIF生成には `gif.js` を使用しています。  
`gif.js` はMIT Licenseで提供されています。

このアプリはCDN経由で `gif.js` を読み込んでいます。  
より厳密に外部依存を管理したい場合は、`gif.js` と `gif.worker.js` をリポジトリ内に配置して自己ホスト化してください。

## セキュリティ上の注意

- APIキーや秘密情報は置かないでください。
- ユーザー入力はHTMLとして挿入せず、Canvasへ描画する設計です。
- 生成ファイル名には、ファイル名として危険な文字を除去する処理を入れています。
- このアプリ自体にはログイン機能やサーバー保存機能はありません。
- 外部CDNに依存するため、企業環境で公開・利用する場合は、通信先の許可や社内ポリシーを確認してください。

## Microsoft Teams向けの注意

Microsoft Teamsのカスタム絵文字は、組織の設定や管理者ポリシーによって利用可否が変わる可能性があります。  
また、Teamsに登録する画像は正方形・軽量なファイルにしておくと扱いやすくなります。

このツールでは、PNG出力に加えてGIF出力も可能ですが、GIFはPNGより容量が大きくなりやすいため、Teamsに登録できない場合は以下を試してください。

- フレーム数を少なくする
- FPSを下げる
- 出力サイズを256px以下にする
- アニメーション効果を減らす

## ライセンス

このリポジトリ自体のライセンスは、公開者が必要に応じて設定してください。  
第三者に再利用・改変・再配布を許可したい場合は、`LICENSE` ファイルを追加して、MIT License等を明示することを推奨します。

## 免責

このツールは非公式のスタンプ生成ツールです。Microsoft TeamsおよびGoogle Fontsの公式サービスではありません。  
会社・組織で利用する場合は、所属組織のルールや管理者設定に従ってください。

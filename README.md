<p align="center">
  <a href="https://www.newt.so/">
    <img src="https://user-images.githubusercontent.com/3859812/155490725-80ed1f06-996e-407f-8f63-fd54f0acaf14.svg" alt="Newt" width="70" height="57" />
  </a>
</p>
<h3 align="center">
Newt's starter
</h3>
<p align="center">
  <a href="https://demo-newt-blog-starter-nextjs.vercel.app/">Demo</a> | <a href="https://www.newt.so/">Newt</a>
</p>

## 概要

**newt-blog-starter-nuxtjs**
<br />Newtを利用した1カラムのシンプルなブログ
<br />技術構成： Next.js, TypeScript

## 開発をはじめる

### Step1: Newtスペースをセットアップ

1. スペースを作成します
    - スペースUIDを控えておきましょう。スペースUIDは 管理画面URL（ `https://app.newt.so/{スペースUID}` ） もしくは スペース設定 > 一般 から確認できます。
2. Appを作成します
    - Appテンプレートから作成する場合、**Blog**を選択し「このテンプレートを追加」をクリックしてください。
    - スクラッチで作成する場合は、App名とAppUIDを設定して次のステップに進みます。
    - AppUIDを控えておきましょう。AppUIDは管理画面URL（ `https://app.newt.so/{スペースUID}/app/{AppUID}` ） または App設定 > 一般 から確認できます。
3. App設定から、Articleモデル, Categoryモデル, Authorモデルを作成します
    - Appテンプレートから作成した場合、すでにモデルが作成されているためこのステップは飛ばします
    - スクラッチで作成した場合は、[Newtスペースの構成](#Newtスペースの構成)に従ってAppとモデルを作成します
4. スペース設定 > APIキー からCDN APIトークンを作成します
    - スペース設定 > APIキー よりCDN APIトークンを作成します
    - 複製マークをクリックしてトークンをコピーしましょう
### Step2: .envファイルを書き換える

1. Step1で取得したスペースUID, AppUID, CDN APIトークンで環境変数を書き換えます

.envファイルのスペースUID, AppUID, CDN APIトークンを実際の値で書き換えます
```conf
NEXT_PUBLIC_NEWT_SPACE_UID=スペースID
NEXT_PUBLIC_NEWT_APP_UID=AppUID
NEXT_PUBLIC_NEWT_API_TOKEN=CDN APIトークン
NEXT_PUBLIC_NEWT_API_TYPE=cdn
NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID=article
NEXT_PUBLIC_NEWT_CATEGORY_MODEL_UID=category
NEXT_PUBLIC_PAGE_LIMIT=12
```
Next.jsにおける環境変数の扱いについては、[公式ドキュメント](https://nextjs.org/docs/basic-features/environment-variables)を参照してください。

### Step3: devサーバーを起動する

Yarnを使う

```bash
# 依存パッケージをインストール
$ yarn install

# localhost:3000でdevサーバーを起動
$ yarn dev
```

NPMを使う

```bash
# 依存パッケージをインストール
$ npm install

# localhost:3000でdevサーバーを起動
$ npm run dev
```

### Step4: Staticなサイトを生成して起動

```bash
# Staticなサイトを生成（SSG）
$ yarn build

# サーバーを起動
$ yarn start
```

## Newtスペースの構成

`Blog` appの中にArticle, Category, Authorの3つのモデルを作ります。

| App名（任意） | モデル名（モデルUID） |
| --- | --- |
| Blog | Article (`article`) |
|  | Category (`category`) |
|  | Author (`author`) |

### Article（`uid: article`）モデル

| フィールドID | フィールド名 | フィールドタイプ | オプション |
| --- | --- | --- | --- |
| title | タイトル | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| slug | スラッグ | テキスト | 必須フィールド |
| meta | メタ情報 | カスタムフィールド | |
| coverImage | カバー画像 | 画像 |  |
| body | 本文 | Markdown or リッチテキスト |  |
| categories | カテゴリ | 参照（Categoryモデル） | 複数値 |
| author | 著者 | 参照（Authorモデル） |  |

### Category（`uid: category`）モデル

| フィールドID | フィールド名 | フィールドタイプ | オプション |
| --- | --- | --- | --- |
| name | 名前 | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| slug | スラッグ | テキスト | 必須フィールド |

### Author（`uid: author`）モデル

| フィールドID | フィールド名 | フィールドタイプ | オプション |
| --- | --- | --- | --- |
| fullName | 名前 | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| profileImage | スラッグ | 画像 |  |
| introduction | 自己紹介 | Markdown or リッチテキスト |  |

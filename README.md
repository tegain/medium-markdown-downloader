# Medium Markdown Downloader

CLI tool to save Medium articles locally in Markdown format

## Installation

```shell
git clone git@github.com:tegain/medium-markdown-downloader.git

cd medium-markdown-downloader

npm install

npm run build
```

## Configuration

### Third-party Medium API

Create an account on [https://rapidapi.com/nishujain199719-vgIfuFHZxVZ/api/medium2/](https://rapidapi.com/nishujain199719-vgIfuFHZxVZ/api/medium2/)

> :warning: Please mind your billing and API usage quota.

Rename `.env.example` into `.env` and replace values as explained in the file. You can find the correct API values in the API endpoints playground. 

## Usage

### Getting help

```shell
 node --env-file .env build/main.js --help
```

### Download articles from list of articles IDs

```shell
 node --env-file .env build/main.js ids -i <article_id>,<article_id> -o <your/destination/directory>
```

### Download articles from a reading list ID

```shell
 node --env-file .env build/main.js list -i <list_id> -o <your/destination/directory>
```

### Download articles from a JSON file with a list of articles items

Here is a sample of JSON file structure:

```ts
interface DummyItem {
  // At least one of "id" and "url" is required
  id?: string;
  url?: string;
  // Bonus properties to create the .md file
  slug?: string
  title?: string
}
```

```json
[
  {
    "id": "e0b50bbbd740",
    "slug": "css-in-js-in-real-life"
  },
  {
    "url": "https://medium.com/p/always-pass-one-argument-to-your-javascript-function-4140d909937e",
    "id": "4140d909937e",
    "slug": "always-pass-one-argument-to-your-javascript-function"
  },
  {
    "url": "https://medium.com/p/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d",
    "id": "46e78d54af0d",
    "slug": "how-to-compensate-for-the-ios-viewport-unit-bug"
  },
  {
    "url": "https://medium.com/p/faster-web-c6823830ce72",
    "title": "Faster Web"
  }
]

```

```shell
 node --env-file .env build/main.js json -i <json/file/path.json> -o <your/destination/directory>
```
# Docker Spinup

For Spinning up the docker run the following command:

`docker compose -f "docker-compose.yml" up -d --build`

Open `localhost:3000` on the browser to view the charts.

`<u>**Note: In case, the app feels stuck, reload or clear cache. Cache, State and Session management are not yet implemented.</u>`

# Flask API

## Endpoints

* Endpoint: `/`
  `site-map` - Shows site-map of flask endpoints.
* Endpoint: `/get_transactions`
  `get_transactions` - Return JSON of count of all `SUCCESSFUL` transactions for last `last 1 year` by date
  Sample Response -
  ``[ { "TIME": "2021-12-24", "VALUE": 2831 }, { "TIME": "2021-12-25", "VALUE": 28320 }, { "TIME": "2021-12-26", "VALUE": 39688 }, { "TIME": "2021-12-27", "VALUE": 38923 }, { "TIME": "2021-12-28", "VALUE": 44054 },``
* Endpoint: `/get_feed`
  `get_feed` - Collates and returns all news posts from `cryptopanic.com` for `OP` currency
  Sample Response -
  ``[ { "created_at": "2022-12-23T19:09:15Z", "currencies": [ { "code": "OP", "slug": "optimism", "title": "Optimism", "url": "https://cryptopanic.com/news/optimism/" } ], "domain": "@optimismFND", "id": 17230061, "kind": "news", "published_at": "2022-12-23T19:09:15Z", "slug": "RT-OptimismGov-An-update-from-Optimism-Governance-as-we-head-in-to-the-holidays", "source": { "domain": "twitter.com", "path": "@optimismfnd", "region": "en", "title": "Optimism Twitter" }, "title": "RT @OptimismGov: An update from Optimism Governance as we head in to the holidays", "url": "https://cryptopanic.com/news/17230061/RT-OptimismGov-An-update-from-Optimism-Governance-as-we-head-in-to-the-holidays", "votes": { "comments": 0, "disliked": 0, "important": 0, "liked": 0, "lol": 0, "negative": 0, "positive": 0, "saved": 0, "toxic": 0 } }, { "created_at": "2022-12-23T18:26:35Z", "currencies": [ { "code": "OP", "slug": "optimism", "title": "Optimism", "url": "https://cryptopanic.com/news/optimism/" } ], "domain": "@optimismFND", "id": 17230062, "kind": "news", "published_at": "2022-12-23T18:26:35Z", "slug": "Happy-holidays-nerds-Twas-another-busy-week-here-at-Optimism-Theres-a-lot-to-cover-so-lets-jump-right-in-to-this-weeks-recap", "source": { "domain": "twitter.com", "path": "@optimismfnd", "region": "en", "title": "Optimism Twitter" }, "title": "Happy holidays nerds!\n\n'Twas another busy week here at Optimism.\n\nThere's a lot to cover, so let's jump right in to this week's recap!", "url": "https://cryptopanic.com/news/17230062/Happy-holidays-nerds-Twas-another-busy-week-here-at-Optimism-Theres-a-lot-to-cover-so-lets-jump-right-in-to-this-weeks-recap", "votes": { "comments": 0, "disliked": 0, "important": 0, "liked": 0, "lol": 0, "negative": 0, "positive": 0, "saved": 0, "toxic": 0 } } ]``
* Endpoint: `/get_price`
  `get_price` - Gets the price information of `OP` currency for `last 1 year` by date. Processess it to get `open, high, low, close` prices at day level.
  Sample Response -
  ``[ { "close": 1.24, "high": 1.3, "low": 1.24, "open": 1.3, "time": "2022-Aug-24" }, { "close": 1.17, "high": 1.27, "low": 1.17, "open": 1.24, "time": "2022-Aug-25" } ]``

## Serving

Flask App default server binds at `localhost:5000`

# React

## Charts

Two charts are prepared:

* `Transactions Chart` - Plots a line chart with legend for transaction counts by day.
* `Price Chart` - Plots a bar chart with legend for price movement as well as tickers.

## Serving

React Frontend App default server binds at `localhost:3000`


# Queries

Queries being used for getting data from `flipsidecrypto.xyz` are present in `queries` folder for reference:

`pyor_optimism_price_tracking.sql` and `pyor_optimism_daily_transaction_count.sql`

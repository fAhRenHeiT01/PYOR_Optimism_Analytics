from application import *
from flask import make_response, url_for
import requests
import pandas as pd
from datetime import datetime

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/")
def site_map():
    """
    Site-map for available APIs.
    """
    links = []
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))

    return make_response(links)


@app.route('/get_transactions', methods=['GET', 'OPTIONS'])
def get_transactions():
    # TODO: Can add exponential back-off for retries, in case not res.ok

    res = requests.get(f"https://api.flipsidecrypto.com/api/v2/queries/{config['app']['transaction_token']}/data/latest")
    if res.ok:
        response = make_response(res.json())
    else:
        response = make_response({})
    
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/get_feed', methods=['GET', 'OPTIONS'])
def get_feed():
    # TODO: Bonus Requirement seems vague
    res = requests.get(f"https://cryptopanic.com/api/v1/posts/?auth_token={config['app']['cryptopanic_token']}&currencies=OP")
    final_res = []

    while True:
        res = res.json()
        final_res.extend(res['results'])
        if res['next']:
            res = requests.get(res['next'])
        else:
            break

    response = make_response(final_res)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/get_price', methods=['GET', 'OPTIONS'])
def get_price():

    res = requests.get(f"https://api.flipsidecrypto.com/api/v2/queries/{config['app']['price_token']}/data/latest")
    if res.ok:
        df = pd.read_json(res.content, orient='records')
        df.sort_values(by='DAY', ascending=True, inplace=True)
        df['time'] = pd.to_datetime(df['DAY']).dt.date
        df['open'] = df.groupby('time')['PRICE'].transform('first')
        df['close'] = df.groupby('time')['PRICE'].transform('last')
        df['high'] = df.groupby('time')['PRICE'].transform('max')
        df['low'] = df.groupby('time')['PRICE'].transform('min')
        df.drop(columns=['DAY', 'PRICE'], inplace=True)
        df = df.groupby('time').first().reset_index()

        df['time'] = df['time'].apply(lambda x: datetime.strftime(x, '%Y-%b-%d'))

        response = make_response(json.loads(df.to_json(orient='records')))
    else:
        response = make_response({})
    
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
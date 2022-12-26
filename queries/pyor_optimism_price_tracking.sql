select tbl.hour as day, tbl.price
  from optimism.core.fact_hourly_token_prices as tbl where tbl.symbol='OP'
  AND TO_DATE(tbl.hour) > DATEADD(YEAR, -1, GETDATE())
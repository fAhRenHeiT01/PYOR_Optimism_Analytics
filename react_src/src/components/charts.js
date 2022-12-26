import { createChart, CrosshairMode } from 'lightweight-charts';
import { useRef, useEffect } from 'react';

export const LineChartComponent = props => {
	const {
		data
	} = props;
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const chart = createChart(chartContainerRef.current, {
        layout: {
            background: { color: '#222' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
        width: 600,
        height: 400
      });
      chart.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.3, // leave some space for the legend
            bottom: 0.25,
          },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
            horzLine: {
              visible: false,
              labelVisible: false,
            },
        },
        // hide the grid lines
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
      });
			chart.timeScale().fitContent();

			const areaSeries = chart.addAreaSeries({
        lastValueVisible: false,
        crosshairMarkerVisible: false,
        lineColor: 'transparent',
        topColor: 'rgba(107, 202, 226,0.6)',
        bottomColor: 'rgba(107, 202, 226, 0.05)',
      });

      const lineSeries = chart.addLineSeries({
        color: 'rgb(107, 202, 226)',
      });

      lineSeries.setData(data);
			areaSeries.setData(data);

      const symbolName = 'OPTIMISM TRANSACTIONS';
      const container = chartContainerRef.current;

      const legend = document.createElement('div');
      legend.style = `position: absolute; left: 12px; top: 12px; z-index: 1; font-size: 14px; font-family: sans-serif; line-height: 18px; font-weight: 300;`;
      legend.style.color = 'black';
      container.appendChild(legend);

      if(data.length){
        const getLastBar = () => data[data.length - 1];
        const buildDateString = time => `${time.year}-${time.month}-${time.day}`;
        const formatTransactions = transactions => (Math.round(transactions * 100) / 100).toFixed(2);
        const setTooltipHtml = (name, date, transactions) => {
          legend.innerHTML = `<div style="font-size: 20px; margin: 4px 0px; color:white">${name}</div><div style="font-size: 16px; margin: 4px 0px; color:white">[${date},&nbsp;&nbsp;#${~~transactions}]</div>`;
        };

        const updateLegend = param => {
          const validCrosshairPoint = !(
            param === undefined || param.time === undefined || param.point.x < 0 || param.point.y < 0
          );
          const bar = validCrosshairPoint ? param : getLastBar();
          const time = bar.time;
          const date = buildDateString(time);
          const price = validCrosshairPoint ? param.seriesPrices.get(lineSeries) : bar.value;
          const formattedTransactions = formatTransactions(price);
          setTooltipHtml(symbolName, date, formattedTransactions);
        };

        chart.subscribeCrosshairMove(updateLegend);

        updateLegend(undefined);
      }

      chart.timeScale().fitContent();


			return () => {
        chart.remove();
			};
		},
		[data]
	);

	return (
		<div style={{position: 'relative'}}
			ref={chartContainerRef}
		></div>
	);
};

export const BarChartComponent = props => {
	const {
		data
	} = props;
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { color: '#222' },
                    textColor: '#DDD',
                },
                grid: {
                    vertLines: { color: '#444' },
                    horzLines: { color: '#444' },
                },
                width: 600,
                height: 400
            });

      chart.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.3, // leave some space for the legend
            bottom: 0.25,
          },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
            horzLine: {
              visible: false,
              labelVisible: false,
            },
        },
        // hide the grid lines
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
      });
        chart.timeScale().fitContent();

        const series = chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });

        series.setData(data);

        if (data.length){
            const datesForMarkers = [data[data.length - 39], data[data.length - 19]];
            let indexOfMinPrice = 0;
            for (let i = 1; i < datesForMarkers.length; i++) {
                if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
                    indexOfMinPrice = i;
                }
            }

            const markers = [
                {
                    time: data[data.length - 48].time,
                    position: 'aboveBar',
                    color: '#f68410',
                    shape: 'circle',
                    text: 'D',
                },
            ];
            for (let i = 0; i < datesForMarkers.length; i++) {
                if (i !== indexOfMinPrice) {
                    markers.push({
                        time: datesForMarkers[i].time,
                        position: 'aboveBar',
                        color: '#e91e63',
                        shape: 'arrowDown',
                        text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2),
                    });
                } else {
                    markers.push({
                        time: datesForMarkers[i].time,
                        position: 'belowBar',
                        color: '#2196F3',
                        shape: 'arrowUp',
                        text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2),
                    });
                }
            }
            series.setMarkers(markers);

            chart.timeScale().fitContent();
        }

      const symbolName = 'OPTIMISM PRICE';
      const container = chartContainerRef.current;

      const legend = document.createElement('div');
      legend.style = `position: absolute; left: 12px; top: 12px; z-index: 1; font-size: 14px; font-family: sans-serif; line-height: 18px; font-weight: 300;`;
      container.appendChild(legend);

      if(data.length){
        const getLastBar = () => data[data.length - 1];
        const buildDateString = time => `${time.year}-${time.month}-${time.day}`;
        const formatTransactions = transactions => (Math.round(transactions * 100) / 100).toFixed(2);
        const setTooltipHtml = (name, date, high, low, open, close) => {
          legend.innerHTML = `<div style="font-size: 20px; margin: 4px 0px; color:white">${name}</div><div style="font-size: 16px; margin: 4px 0px; color:white">${date}<br>[ Open: $${open} | Close: $${close} | High: $${high} | Low: $${low} ]</div>`;
        };

        const updateLegend = param => {
          const validCrosshairPoint = !(
            param === undefined || param.time === undefined || param.point.x < 0 || param.point.y < 0
          );
          const bar = validCrosshairPoint ? param : getLastBar();
          const time = bar.time;
          const date = buildDateString(time);
          const price = validCrosshairPoint ? param.seriesPrices.get(series) : bar;
          const [high, low, open, close] = [formatTransactions(price.high), formatTransactions(price.low), formatTransactions(price.open), formatTransactions(price.close)];
          setTooltipHtml(symbolName, date, high, low, open, close);
        };

        chart.subscribeCrosshairMove(updateLegend);

        updateLegend(undefined);
      }

      chart.timeScale().fitContent();


			return () => {
        chart.remove();
			};
		},
		[data]
	);

	return (
		<div style={{position: 'relative'}}
			ref={chartContainerRef}
		></div>
	);
};
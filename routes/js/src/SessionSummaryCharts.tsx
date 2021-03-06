import React from 'react';
import { Scatter, Bar } from 'react-chartjs-2'
import { ChartData, Chart } from 'chart.js';
import { PageState, getXValues, getScales } from './funcs';
import { AUChart } from './AUChart';
import 'chartjs-plugin-annotation';

const clone = require('rfdc')()

Chart.defaults.global.defaultFontSize = 22
interface SessionSummaryChartsProps {
    pageState: PageState
    genoptions: any
    divergingoptions: any
    selection: number
    alter_transcript: (labels: number[]) => (element: any) => void
}

export default function SessionSummaryCharts(props: SessionSummaryChartsProps) {
    const ly = "#b9bb3b"
    const lb = "rgba(33, 161, 255, 1)"
    const by = "rgba(211, 212, 119, 0.3)"
    const bb = "rgba(33, 161, 255, 0.3)"
    const ratio = 0.44
    const textChartData = (canvas: any) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, ly);
        gradient.addColorStop(ratio, ly);
        gradient.addColorStop(ratio, lb);
        gradient.addColorStop(1, lb);
        const bgradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        bgradient.addColorStop(0, by)
        bgradient.addColorStop(ratio, by)
        bgradient.addColorStop(ratio, bb)
        bgradient.addColorStop(1, bb)
        return {
            datasets: [
                {
                    label: "Text Sentiment",
                    data: props.pageState.textsentiment,
                    borderColor: gradient,
                    pointBorderColor: gradient,
                    backgroundColor: bgradient,
                    showLine: true,
                    lineTension: 0.22
                }
            ]
        }
    }

    const smoothtextChartData = (canvas: any) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, ly);
        gradient.addColorStop(ratio, ly);
        gradient.addColorStop(ratio, lb);
        gradient.addColorStop(1, lb);
        const bgradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        bgradient.addColorStop(0, by)
        bgradient.addColorStop(ratio, by)
        bgradient.addColorStop(ratio, bb)
        bgradient.addColorStop(1, bb)
        return {
            datasets: [
                {
                    label: "Text Sentiment",
                    data: props.pageState.smoothtext,
                    borderColor: gradient,
                    pointBorderColor: gradient,
                    backgroundColor: bgradient,
                    showLine: true,
                    lineTension: 0.22
                }
            ]
        }
    }

    return (<div style={{ overflow: 'auto', height: 350, maxWidth: 900, margin: 'auto' }}>
        {
            props.selection == 0 &&
            <Scatter
                data={props.pageState.emotiondata}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Probability (%)", 0, 100) })}
                width={900}
                height={350}
                getElementAtEvent={props.alter_transcript(getXValues(props.pageState.emotiondata))} />
        }
        {
            props.selection == 1 &&
            <div>
                <Scatter
                    data={(canvas: any) => {
                        const gradient = canvas.getContext("2d").createLinearGradient(0, 0, canvas.width, 0)
                        gradient.addColorStop(0, "#47CDD5");
                        gradient.addColorStop(1, "#d3d477");
                        return {
                            datasets: [{
                                label: "Average Text Sentiment",
                                data: [{ x: -1, y: 1 }, { x: 1, y: 1 }], backgroundColor: gradient, showLine: true
                            }]
                        }
                    }}
                    options={props.pageState.avgtextoptions}
                    width={900}
                    height={125}
                />
                <Bar
                    data={props.pageState.aggremotiondata}
                    options={{ scales: { yAxes: [{ scaleLabel: { display: true, labelString: "Percent (%)" }, ticks: { max: 100 } }] } }}
                    width={900}
                    height={350} />
            </div>
        }
        {
            props.selection == 2 &&
            <Scatter
                data={textChartData}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Negative to Positive Text Sentiment", -1, 1) })}
                width={900}
                height={350}
                getElementAtEvent={props.alter_transcript(props.pageState.textlabels)} />
        }
        {
            props.selection == 3 &&
            <Scatter
                data={props.pageState.smoothemotiondata}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Probability (%)", 0, 100) })}
                width={900}
                height={350}
                getElementAtEvent={props.alter_transcript(getXValues(props.pageState.smoothemotiondata))} />
        }
        {
            props.selection == 4 &&
            <Scatter
                data={smoothtextChartData}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Negative to Positive Text Sentiment", -1, 1) })}
                width={900}
                height={350}
                getElementAtEvent={props.alter_transcript(props.pageState.smoothtextlabels)} />
        }
        {
            props.selection == 5 &&
            <Scatter
                data={props.pageState.audata}
                options={Object.assign({}, props.genoptions, { scales: getScales("Intensity", 0, 5) })}
                width={900}
                height={350}
                getElementAtEvent={props.alter_transcript(getXValues(props.pageState.audata))} />
        }
        {
            props.selection == 6 &&
            <AUChart
                auanomData={props.pageState.auanomdata}
                auanomOpts={Object.assign({}, props.genoptions, { scales: getScales("Intensity", 0, 5) })}
                auanomPointColors={props.pageState.auanompointscolors}
                func={props.alter_transcript(props.pageState.auanomdata[0].map(element => element.x))}
            />
        }
    </div>)

}

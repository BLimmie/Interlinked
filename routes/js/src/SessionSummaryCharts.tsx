import React from 'react';
import { Scatter, Bar } from 'react-chartjs-2'
import { ChartData } from 'chart.js';
import { getXValues, getScales } from './funcs';
import { AUChart } from './AUChart';
import 'chartjs-plugin-annotation';

interface SessionSummaryChartsProps {
    emotiondata: ChartData
    aggremotiondata: ChartData
    textdata: ChartData
    smoothemotiondata: ChartData
    smoothtextdata: ChartData
    audata: ChartData
    auanomdata: Array<any>[]
    genoptions: any
    divergingoptions: any
    avgtextoptions: any
    textlabels: number[]
    smoothtextlabels: number[]
    auanompointscolors: string[][]
    selection: number
    alter_transcript: (labels: number[]) => (element: any) => void
}

export const SessionSummaryCharts: React.SFC<SessionSummaryChartsProps> = (props) => {

    return (<div style={{ overflow: 'auto', height: 400, maxWidth: 900, margin: 'auto' }}>
        {
            props.selection == 0 &&
            <Scatter
                data={props.emotiondata}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Probability (%)", 0, 100) })}
                width={900}
                height={400}
                getElementAtEvent={props.alter_transcript(getXValues(props.emotiondata))} />
        }
        {
            props.selection == 1 &&
            <div>
                <Scatter
                    data={(canvas: any) => {
                        const gradient = canvas.getContext("2d").createLinearGradient(0, 0, canvas.width, 0)
                        gradient.addColorStop(0, "#47CDD5");
                        gradient.addColorStop(1, "#E6D725");
                        return {
                            datasets: [{
                                label: "Average Text Sentiment",
                                data: [{ x: -1, y: 1 }, { x: 1, y: 1 }], backgroundColor: gradient, showLine: true
                            }]
                        }
                    }}
                    options={props.avgtextoptions}
                    width={900}
                    height={125}
                />
                <Bar
                    data={props.aggremotiondata}
                    options={{ scales: { yAxes: [{ scaleLabel: { display: true, labelString: "Percent (%)" } }] } }}
                    width={900}
                    height={400} />
            </div>
        }
        {
            props.selection == 2 &&
            <Scatter
                data={props.textdata}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Negative to Positive Text Sentiment", -1, 1) })}
                width={900}
                height={400}
                getElementAtEvent={props.alter_transcript(props.textlabels)} />
        }
        {
            props.selection == 3 &&
            <Scatter
                data={props.smoothemotiondata}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Probability (%)", 0, 100) })}
                width={900}
                height={400}
                getElementAtEvent={props.alter_transcript(getXValues(props.smoothemotiondata))} />
        }
        {
            props.selection == 4 &&
            <Scatter
                data={props.smoothtextdata}
                options={Object.assign({}, props.divergingoptions, { scales: getScales("Negative to Positive Text Sentiment", -1, 1) })}
                width={900}
                height={400}
                getElementAtEvent={props.alter_transcript(props.smoothtextlabels)} />
        }
        {
            props.selection == 5 &&
            <Scatter
                data={props.audata}
                options={Object.assign({}, props.genoptions, { scales: getScales("Intensity", 0, 5) })}
                width={900}
                height={400}
                getElementAtEvent={props.alter_transcript(getXValues(props.audata))} />
        }
        {
            props.selection == 6 &&
            <AUChart
                auanomData={props.auanomdata}
                auanomOpts={Object.assign({}, props.genoptions, { scales: getScales("Intensity", 0, 5) })}
                auanomPointColors={props.auanompointscolors}
                func={props.alter_transcript(props.auanomdata[0].map(element => element.x))}
            />
        }
    </div>)

}

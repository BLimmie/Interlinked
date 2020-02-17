import React from 'react';
import { Scatter } from 'react-chartjs-2'
import { ChartData } from 'chart.js';
import 'chartjs-plugin-annotation';

interface AUChartProps {
    auanomData: Array<any>[]
    auanomPointColors: Array<string>[]
    auanomOpts: any
    func: (any: any) => void
}

export const AUChart: React.SFC<AUChartProps> = (props) => {

    const auTypes = ["Blink", "BrowLowerer", "CheekRaiser", "ChinRaiser", "Dimpler", "InnerBrowRaiser", "JawDrop", "LidTightener", "LipCornerDepressor", "LipCornerPuller", "LipStretcher", "LipTightener", "LipsPart", "NoseWrinkler", "OuterBrowRaiser", "UpperLidRaiser", "UpperLipRaiser"]
    const charts = []
    const getData = (data: Array<any>, pointColors: Array<string>, index: number) => {
        return {
            datasets: [
                {
                    label: auTypes[index],
                    data: data,
                    pointBackgroundColor: pointColors,
                    pointBorderColor: pointColors,
                    borderColor: "rgba(33, 161, 255, 1)",
                    backgroundColor: "rgba(33, 161, 255, 0.4)",
                    showLine: true
                }
            ]
        } as ChartData
    }
    const getComponent = (index: number) => {
        return (
            <Scatter
                data={getData(props.auanomData[index], props.auanomPointColors[index], index)}
                options={props.auanomOpts}
                height={70}
                getElementAtEvent={props.func} />
        )
    }
    for (let ii = 0; ii < 17; ii++) {
        charts.push(getComponent(ii))
    }

    return (
        <div>
            {charts}
        </div>
    )
}

import React, { RefObject } from 'react';
import { Line } from 'react-chartjs-2'
import { Grid, Box } from '@material-ui/core'
import AUs, { AUInterface, noAus } from './AUs'

export interface EmotionsInterface {
	anger: string
	joy: string,
	sorrow: string,
	surprise: string
}

export interface serverResponse {
	emotions: EmotionsInterface
	aus: AUInterface
}

const zeroEmotions: EmotionsInterface = {
	anger: "VERY_UNLIKELY",
	joy: "VERY_UNLIKELY",
	sorrow: "VERY_UNLIKELY",
	surprise: "VERY_UNLIKELY"
}

export const zeroValueResponse: serverResponse = {
	emotions: zeroEmotions,
	aus: noAus
}

const backgroundEmotionColor = ['#d26363', '#d2d263', '#6868c6', '#d29e63']
const backgroundBorderColor = ['#bd5959', '#bdbd59', '#5e5eb3', '#bd8f59']
const emotionLabels = ['Anger', 'Joy', 'Sorrow', 'Surprise']

const labelFontColor = { labels: emotionLabels, fontColor: 'rgb(110, 107, 122)' }
const legendOpts = { display: true, fullWidth: true, reverse: false, labels: labelFontColor }

const options = {
	scales: {
		xAxes: [{
			scaleLabel: {
				display: true,
				labelString: "Time"
			},
			ticks: {
				display: false
			}
		}],
		yAxes: [
			{
				display: false,
				ticks: {
					beginAtZero: true
				},
				stacked: true
			}
		]
	}
};


interface EmotionProps {
	response: serverResponse
}

const likelihoodToNumber = (emotions: EmotionsInterface): number[] => {
	const emotionValues: number[] = []

	if(emotions)
	  for (let emotionValue of Object.values(emotions)) {
		if(emotionValue === "VERY_UNLIKELY")
			emotionValues.push(0)
		else if (emotionValue === "UNLIKELY")
			emotionValues.push(25)
		else if (emotionValue === "POSSIBLE")
			emotionValues.push(50)
		else if (emotionValue === "LIKELY")
			emotionValues.push(75)
		else // VERY_LIKELY
			emotionValues.push(100)
	}

	return emotionValues
}

const anger_history = [0, 0, 0, 0, 0]
const joy_history = [0, 0, 0, 0, 0]
const sorrow_history = [0, 0, 0, 0, 0]
const surprise_history = [0, 0, 0, 0, 0]
const labels = ["4", "3", "2", "1", "0"]

export default function Emotions(props: EmotionProps) {
	const { response } = props
	const [emotions, setEmotions] = React.useState<EmotionsInterface>(response.emotions)
	const lineRef: RefObject<Line> = React.createRef()

	React.useEffect(() => {
		setEmotions(response.emotions)
		const emotionValues = likelihoodToNumber(response.emotions)

		anger_history.unshift(emotionValues[0])
		anger_history.pop()
		joy_history.unshift(emotionValues[1])
		joy_history.pop()
		sorrow_history.unshift(emotionValues[2])
		sorrow_history.pop()
		surprise_history.unshift(emotionValues[3])
		surprise_history.pop()
		labels.unshift(labels.length.toString())
		labels.pop()
		lineRef.current?.chartInstance.update()

	}, [response.emotions])

	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justify='center'
		>
			<Grid item xs={12}>
				<Line
					ref={lineRef}
					data={() => ({
						labels: labels,
						datasets: [{
							label: "Anger",
							lineTension: 0,
							data: anger_history,
							backgroundColor: backgroundEmotionColor[0],
							borderColor: backgroundBorderColor[0],
							borderWidth: 1,
							stacked: true
						},
						{
							label: "Joy",
							lineTension: 0,
							data: joy_history,
							backgroundColor: backgroundEmotionColor[1],
							borderColor: backgroundBorderColor[1],
							borderWidth: 1,
							stacked: true
						},
						{
							label: "Sorrow",
							lineTension: 0,
							data: sorrow_history,
							backgroundColor: backgroundEmotionColor[2],
							borderColor: backgroundBorderColor[2],
							borderWidth: 1,
							stacked: true
						},
						{
							label: "Surprise",
							lineTension: 0,
							data: surprise_history,
							backgroundColor: backgroundEmotionColor[3],
							borderColor: backgroundBorderColor[3],
							borderWidth: 1,
							stacked: true
						}],
					})}
					legend={legendOpts}
					options={options}
					height={282}
				/>
			</Grid>
			<Grid item>
				<Box height={"63vh"} width={"23vw"} bgcolor="#cac7d6">
					<div style={{ paddingTop: "2vh" }} >
						<AUs AUs={response.aus} />
					</div>
				</Box>
			</Grid>

		</Grid>
	)
}

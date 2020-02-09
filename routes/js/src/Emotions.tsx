import React from 'react';
import {Bar} from 'react-chartjs-2'
import { Grid, Box } from '@material-ui/core'
import AUs, { AUInterface, noAus } from './AUs'

export interface EmotionsInterface {
  anger: string
  joy:string,
  sorrow:string,
  surprise:string
}

export interface serverResponse {
  emotions: EmotionsInterface
  aus: AUInterface
}

const zeroEmotions : EmotionsInterface = {
  anger: "VERY_UNLIKELY",
  joy: "VERY_UNLIKELY",
  sorrow:"VERY_UNLIKELY",
  surprise: "VERY_UNLIKELY"
}

export const zeroValueResponse : serverResponse = {
  emotions: zeroEmotions,
  aus: noAus
}

const backgroundEmotionColor = [ '#d2d263', '#6868c6','#d26363', '#d29e63']
const backgroundBorderColor = [ '#bdbd59', '#5e5eb3', '#bd5959', '#bd8f59']
const emotionLabels = ['Anger', 'Joy', 'Sorrow', 'Surprise']

const labelFontColor = { fontColor: 'rgb(110, 107, 122)' }
const legendOpts = { display: false, fullWidth: true, reverse: false, labels: labelFontColor }


interface EmotionProps {
    response: serverResponse
}

const likelihoodToNumber = (emotions: EmotionsInterface) : number[] => {
	const emotionValues : number[] = []

	for (let emotionValue of Object.values(emotions)) {
		if(emotionValue === "VERY_UNLIKELY")
			emotionValues.push(0)
		else if(emotionValue === "UNLIKELY")
			emotionValues.push(25)
		else if(emotionValue === "POSSIBLE")
			emotionValues.push(60)
		else if(emotionValue === "LIKELY")
			emotionValues.push(75)
		else // VERY_LIKELY
			emotionValues.push(100)
	}
	return emotionValues
}



export default function Emotions(props: EmotionProps) {
	const {response} = props
	const [emotions, setEmotions] = React.useState<EmotionsInterface>(response.emotions)
	
	const emotionValues = likelihoodToNumber(emotions)

	React.useEffect(() => {
        setEmotions(response.emotions)
    }, [response.emotions])

	return (
		<Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
        >
          <Grid item xs = {12}>
	        <Bar 
		        data={() => ({
		          datasets: [{
		            data: emotionValues,
		            backgroundColor: backgroundEmotionColor,
		            borderColor: backgroundBorderColor,
		            borderWidth: 1
		          }],
		          labels: emotionLabels,
		          })}
		       legend={legendOpts} 
		       height={282}
		    />
          </Grid>
          <Grid item>
            <Box height={"63vh"} width={"23vw"} bgcolor="#cac7d6">
              <div style={{paddingTop: "2vh"}} >
                <AUs AUs={response.aus} />
              </div>
            </Box>
          </Grid>
          
        </Grid>
	)
}

import React from 'react';
import { ThemeProvider, createMuiTheme, Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

const AU_theme = createMuiTheme({
    palette: {
      primary: {
        main: '#5f587d',
      },
      secondary: {
        main: '#dddce7'
      }
    },
    typography: {
      fontSize: 18,
    }
  });

export interface AUInterface {
    Blink: number
    BrowLowerer: number
    CheekRaiser: number
    ChinRaiser: number
    Dimpler: number
    InnerBrowRaiser: number
    JawDrop: number
    LidTightener: number
    LipCornerDepressor: number
    LipCornerPuller: number
    LipStretcher: number
    LipTightener: number
    LipsPart: number
    NoseWrinkler: number
    OuterBrowRaiser: number
    UpperLidRaiser: number
    UpperLipRaiser: number
}

export const noAus: AUInterface = {
    Blink: 0,
    BrowLowerer: 0,
    CheekRaiser: 0,
    ChinRaiser: 0,
    Dimpler: 0,
    InnerBrowRaiser: 0,
    JawDrop: 0,
    LidTightener: 0,
    LipCornerDepressor: 0,
    LipCornerPuller: 0,
    LipStretcher: 0,
    LipTightener: 0,
    LipsPart: 0,
    NoseWrinkler: 0,
    OuterBrowRaiser: 0,
    UpperLidRaiser: 0,
    UpperLipRaiser: 0,
}

interface DisplayAUProps {
    AUType: string
    AUNumber: number
}

function DisplayAU(props: DisplayAUProps) {
    const { AUType, AUNumber } = props
    const color = AUNumber > 1 ? "primary" : "secondary"

    return (
        <ThemeProvider theme={AU_theme}>
            <Typography variant="body1" color={color} align="center">
                {AUType}
            </Typography>
        </ThemeProvider>
    )
}

interface AUsInterface {
    AUs: AUInterface
}

export default function AUs(props: AUsInterface) {
    const {AUs} = props
    const [aus, setAus] = React.useState<AUInterface>(AUs)

    React.useEffect(() => {
        setAus(AUs)
    }, [AUs])

    return (
        <Container maxWidth="lg">
          <DisplayAU AUNumber={aus.UpperLidRaiser} AUType={"Upper Lid Raiser"}/>
          <DisplayAU AUNumber={aus.LidTightener} AUType={"Lid Tightener"}/>
          <DisplayAU AUNumber={aus.InnerBrowRaiser} AUType={"Inner Brow Raiser"}/>
          <DisplayAU AUNumber={aus.OuterBrowRaiser} AUType={"Outer Brow Raiser"}/>
          <DisplayAU AUNumber={aus.BrowLowerer} AUType={"Brow Lowerer"}/>
          <DisplayAU AUNumber={aus.Blink} AUType={"Blink"}/>
          <DisplayAU AUNumber={aus.NoseWrinkler} AUType={"Nose Wrinkler"}/>
          <DisplayAU AUNumber={aus.CheekRaiser} AUType={"Cheek Raiser"}/>
          <DisplayAU AUNumber={aus.Dimpler} AUType={"Dimpler"}/>
          <DisplayAU AUNumber={aus.UpperLipRaiser} AUType={"Upper Lip Raiser"}/>
          <DisplayAU AUNumber={aus.LipCornerDepressor} AUType={"Lip Corner Depressor"}/>
          <DisplayAU AUNumber={aus.LipCornerPuller} AUType={"Lip Corner Puller"}/>
          <DisplayAU AUNumber={aus.LipStretcher} AUType={"Lip Stretcher"}/>
          <DisplayAU AUNumber={aus.LipTightener} AUType={"Lip Tightener"}/>    
          <DisplayAU AUNumber={aus.LipsPart} AUType={"Lips Part"}/>      
          <DisplayAU AUNumber={aus.ChinRaiser} AUType={"Chin Raiser"}/>
          <DisplayAU AUNumber={aus.JawDrop} AUType={"Jaw Drop"}/> 
        </Container>
      );
}
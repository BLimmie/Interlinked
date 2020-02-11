import { ChartData } from 'chart.js'

export function httpCall(method: string, url: string, header: Array<[string, string]>, data: any, callback: (result: any, r: number) => any) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback) xhr.onload = function () { callback(this['responseText'], this['status']); };
  header.forEach((ii) => {
    xhr.setRequestHeader(ii[0], ii[1])
  })
  if (data != null) {
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(data);
  }
  else xhr.send();
}

export class SessionData {
  transcript: TranscriptLine[] = []
  auanomdata: number[][]
  auanompointscolors: string[][]
  angerData: number[] = []
  joyData: number[] = []
  supriseData: number[] = []
  sorrowData: number[] = []
  textLabels: number[] = []
  textData: any
  smoothangerData: number[] = []
  smoothjoyData: number[] = []
  smoothsupriseData: number[] = []
  smoothsorrowData: number[] = []
  smoothtextData: any
  smoothtextLabels: number[]
  auDataSets: any = [{}]
  divergingRanges: [number, number][] = []
  avgTextAnnotationValue: number = 0
  aggrSentiment: number[] = []
  seshId: string

  constructor(
    transcript: TranscriptLine[],
    auanomdata: number[][],
    auanompointscolors: string[][],
    angerData: number[],
    joyData: number[],
    supriseData: number[],
    sorrowData: number[],
    textLabels: number[],
    textData: any,
    smoothangerData: number[] = [],
    smoothjoyData: number[] = [],
    smoothsupriseData: number[] = [],
    smoothsorrowData: number[] = [],
    smoothtextData: any,
    smoothtextLabels: number[],
    auDataSets: any,
    divergingRanges: [number, number][] = [],
    avgTextAnnotationValue: number,
    aggrSentiment: number[],
    seshId: string
  ) {
    this.transcript = transcript
    this.auanomdata = auanomdata
    this.auanompointscolors = auanompointscolors
    this.angerData = angerData
    this.joyData = joyData
    this.supriseData = supriseData
    this.sorrowData = sorrowData
    this.textLabels = textLabels
    this.textData = textData
    this.smoothangerData = smoothangerData
    this.smoothjoyData = smoothjoyData
    this.smoothsupriseData = smoothsupriseData
    this.smoothsorrowData = smoothsorrowData
    this.smoothtextData = smoothtextData
    this.smoothtextLabels = smoothtextLabels
    this.auDataSets = auDataSets
    this.divergingRanges = divergingRanges
    this.avgTextAnnotationValue = avgTextAnnotationValue
    this.aggrSentiment = aggrSentiment
    this.seshId = seshId
  }
}

export interface PageState {
  current_selection: number;
  component_num: number;
  transcript: TranscriptLine[];
  emotiondata: ChartData;
  smoothemotiondata: ChartData;
  // TODO: text needs labels as member because data is a function that returns labels if given a canvas, refactor to not need this
  textdata: any;
  textlabels: number[];
  smoothtextdata: any;
  smoothtextlabels: number[];
  audata: ChartData;
  // auanom uses these as props for the component au anom chart
  auanomdata: Array<any>[];
  auanompointscolors: Array<string>[];
  avgtextoptions: any;
  // final emotion data percent of total time
  aggremotiondata: ChartData;
  // ranges of x values (inclusive) that have diverging text and emotion sentiment
  divergingannotations: any[];
  genoptions: any;
  divergingoptions: any;
}

// Session class to fill out info in list
export class Session {
  createdTime: string = "";
  providerName: string = "";
  providerUsername: string = "";
  sesId: string = "";

  constructor(createdTime: string, providerName: string, providerUsername: string, sesId: string) {
    this.createdTime = createdTime;
    this.providerName = providerName;
    this.providerUsername = providerUsername;
    this.sesId = sesId;
  }
}

export class TranscriptLine {
  timestamp: number = 0;
  text: string = "";

  constructor(timestamp: number, text: string) {
    this.timestamp = timestamp;
    this.text = text;
  }
}
const auTypes = ["Blink", "BrowLowerer", "CheekRaiser", "ChinRaiser", "Dimpler", "InnerBrowRaiser", "JawDrop", "LidTightener", "LipCornerDepressor", "LipCornerPuller", "LipStretcher", "LipTightener", "LipsPart", "NoseWrinkler", "OuterBrowRaiser", "UpperLidRaiser", "UpperLipRaiser"]

async function getSessionData(seshId: string): Promise<SessionData | null> {
  return new Promise<SessionData | null>(async (resolve) => {
    httpCall('POST', "http://localhost:8080/metrics/" + seshId + "/aggregate", [], null, (result: any, rr: number) => {
      if (rr === 200) {
        let metrics = JSON.parse(result)
        let frameMetrics: Array<any> = metrics["Frame Metrics"]
        let emotionLabels: string[] = []
        let anger: any[] = []
        let joy: any[] = []
        let sorrow: any[] = []
        let surprise: any[] = []
        let auMetrics: Array<any>[] = []
        for (let ii = 0; ii < 17; ii++) { auMetrics.push(new Array<number>()) }
        let convStringToProb = (ss: string) => {
          if (ss === "VERY_UNLIKELY") {
            return 0;
          } else if (ss === "UNLIKELY") {
            return 0.25;
          } else if (ss === "POSSIBLE") {
            return 0.5;
          } else if (ss === "LIKELY") {
            return 0.75;
          } else {
            return 1;
          }
        };

        // real time sentiment and au metrics
        let baseTime = metrics["Created Time"]
        frameMetrics.forEach(element => {
          let xval = (element["Time"] as number - baseTime)
          emotionLabels.push(xval.toString())
          let emotion = element["Emotion"]
          anger.push({ x: xval, y: convStringToProb(emotion["anger"]) })
          joy.push({ x: xval, y: convStringToProb(emotion["joy"]) })
          sorrow.push({ x: xval, y: convStringToProb(emotion["sorrow"]) })
          surprise.push({ x: xval, y: convStringToProb(emotion["surprise"]) })
          for (let ii = 0; ii < auMetrics.length; ii++) {
            auMetrics[ii].push({ x: xval, y: element["AU"][auTypes[ii]] })
          }
        });
        let auData = []
        let auColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#800000', '#aaffc3', '#808000', '#000075', '#808080', '#000000']
        for (let ii = 0; ii < auMetrics.length; ii++) {
          auData.push({
            borderColor: auColors[ii],
            pointBorderColor: auColors[ii],
            label: auTypes[ii],
            data: auMetrics[ii],
            hidden: ii >= 5,
            showLine: true,
            fill: false
          })
        }

        // au anomaly metrics
        let auanomData: Array<any>[] = []
        let auanomPointColors: Array<string>[] = []
        for (let ii = 0; ii < 17; ii++) {
          auanomData.push(new Array<any>())
          auanomPointColors.push(new Array<string>())
        }
        (Object.keys(metrics["AU Anomalies"])).forEach(element => {
          let obj = metrics["AU Anomalies"][element]
          for (let ii = 0; ii < auanomData.length; ii++) {
            auanomData[ii].push({ x: +element, y: obj[auTypes[ii]]["Intensity"] })
            if (obj[auTypes[ii]]["Anomalous"]) {
              auanomPointColors[ii].push("#90cd8a")
            } else {
              auanomPointColors[ii].push("rgba(148, 148, 148, 0.54)")
            }
          }
        })

        // smooth sentiment metrics
        let smoothsentimentLabels: number[] = []
        let smoothanger: any[] = []
        let smoothjoy: any[] = []
        let smoothsorrow: any[] = []
        let smoothsurprise: any[] = [];
        (Object.keys(metrics["Percent in Facial Emotion over last 10 seconds"])).forEach(element => {
          smoothsentimentLabels.push(+element)
          let obj = metrics["Percent in Facial Emotion over last 10 seconds"][element]["Percentage"]
          smoothanger.push({ x: +element, y: obj["anger"] })
          smoothjoy.push({ x: +element, y: obj["joy"] })
          smoothsorrow.push({ x: +element, y: obj["sorrow"] })
          smoothsurprise.push({ x: +element, y: obj["surprise"] })
        })

        // text sentiment metrics
        let textMetrics: [] = metrics["Text Metrics"]
        let textLabels: number[] = []
        let transcript: TranscriptLine[] = []
        let textSentiment: any[] = []
        textMetrics.forEach(element => {
          let time = element["Time"] as number - baseTime
          textLabels.push(time)
          transcript.push(new TranscriptLine(time, element["Text"]))
          textSentiment.push({ x: time, y: element["Sentiment"] })
        })
        let textChartData = (canvas: any) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#E6D725");
          gradient.addColorStop(1, "#47CDD5");
          return {
            datasets: [
              {
                label: "Text Sentiment",
                data: textSentiment,
                borderColor: gradient,
                pointBorderColor: gradient,
                showLine: true,
                lineTension: 0.22
              }
            ]
          }
        }

        //smooth text sentiment metrics
        let smoothtextLabels: number[] = []
        let smoothtext: any[] = [];
        (Object.keys(metrics["Text sentiment over last 10 seconds"])).forEach(element => {
          smoothtextLabels.push(+element)
          let obj = metrics["Text sentiment over last 10 seconds"][element]
          smoothtext.push({ x: +element, y: obj })
        })
        let smoothtextChartData = (canvas: any) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#E6D725");
          gradient.addColorStop(1, "#47CDD5");
          return {
            datasets: [
              {
                label: "Text Sentiment",
                data: smoothtext,
                borderColor: gradient,
                pointBorderColor: gradient,
                showLine: true,
                lineTension: 0.22
              }
            ]
          }
        }

        //diverging sentiment ranges
        let divergingRanges: [number, number][] = []
        let leftBound = -1
        let rightBound = -1;
        (Object.keys(metrics["_Diverging Sentiment"])).forEach(element => {
          let obj = metrics["_Diverging Sentiment"][element]
          if (obj) {
            if (leftBound < 0) {
              leftBound = +element
              rightBound = leftBound
            } else {
              rightBound = +element
            }
          } else {
            if (rightBound > -1) {
              divergingRanges.push([leftBound, rightBound])
              leftBound = -1
              rightBound = -1
            }
          }
        })
        if (rightBound > -1) { divergingRanges.push([leftBound, rightBound]) }

        // avg text sentiment
        let avgtext: number = metrics["Average Text Sentiment"]["AvgTextSentiment"].toPrecision(2)
        // final percent of sentiments out of total time
        let aggrSentimentObj = metrics["Time in Facial Emotions"]["Percentage"]
        let aggrSentiment = [aggrSentimentObj["anger"], aggrSentimentObj["joy"], aggrSentimentObj["sorrow"], aggrSentimentObj["surprise"]]

        const sessionData = new SessionData(
          transcript, auanomData, auanomPointColors, anger, joy, surprise, sorrow, textLabels,
          textChartData, smoothanger, smoothjoy, smoothsurprise, smoothsorrow, smoothtextChartData, smoothtextLabels,
          auData, divergingRanges, avgtext, aggrSentiment, seshId
        )
        resolve(sessionData)
      } else {
        resolve(null)
      }
    })
  })
}

export async function getSessionsData(sessions: Session[]) {
  return new Promise<SessionData[]>((resolve) => {
    const seshdata: SessionData[] = []
    let sessionsLeft = sessions.length
    sessions.forEach((sesh) => {
      getSessionData(sesh.sesId).then((value) => {
        if (value != null) {
          seshdata.push(value)
        }
        sessionsLeft = sessionsLeft - 1
        if (sessionsLeft == 0) {
          resolve(seshdata)
        }
      })
    })

  })
}

export async function getPatientSessions(id: string): Promise<Session[]> {
  return new Promise<Session[]>(async (resolve) => {
    await httpCall('POST', "http://localhost:8080/sessions/" + id, [], null, (result: any, rr: number) => {
      if (rr === 200) {
        let arr = JSON.parse(result)
        if (arr !== null) {
          let Sessions: Session[] = []
          arr = arr.forEach((element: Object) => {
            let vals = Object.values(element)
            let date = new Date(+vals[2] * 1e3)
            let createdTime = date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
            let providerName = Object.values(vals[4])[1]
            let providerUsername = Object.values(vals[4])[2]
            let id = vals[0]
            Sessions.push(new Session(createdTime as string, providerName as string, providerUsername as string, id as string))
          });
          resolve(Sessions)
        }
      }
    })
  })
}

export async function getAssociatedSessions(proid: string, patun: string): Promise<Session[]> {
  return new Promise<Session[]>(async (resolve) => {
    await httpCall('POST', "http://localhost:8080/associatedsessions/" + proid + "/" + patun, [], null, (result: any, rr: number) => {
      if (rr === 200) {
        let arr = JSON.parse(result)
        if (arr !== null) {
          let Sessions: Session[] = []
          arr = arr.forEach((element: Object) => {
            let vals = Object.values(element)
            let date = new Date(+vals[2] * 1e3)
            let createdTime = date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
            let providerName = Object.values(vals[4])[1]
            let providerUsername = Object.values(vals[4])[2]
            let id = vals[0]
            Sessions.push(new Session(createdTime as string, providerName as string, providerUsername as string, id as string))
          });
          resolve(Sessions)
        }
      }
    })
  })
}

export function getOption(index: number) {
  return {
    annotation: {
      drawTime: 'afterDatasetsDraw',
      annotations: [{
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: index,
        borderColor: 'red',
        borderWidth: 2,
        label: { backgroundColor: 'rgba(148, 148, 148, 0.54)', enabled: true, content: index, position: "top" },
      }],
    },
    scales: {
      xAxes: [{
        type: 'linear',
        id: 'x-axis-0'
      }]
    }
  }
}

export function getDivergingOption(da: any[], index: number) {
  return {
    annotation: {
      drawTime: 'afterDatasetsDraw',
      annotations: [{
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: index,
        borderColor: 'red',
        borderWidth: 2,
        label: { backgroundColor: 'rgba(148, 148, 148, 0.54)', enabled: true, content: index, position: "top" },
      }, ...da],
    },
    scales: {
      xAxes: [{
        type: 'linear',
        id: 'x-axis-0'
      }]
    }
  }
}

export function getXValues(cd: any) {
  return (cd.datasets!![0].data!! as any[]).map(element => element.x) as number[]
}

export function getState(currentSesh: SessionData) {
  let divergingAnnotations: any[] = []
  currentSesh.divergingRanges.map(element => {
    let obj = {
      type: 'box',
      drawTime: 'beforeDatasetsDraw',
      xScaleID: 'x-axis-0',
      xMin: element[0],
      xMax: element[1],
      // borderColor: 'blue',
      borderWidth: 0,
      backgroundColor: 'rgba(135, 206, 250, 0.2)'
    }
    divergingAnnotations.push(obj)
  })
  return {
    transcript: currentSesh.transcript,
    auanomdata: currentSesh.auanomdata,
    auanompointscolors: currentSesh.auanompointscolors,
    emotiondata: {
      datasets: [
        {
          label: "Anger",
          data: currentSesh.angerData,
          borderColor: "red",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Joy",
          data: currentSesh.joyData,
          borderColor: "yellow",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Sorrow",
          data: currentSesh.sorrowData,
          borderColor: "blue",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Surprise",
          data: currentSesh.supriseData,
          borderColor: "green",
          showLine: true,
          lineTension: 0.22
        },
      ]
    },
    smoothemotiondata: {
      datasets: [
        {
          label: "Anger",
          data: currentSesh.smoothangerData,
          borderColor: "red",
          showLine: true,
          fill: false,
          lineTension: 0.22
        },
        {
          label: "Joy",
          data: currentSesh.smoothjoyData,
          borderColor: "yellow",
          showLine: true,
          fill: false,
          lineTension: 0.22
        },
        {
          label: "Sorrow",
          data: currentSesh.smoothsorrowData,
          borderColor: "blue",
          showLine: true,
          fill: false,
          lineTension: 0.22
        },
        {
          label: "Surprise",
          data: currentSesh.smoothsupriseData,
          borderColor: "green",
          showLine: true,
          fill: false,
          lineTension: 0.22
        },
      ]
    },
    textdata: currentSesh.textData,
    textlabels: currentSesh.textLabels,
    smoothtextdata: currentSesh.smoothtextData,
    smoothtextlabels: currentSesh.smoothtextLabels,
    audata: {
      datasets: currentSesh.auDataSets
    },
    aggremotiondata: {
      labels: ["Anger", "Joy", "Sorrow", "Surprise"],
      datasets: [{
        label: "Percent of Each Emotion over Session",
        backgroundColor: ["red", "yellow", "blue", "green"],
        data: currentSesh.aggrSentiment
      }]
    },
    divergingannotations: divergingAnnotations,
    divergingoptions: {
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: divergingAnnotations
      },
      scales: {
        xAxes: [{
          type: 'linear',
          id: 'x-axis-0'
        }]
      }
    },
    avgtextoptions: {
      annotation:
      {
        drawTime: 'afterDatasetsDraw',
        annotations: [{
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: currentSesh.avgTextAnnotationValue,
          borderColor: 'red',
          borderWidth: 2,
          label: { enabled: true, content: currentSesh.avgTextAnnotationValue, position: "center" }
        }]
      },

      scales: {
        xAxes: [{
          type: 'linear',
          id: 'x-axis-0',
        }],
        yAxes: [{
          ticks: {
            display: false,
            max: 0.9,
            min: 0
          }
        }],
      }
    },
  }
}

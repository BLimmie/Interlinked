import { ChartData } from 'chart.js'

export function sleep(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  auanomdata: any[][]
  auanompointscolors: string[][]
  angerData: any[] = []
  joyData: any[] = []
  supriseData: any[] = []
  sorrowData: any[] = []
  textLabels: number[] = []
  textSentiment: any[]
  smoothangerData: any[] = []
  smoothjoyData: any[] = []
  smoothsupriseData: any[] = []
  smoothsorrowData: any[] = []
  smoothtext: any[]
  smoothtextLabels: number[]
  auDataSets: any = [{}]
  divergingRanges: [number, number][] = []
  avgTextAnnotationValue: number = 0
  aggrSentiment: number[] = []
  seshId: string
  seshDate: string

  constructor(
    transcript: TranscriptLine[],
    auanomdata: any[][],
    auanompointscolors: string[][],
    angerData: any[],
    joyData: any[],
    supriseData: any[],
    sorrowData: any[],
    textLabels: number[],
    textSentiment: any[],
    smoothangerData: any[] = [],
    smoothjoyData: any[] = [],
    smoothsupriseData: any[] = [],
    smoothsorrowData: any[] = [],
    smoothtext: any[],
    smoothtextLabels: number[],
    auDataSets: any,
    divergingRanges: [number, number][] = [],
    avgTextAnnotationValue: number,
    aggrSentiment: number[],
    seshId: string,
    seshDate: string
  ) {
    this.transcript = transcript
    this.auanomdata = auanomdata
    this.auanompointscolors = auanompointscolors
    this.angerData = angerData
    this.joyData = joyData
    this.supriseData = supriseData
    this.sorrowData = sorrowData
    this.textLabels = textLabels
    this.textSentiment = textSentiment
    this.smoothangerData = smoothangerData
    this.smoothjoyData = smoothjoyData
    this.smoothsupriseData = smoothsupriseData
    this.smoothsorrowData = smoothsorrowData
    this.smoothtext = smoothtext
    this.smoothtextLabels = smoothtextLabels
    this.auDataSets = auDataSets
    this.divergingRanges = divergingRanges
    this.avgTextAnnotationValue = avgTextAnnotationValue
    this.aggrSentiment = aggrSentiment
    this.seshId = seshId
    this.seshDate = seshDate
  }
}

export interface PageState {
  // set max x value for session timestamps
  xmax: number;
  emotiondata: ChartData;
  smoothemotiondata: ChartData;
  // TODO: text needs labels as member because data is a function that returns labels if given a canvas, refactor to not need this
  textsentiment: any[];
  textlabels: number[];
  smoothtext: any[];
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

async function getSessionData(seshId: string, seshDate: string): Promise<SessionData | null> {
  return new Promise<SessionData | null>(async (resolve) => {
    httpCall('POST', backendServerName + ":8080/metrics/" + seshId + "/aggregate?recalculate=false", [], null, (result: any, rr: number) => {
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
            return 25;
          } else if (ss === "POSSIBLE") {
            return 50;
          } else if (ss === "LIKELY") {
            return 75;
          } else {
            return 100;
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
              auanomPointColors[ii].push("rgba(236, 123, 16, 1)")
            } else {
              auanomPointColors[ii].push("#21A1FF")
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
          smoothanger.push({ x: +element, y: 100 * obj["anger"] })
          smoothjoy.push({ x: +element, y: 100 * obj["joy"] })
          smoothsorrow.push({ x: +element, y: 100 * obj["sorrow"] })
          smoothsurprise.push({ x: +element, y: 100 * obj["surprise"] })
        })

        // text sentiment metrics
        // let ly = "#b9bb3b"
        // let lb = "rgba(33, 161, 255, 1)"
        // let by = "rgba(211, 212, 119, 0.3)"
        // let bb = "rgba(33, 161, 255, 0.3)"
        // let ratio = 0.44

        let textMetrics: [] = metrics["Text Metrics"]
        let textLabels: number[] = []
        let transcript: TranscriptLine[] = []
        let textSentiment: any[] = []
        textMetrics && textMetrics.forEach(element => {
          let time = element["Time"] as number - baseTime
          textLabels.push(time)
          transcript.push(new TranscriptLine(time, element["Text"]))
          textSentiment.push({ x: time, y: element["Sentiment"] })
        })
        // let textChartData = (canvas: any) => {
        //   const ctx = canvas.getContext("2d")
        //   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        //   gradient.addColorStop(0, ly);
        //   gradient.addColorStop(ratio, ly);
        //   gradient.addColorStop(ratio, lb);
        //   gradient.addColorStop(1, lb);
        //   const bgradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        //   bgradient.addColorStop(0, by)
        //   bgradient.addColorStop(ratio, by)
        //   bgradient.addColorStop(ratio, bb)
        //   bgradient.addColorStop(1, bb)
        //   return {
        //     datasets: [
        //       {
        //         label: "Text Sentiment",
        //         data: textSentiment,
        //         borderColor: gradient,
        //         pointBorderColor: gradient,
        //         backgroundColor: bgradient,
        //         showLine: true,
        //         lineTension: 0.22
        //       }
        //     ]
        //   }
        // }

        //smooth text sentiment metrics
        let smoothtextLabels: number[] = []
        let smoothtext: any[] = [];
        (Object.keys(metrics["Text sentiment over last 10 seconds"])).forEach(element => {
          smoothtextLabels.push(+element)
          let obj = metrics["Text sentiment over last 10 seconds"][element]
          if (obj > 1) { obj = 1 } else if (obj < -1) { obj = -1 }
          smoothtext.push({ x: +element, y: obj })
        })
        // let smoothtextChartData = (canvas: any) => {
        //   const ctx = canvas.getContext("2d")
        //   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        //   gradient.addColorStop(0, ly);
        //   gradient.addColorStop(ratio, ly);
        //   gradient.addColorStop(ratio, lb);
        //   gradient.addColorStop(1, lb);
        //   const bgradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        //   bgradient.addColorStop(0, by)
        //   bgradient.addColorStop(ratio, by)
        //   bgradient.addColorStop(ratio, bb)
        //   bgradient.addColorStop(1, bb)
        //   return {
        //     datasets: [
        //       {
        //         label: "Text Sentiment",
        //         data: smoothtext,
        //         borderColor: gradient,
        //         pointBorderColor: gradient,
        //         backgroundColor: bgradient,
        //         showLine: true,
        //         lineTension: 0.22
        //       }
        //     ]
        //   }
        // }

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
        let aggrSentiment = [aggrSentimentObj["anger"] * 100, 100 * aggrSentimentObj["joy"], 100 * aggrSentimentObj["sorrow"], 100 * aggrSentimentObj["surprise"]]

        const sessionData = new SessionData(
          transcript, auanomData, auanomPointColors, anger, joy, surprise, sorrow, textLabels,
          textSentiment, smoothanger, smoothjoy, smoothsurprise, smoothsorrow, smoothtext, smoothtextLabels,
          auData, divergingRanges, avgtext, aggrSentiment, seshId, seshDate
        )
        resolve(sessionData)
      } else {
        resolve(null)
      }
    })
  })
}

export async function getSessionsData(sessions: Session[]) {
  return new Promise<SessionData[]>(async (resolve) => {
    const seshdata: SessionData[] = []
    let sessionsLeft = sessions.length
    for (const sesh of sessions) {
      getSessionData(sesh.sesId, sesh.createdTime).then((value) => {
        if (value != null) {
          seshdata.push(value)
        }
        sessionsLeft = sessionsLeft - 1
        if (sessionsLeft == 0) {
          resolve(seshdata)
        }
      })
      await sleep(500)
    }

  })
}

export async function getPatientSessions(id: string): Promise<Session[]> {
  return new Promise<Session[]>(async (resolve) => {
    await httpCall('POST', backendServerName + ":8080/sessions/" + id, [], null, (result: any, rr: number) => {
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
    await httpCall('POST', backendServerName + ":8080/associatedsessions/" + proid + "/" + patun, [], null, (result: any, rr: number) => {
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

// x used for boundaries for zoom/pan
export function getOption(xmax: number, index: number) {
  return {
    annotation: {
      drawTime: 'beforeDatasetsDraw',
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
        scaleLabel: {
          display: true,
          labelString: "Time (sec)"
        },
        type: 'linear',
        id: 'x-axis-0'
      }]
    },
    pan: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        x: 0,
      },
      rangeMax: {
        x: xmax,
      }
    },
    zoom: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        x: 0,
      },
      rangeMax: {
        x: xmax,
      }
    }
  }
}

export function getDivergingOption(xmax: number, da: any[], index: number) {
  return {
    annotation: {
      drawTime: 'beforeDatasetsDraw',
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
        scaleLabel: {
          display: true,
          labelString: "Time (sec)"
        },
        type: 'linear',
        id: 'x-axis-0'
      }]
    },
    pan: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        x: 0,
      },
      rangeMax: {
        x: xmax,
      }
    },
    zoom: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        x: 0,
      },
      rangeMax: {
        x: xmax,
      }
    }
  }
}

export function getScales(ylabel: string, ymin: number | undefined = undefined, ymax: number | undefined = undefined) {
  return {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: "Time (sec)"
      },
      type: 'linear',
      id: 'x-axis-0'
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: ylabel
      },
      ticks: {
        min: ymin,
        max: ymax
      }
    }]
  }
}

export function getXValues(cd: any) {
  return (cd.datasets!![0].data!! as any[]).map(element => element.x) as number[]
}

export function getState(currentSesh: SessionData): PageState {
  let divergingAnnotations: any[] = []
  let xmax = currentSesh.angerData[currentSesh.angerData.length - 1].x + 20
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
    xmax: xmax,
    auanomdata: currentSesh.auanomdata,
    auanompointscolors: currentSesh.auanompointscolors,
    emotiondata: {
      datasets: [
        {
          label: "Anger",
          data: currentSesh.angerData,
          borderColor: "red",
          backgroundColor: "rgba(255, 80, 80, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Joy",
          data: currentSesh.joyData,
          borderColor: "#b9bb3b",
          backgroundColor: "rgba(211, 212, 119, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Sorrow",
          data: currentSesh.sorrowData,
          borderColor: "blue",
          backgroundColor: "rgba(102, 140, 255, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Surprise",
          data: currentSesh.supriseData,
          borderColor: '#d29e63',
          backgroundColor: "rgba(210, 158, 99, 0.3)",
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
          backgroundColor: "rgba(255, 80, 80, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Joy",
          data: currentSesh.smoothjoyData,
          borderColor: "#b9bb3b",
          backgroundColor: "rgba(211, 212, 119, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Sorrow",
          data: currentSesh.smoothsorrowData,
          borderColor: "blue",
          backgroundColor: "rgba(102, 140, 255, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
        {
          label: "Surprise",
          data: currentSesh.smoothsupriseData,
          borderColor: '#d29e63',
          backgroundColor: "rgba(210, 158, 99, 0.3)",
          showLine: true,
          lineTension: 0.22
        },
      ]
    },
    textsentiment: currentSesh.textSentiment,
    textlabels: currentSesh.textLabels,
    smoothtext: currentSesh.smoothtext,
    smoothtextlabels: currentSesh.smoothtextLabels,
    audata: {
      datasets: currentSesh.auDataSets
    },
    aggremotiondata: {
      labels: ["Anger", "Joy", "Sorrow", "Surprise"],
      datasets: [{
        label: "Percent of Each Emotion over Session",
        backgroundColor: ["red", "#d3d477", "blue", '#d29e63'],
        data: currentSesh.aggrSentiment
      }]
    },
    divergingannotations: divergingAnnotations,
    divergingoptions: {
      annotation: {
        drawTime: 'beforeDatasetsDraw',
        annotations: divergingAnnotations
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Time (sec)"
          },
          type: 'linear',
          id: 'x-axis-0'
        }]
      },
      pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          x: 0,
        },
        rangeMax: {
          x: xmax,
        }
      },
      zoom: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          x: 0,
        },
        rangeMax: {
          x: xmax,
        }
      }
    },
    genoptions: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Time (sec)"
          },
          type: 'linear',
          id: 'x-axis-0'
        }]
      },
      pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          x: 0,
        },
        rangeMax: {
          x: xmax,
        }
      },
      zoom: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          x: 0,
        },
        rangeMax: {
          x: xmax,
        }
      }
    },
    avgtextoptions: {
      annotation:
      {
        drawTime: 'beforeDatasetsDraw',
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
          scaleLabel: {
            display: true,
            labelString: "Negative to Positive Text Sentiment"
          },
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

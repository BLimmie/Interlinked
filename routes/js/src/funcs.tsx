export function httpCall(method: string, url:string, header: Array<[string, string]>, data:any, callback:(result:any, r:number)=>any) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback) xhr.onload = function() { callback(this['responseText'], this['status']); };
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
  auanomlabels: string[]
  auanompointscolors: string[][]
  emotionLabels: string[] = []
  angerData: number[] = []
  joyData: number[] = []
  supriseData: number[] = []
  sorrowData: number[] = []
  textLabels: string[] = []
  textData: any
  smoothsentimentLabels: string[]
  smoothangerData: number[] = []
  smoothjoyData: number[] = []
  smoothsupriseData: number[] = []
  smoothsorrowData: number[] = []
  smoothtextData: any
  smoothtextLabels: string[]
  auLabels: string[] = []
  auDataLabels: string[] = []
  auDataSets: any = [{}]
  avgTextAnnotationValue : number = 0
  seshId: string

  constructor(
    transcript: TranscriptLine[],
    auanomdata: number[][],
    auanomlabels: string[],
    auanompointscolors: string[][],
    emotionLabels: string[],
    angerData: number[],
    joyData: number[],
    supriseData: number[],
    sorrowData: number[],
    textLabels: string[],
    textData: any,
    smoothsentimentLabels: string[],
    smoothangerData: number[] = [],
    smoothjoyData: number[] = [],
    smoothsupriseData: number[] = [],
    smoothsorrowData: number[] = [],
    smoothtextData: any,
    smoothtextLabels: string[],
    auLabels: string[],
    auDataSets: any,
    avgTextAnnotationValue : number,
    seshId: string
  ) {
    this.transcript = transcript
    this.auanomdata = auanomdata
    this.auanomlabels = auanomlabels
    this.auanompointscolors = auanompointscolors
    this.emotionLabels = emotionLabels
    this.angerData = angerData
    this.joyData = joyData
    this.supriseData = supriseData
    this.sorrowData = sorrowData
    this.textLabels = textLabels
    this.textData = textData
    this.smoothsentimentLabels = smoothsentimentLabels
    this.smoothangerData = smoothangerData
    this.smoothjoyData = smoothjoyData
    this.smoothsupriseData = smoothsupriseData
    this.smoothsorrowData = smoothsorrowData
    this.smoothtextData = smoothtextData
    this.smoothtextLabels = smoothtextLabels
    this.auLabels = auLabels
    this.auDataSets = auDataSets
    this.avgTextAnnotationValue = avgTextAnnotationValue
    this.seshId = seshId
  }
}

// Session class to fill out info in list
export class Session {
    createdTime: string =  "";
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

class TranscriptLine {
    timestamp: number =  0;
    text: string = "";

    constructor(timestamp: number, text: string) {
        this.timestamp = timestamp;
        this.text = text;
    }
}
const auTypes = ["Blink", "BrowLowerer", "CheekRaiser", "ChinRaiser", "Dimpler", "InnerBrowRaiser", "JawDrop", "LidTightener", "LipCornerDepressor", "LipCornerPuller", "LipStretcher", "LipTightener", "LipsPart", "NoseWrinkler", "OuterBrowRaiser", "UpperLidRaiser", "UpperLipRaiser"]

async function getSessionData(seshId: string): Promise<SessionData | null> {
  return new Promise<SessionData | null> ( async (resolve) => {
    httpCall('POST', "http://localhost:8080/metrics/" + seshId + "/aggregate", [], null, (result:any, rr:number) => {
        if (rr === 200) {
          let metrics = JSON.parse(result)
          let frameMetrics: Array<any> = metrics["Frame Metrics"]
          let emotionLabels: string[] = []
          let anger: number[] = []
          let joy: number[] = []
          let sorrow: number[] = []
          let surprise: number[] = []
          let auMetrics: Array<number>[] = []
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
            emotionLabels.push((element["Time"] as number - baseTime).toString())
            let emotion = element["Emotion"]
            anger.push(convStringToProb(emotion["anger"]))
            joy.push(convStringToProb(emotion["joy"]))
            sorrow.push(convStringToProb(emotion["sorrow"]))
            surprise.push(convStringToProb(emotion["surprise"]))
            for (let ii = 0; ii < auMetrics.length; ii++) {
              auMetrics[ii].push(element["AU"][auTypes[ii]])
            }
          });
          let auData = []
          for (let ii = 0; ii < auMetrics.length; ii++) {
            auData.push({
              label: auTypes[ii],
              data: auMetrics[ii],
              hidden: ii >= 5,
            })
          }
  
          // au anomaly metrics
          let auanomLabels: string[] = []
          let auanomData: Array<number>[] = []
          let auanomPointColors: Array<string>[] = []
          for (let ii = 0; ii < 17; ii++) {
            auanomData.push(new Array<number>())
            auanomPointColors.push(new Array<string>())
          }
          (Object.keys(metrics["AU Anomalies"])).forEach(element => {
            auanomLabels.push(element)
            let obj = metrics["AU Anomalies"][element]
            for (let ii = 0; ii < auanomData.length; ii++) {
              auanomData[ii].push(obj[auTypes[ii]]["Intensity"])
              if (obj[auTypes[ii]]["Anomalous"]) {
                auanomPointColors[ii].push("#90cd8a")
              } else {
                auanomPointColors[ii].push("rgba(148, 148, 148, 0.54)")
              }
            }
          })
  
          // smooth sentiment metrics
          let smoothsentimentLabels: string[] = []
          let smoothanger: number[] = []
          let smoothjoy: number[] = []
          let smoothsorrow: number[] = []
          let smoothsurprise: number[] = [];
          (Object.keys(metrics["Percent in Facial Emotion over last 10 seconds"])).forEach(element => {
            smoothsentimentLabels.push(element)
            let obj = metrics["Percent in Facial Emotion over last 10 seconds"][element]["Percentage"]
            smoothanger.push(obj["anger"])
            smoothjoy.push(obj["joy"])
            smoothsorrow.push(obj["sorrow"])
            smoothsurprise.push(obj["surprise"])
          })
  
          // text sentiment metrics
          let textMetrics: [] = metrics["Text Metrics"]
          let textLabels: string[] = []
          let transcript: TranscriptLine[] = []
          let textSentiment: number[] = []
          textMetrics.forEach(element => {
            let time = element["Time"] as number - baseTime
            textLabels.push(time.toString())
            transcript.push(new TranscriptLine(time, element["Text"]))
            textSentiment.push(element["Sentiment"])
          })
          let textChartData = (canvas: any) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, "#E6D725");
            gradient.addColorStop(1, "#47CDD5");
            return {
              labels: textLabels,
              datasets: [
                {
                  label: "Text Sentiment",
                  data: textSentiment,
                  borderColor: gradient,
                  pointBorderColor: gradient,
                }
              ]
            }
          }
  
          //smooth text sentiment metrics
          let smoothtextLabels: string[] = []
          let smoothtext: number[] = [];
          (Object.keys(metrics["Text sentiment over last 10 seconds"])).forEach(element => {
            smoothtextLabels.push(element)
            let obj = metrics["Text sentiment over last 10 seconds"][element]
            smoothtext.push(obj)
          })
          let smoothtextChartData = (canvas: any) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, "#E6D725");
            gradient.addColorStop(1, "#47CDD5");
            return {
              labels: smoothtextLabels,
              datasets: [
                {
                  label: "Text Sentiment",
                  data: smoothtext,
                  borderColor: gradient,
                  pointBorderColor: gradient,
                }
              ]
            }
          }
  
          let avgtext = Math.round((metrics["Average Text Sentiment"]["AvgTextSentiment"] + 1) / 2.0 * 40)
          const sessionData = new SessionData(
            transcript, auanomData, auanomLabels , auanomPointColors ,emotionLabels, anger,joy, surprise, sorrow, textLabels,
            textChartData,smoothsentimentLabels, smoothanger, smoothjoy, smoothsurprise, smoothsorrow, smoothtextChartData, smoothtextLabels,
             emotionLabels, auData, avgtext, seshId
          )
          resolve(sessionData)  
          } else {
            resolve(null)
          }
        })
      })
}

export async function getSessionsData(sessions: Session[]) {
  return new Promise<SessionData[]> ((resolve) => {
    const seshdata : SessionData[] = []
    let sessionsLeft = sessions.length
    sessions.forEach((sesh) => {
      getSessionData(sesh.sesId).then((value) => { 
        if(value != null) {
           seshdata.push(value)
        }
        sessionsLeft = sessionsLeft - 1
        if(sessionsLeft == 0){
          resolve(seshdata)
        }
      })
    })
    
  })
}

export async function getPatientSessions(id: string) : Promise<Session[]> {
  return new Promise<Session[]> (async(resolve) => {
      await httpCall('POST', "http://localhost:8080/sessions/" + id, [], null, (result:any, rr:number) => {
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
import { connect, Room } from "twilio-video"

export async function getToken(identityType: string, roomName: string) {
    const jsonObject = JSON.stringify({
        "identityType": identityType,
        "roomName": roomName
    })
        return new Promise<any>(resolve => {
            httpCall('POST', "http://localhost:8080/twilio/getToken", jsonObject, (result: any) => {
                resolve(JSON.parse(result).token)
            })
        })
    }

export function httpCall(method: string, url:string, data:any, callback:(result:any)=>any) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    if (callback) xhr.onload = function() { callback(this['responseText']) }
    if (data != null) {
        xhr.setRequestHeader('Content-Type', 'text/plain')
        xhr.send(data)
    }
    else xhr.send()
}

export async function getRoom(
  roomName: string,
  localStream: MediaStreamTrack[],
  identityType: string) : Promise<Room> {
  return new Promise<Room>(async (resolve) => {
    await getToken(identityType, roomName)
    .then((value: any) => {
      if(value){
         connect(value,{
          name: roomName,
          tracks: localStream
        }).then((room: Room) => {
          resolve(room)
        })
      } 
    })
  })
}

export function setRemoteVideo(room: any, endSession: Function){
  const localParticipant = room.localParticipant
  console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

  room.participants.forEach((participant: any) => {
    handleNewParticipant(participant)
  });

  room.on('participantConnected', (participant: any) => {
    handleNewParticipant(participant)
  });

  room.once('participantDisconnected', (participant: any) => {
    console.log(`Participant disconnected: ${participant.identity}`);
    endSession()
  })
}

function handleNewParticipant(participant: any) {
  console.log(`Participant "${participant.identity}" is connected to the Room`);
  participant.on('trackSubscribed', (track: any) => {
    const remoteMediaContainer: (HTMLElement | null)
      = document.getElementById('remote');
    console.log("on");
    (remoteMediaContainer as HTMLElement).appendChild(track.attach());
  })
}
import React from 'react'
import { connect, Room, RemoteParticipant}  from 'twilio-video'

interface RemoteVideoProps  extends React.HTMLAttributes<HTMLElement>{
	token: string
  }
export default function RemoteVideo(props: RemoteVideoProps) {
	const {token, className } = props
	const [people, setPeople] = React.useState<string[]>([])
  
	React.useEffect(() => {
	  if(token !== ''){
		connect(token,{
		  audio:true,
		  name:'room',
		  video: {width: 640 }
		  }).then((room:Room) => {
		  const localParticipant = room.localParticipant
		  addPerson(localParticipant.identity)
		  room.participants.forEach((participant: RemoteParticipant) => {
			  addPerson(participant.identity)
			  participant.on('trackSubscribed', track => {
				const remoteMediaContainer:(HTMLElement | null) = document.getElementById('remote-media');
				(remoteMediaContainer as HTMLElement).appendChild(track.attach());
			  })
		  })
		  room.once('participantConnected', (participant: RemoteParticipant) => {
			console.log(`Participant "${participant.identity}" has connected to the Room`)
			addPerson(participant.identity)
			participant.on('trackSubscribed', track => {
			  const remoteMediaContainer:(HTMLElement | null) = document.getElementById('remote-media');
			  (remoteMediaContainer as HTMLElement).appendChild(track.attach());
			})
		  })
		  room.once('participantDisconnected', participant => {
			console.log(`Participant "${participant.identity}" has disconnected from the Room`)
			removePerson(participant.identity)
		  })  
		})
	  }
	}, [token])

	const addPerson:Function = (name: string): void => {
		setPeople(temp => {
		const list: string[] = [...temp, name]
		return list
		})
		console.log(`Connected to the Room as LocalParticipant ${name}`)
	}
  
	const removePerson:Function = (name: string): void => {
	  const remoteMediaContainer:(HTMLElement | null) = document.getElementById('remote-media');
	  const video: ChildNode | null = (remoteMediaContainer as HTMLElement).lastChild;
	  (remoteMediaContainer as HTMLElement).removeChild((video as ChildNode))
	  console.log(people)
	  setPeople(people.filter((temp) => {
		console.log(temp)
		return temp !== name
	  }))
	}

	return (
		<div className={className}id="remote-media"></div>
	)
}

import React from 'react'
import { CreateLocalTrackOptions, createLocalVideoTrack } from 'twilio-video'

interface LocalVideoProps  extends React.HTMLAttributes<HTMLElement>{

}
export default function LocalVideo(props: LocalVideoProps) {
	const {className} = props
	React.useEffect(() => {
		const options: CreateLocalTrackOptions = {
			advanced: [{width:480}]
		}
		createLocalVideoTrack(options).then(track => {
		const localMediaContainer:(HTMLElement | null) = document.getElementById('local-media');
		(localMediaContainer as HTMLElement).appendChild(track.attach());
		})
	},[])
	return (
		<div className={className}id="local-media"></div>
	)
}

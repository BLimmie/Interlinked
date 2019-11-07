import React from 'react'

import { createLocalVideoTrack, CreateLocalTrackOptions }  from 'twilio-video'

export default function LocalVideo() {
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
		<div id="local-media"></div>
	)
}

package routes

import (
	"fmt"

	"github.com/pion/webrtc"
)

var peerConnection *webrtc.PeerConnection

func configureServer() *webrtc.PeerConnection {
	config := webrtc.Configuration{
		ICEServers: []webrtc.ICEServer{
			{
				URLs: []string{"stun:stun.l.google.com:19302"},
			},
		},
	}

	var err error
	// Create a new RTCPeerConnection
	peerConnection, err = webrtc.NewPeerConnection(config)
	if err != nil {
		panic(err) // Please handle your errors correctly!
	}
	return peerConnection
}

func createDatachannel(peerConnection *webrtc.PeerConnection) *webrtc.DataChannel {
	dataChannel, err := peerConnection.CreateDataChannel("data", nil)
	if err != nil {
		panic(err) // Please handle your errors correctly!
	}
	dataChannel.OnOpen(func() {
		fmt.Printf("Data channel '%s'-'%d' open.\n", dataChannel.Label, dataChannel.ID)
		// Now we can start sending data.
	})

	dataChannel.OnMessage(func(msg webrtc.DataChannelMessage) {
		fmt.Printf("Message from DataChannel '%s': '%s'\n", dataChannel.Label, string(msg.Data))

		// Handle the message here
	})
	return dataChannel
}

func receiveDatachannel() {
	peerConnection.OnDataChannel(func(dataChannel *webrtc.DataChannel) {
		fmt.Printf("New DataChannel %s %d\n", dataChannel.Label, dataChannel.ID)

		// Handle data channel
	})
}

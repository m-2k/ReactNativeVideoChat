import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import styles from "../../styles/video.js";
import hstyles from "../../styles/home.js";

import { Platform } from 'react-native';
import MediaControl from "./MediaControl.js"

export default class RoomContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const local_style = this.props.remoteVideoSrc ? styles.thumbnail : styles.fullContainer;
    return (
    <TouchableWithoutFeedback style={styles.fullContainer} onPress={this.props.toggleControl}>
      <View style={styles.fullContainer} onPress={this.props.toggleControl}>
        <RTCView
          mirror={true}
          streamURL={this.props.localVideoSrc}
          style={local_style} />

        {this.props.connection == "established" ?
          (
            <RTCView mirror={true} streamURL={this.props.remoteVideoSrc} style={styles.fullContainer} />
          ) : null }

        {this.props.showControl ? (
          <MediaControl
            audio={this.props.audio}
            video={this.props.video}
            swapCamera={this.props.swapCamera}
            toggleAudio={this.props.toggleAudio}
            toggleVideo={this.props.toggleVideo}
            hangUp={this.props.hangUp} />
          ) : null }

        {this.props.connection == "join" ?
          (
            <View style={[styles.invitationSection, hstyles.separator]}>
              <Text style={styles.inputLabel}>Send an invitation to join the room.</Text>
              <TextInput
                style={hstyles.searchInput}
                clearButtonMode="always"
                autoCorrect={false}
                value={this.props.message}
                onChange={this.props.onInvitationChanged}
                placeholderTextColor="#808080"
                placeholder="Hi, I'm John Doe." />
              <View style={styles.flowLeft}>
                <TouchableHighlight style={[hstyles.button, styles.halfSize]}
                    onPress={this.props.sendInvitation}
                    underlayColor='#99d9f4'>
                  <Text style={hstyles.buttonText}>Send</Text>
                </TouchableHighlight>
                <View style={styles.halfSize}></View>
              </View>
            </View>
          ) : null }

        {this.props.connection == "approve" ?
          (
            <View style={styles.invitationSection}>
              <Text style={styles.inputLabel}>A peer has sent you a message to join the room:</Text>
              <Text style={styles.inputLabel}>{this.props.message}</Text>
              <View style={hstyles.flowRight}>
                <TouchableHighlight style={hstyles.button}
                    onPress={this.props.rejectInvitation}
                    underlayColor='#99d9f4'>
                  <Text style={hstyles.buttonText}>Reject</Text>
                </TouchableHighlight>
                <View style={hstyles.empty}></View>
                <TouchableHighlight style={hstyles.button}
                    onPress={this.props.acceptInvitation}
                    underlayColor='#99d9f4'>
                  <Text style={hstyles.buttonText}>Accept</Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : null }

      </View>
    </TouchableWithoutFeedback>
    );
  }
}


import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import store from "./store";
import * as action from "./actions";
import { Icon } from "react-native-elements";
import { NEXT, PREV, PLAY_PAUSE } from "./constants";

console.disableYellowBox = true;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "N/A",
      Album: "N/A",
      Artist: "N/A",
      AlbumImage: ""
    };
  }
  componentDidMount() {
    setInterval(this.fetchMusicInfo, 1000);
  }
  fetchMusicInfo = async () => {
    await store.dispatch(action.fetchMusic());
    let result = store.getState().MusicReducer;
    result.name = result.name.substring(0, 25);
    if (result.name !== this.state.Name) {
      result.album = result.album.substring(0, 25);
      result.artist = result.artist.substring(0, 25);
      this.setState({
        Name: result.name,
        Album: result.album,
        Artist: result.artist,
        AlbumImage: result.albumImage
      });
    }
  };
  setCommand = command => {
    store.dispatch(action.setCommand(command));
  };
  render() {
    return (
      <View style={[styles.container, { flex: 10 }]}>
        <Image
          style={{ width: dimension.width, height: dimension.width }}
          source={{
            uri: "data:image/png;base64," + this.state.AlbumImage
          }}
        />
        <Text style={styles.boldText}>{this.state.Name}</Text>
        <Text style={styles.Text}>{this.state.Album}</Text>
        <Text style={styles.Text}>{this.state.Artist}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 3,
            padding: 20
          }}
        >
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => this.setCommand(PREV)}
          >
            <Icon name="backward" type="font-awesome" color="0F00" size={45} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => this.setCommand(PLAY_PAUSE)}
          >
            <Icon
              name="play-circle"
              type="font-awesome"
              color="#000"
              size={45}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => this.setCommand(NEXT)}
          >
            <Icon name="forward" type="font-awesome" color="#000" size={45} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const dimension = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const styles = StyleSheet.create({
  boldText: {
    marginTop: "5%",
    marginLeft: "5%",
    fontWeight: "bold",
    fontSize: 25
  },
  Text: {
    marginTop: "5%",
    marginLeft: "5%",
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});

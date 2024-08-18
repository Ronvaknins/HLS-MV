# HLS-MV
![HLS-MV-logo-trans](https://github.com/user-attachments/assets/5be267d8-b1fe-4179-a3b4-2c550e60f2b3 )
HTTP Live Streaming MultiViewer




HLS-MV is a React application designed for real-time monitoring of multiple HLS video streams in a grid layout. It provides a user-friendly interface for viewing and managing multiple video feeds simultaneously, ideal for surveillance, broadcasting, and live event monitoring.

## Demo

## Build
```
npm run build
```
## Run

```
npm run start
```
### Run LAN exposed

Change to your LAN ip address in package.json line 8
```
8    "start-lan": "vite --host {YOUR_LAN_IP}",
```

then run
```
npm run start-lan
```

## Features

- one click on a video will play the audio of the source and will add audio meter
- double click on a video input will toggle full screen for the clicked input
- Editing the inputs:
    - hover the left side of the screen, the navbar will appear, click on  ⚙ >> Inputs
    ![image](https://github.com/user-attachments/assets/8d75f7b0-0509-48be-8477-67184e33a704)
    - click save to save changes.
## Config file
a config file will be a array that contain key:value 
- url: {HLS_URL}
- name: {NAME_VIDEO_INPUT} (will appear when hovering the video input)

Example: configNews.js
```
export const streams = [
  {
    url: "https://kan11w.media.kan.org.il/hls/live/2105694/2105694/source1_4k/chunklist.m3u8",
    name: "Kan 11",
  },
....

}

```
import it into App.jsx as initialStreams
```
import {streams as initialStreams} from './configNews'
```
## Shortcuts
'F' will toggle full screen 
## Future Ideas
- [ ]  adding routes to config files via url
- [ ]  adding support for flexable rescale for each video input
- [ ]  creating a menu item componenets
- [ ]  saving last config in the local storage


## Authors

- [@ronvaknins](https://www.github.com/ronvaknins)

## Resources
- [Google's Audiowide Font](https://fonts.googleapis.com/css?family=Audiowide)
- [Google icons](https://fonts.google.com/icons)
- [Button-17](https://getcssscan.com/css-buttons-examples)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)

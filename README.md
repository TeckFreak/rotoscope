# Simple Rotoscope

Its a simple mini rotoscope project which consists of the mainly 3 components:

- _Arduino Sketch:_ Contains the Arduino code which sends the distance data from LiDar TF-Luna.
- _Socket Server:_ The server which run on the host system like Raspberry Pi and takes data from Arduino Serial.
- _App:_ The main web app which controls the picture according to the data received from Arduino.

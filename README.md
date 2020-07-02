# Mongoose Multiple Schema

This repository has the source code of how to push data from Panther into Node.JS.

# Pre-Requisites

  * Panther 5.5*
  * MongoDB
  * Node.JS
  * Panther Enterprise Gateway (PEG)
  
# How this works

The data from Panther is synced to PEG where it converts to JSON format. The JSON data is "pulled" into Node-JS(server-side).
Node.JS then sends the data into MongoDB. MongoDB sends the data into Node.JS's module named Mongoose.
Data from Mongoose makes a round-trip into client-side for dynamic updates on the front end.


Need a Panther Web 552 Redhat Image? [Click Here](https://hub.docker.com/r/prolificspanther/pantherweb "Named link title") 

How to set up a Panther Servlet Web Application? [Click Here](https://github.com/ProlificsPanther/PantherWeb/releases "Named link title")

Read our Documentation [here](https://docs.prolifics.com)

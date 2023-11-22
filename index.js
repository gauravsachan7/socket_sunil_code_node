const express = require('express')
const crypto = require('crypto');
ChargerModel = require('./Models/ChargerModel.js');
ErrorMessageProps = require('./Models/ErrorMessageProps.js');
MasterService = require('./Services/MasterService.js');
ClientResponse = require('./Models/ClientResponse.js');
Model_List = require('./Models/ChargerModel.js');
Output = require('./Models/Output.js');

const webserver = express()
 .use((req, res) =>
   res.send('hello')
 )

 // project port 3000;
 .listen(3000, () => console.log(`Listening on ${3000}`))
const { WebSocketServer } = require('ws')

// ws port 443
const sockserver = new WebSocketServer({ port: 4700 })
sockserver.on('connection', function connection(ws, incoming_request) {
  //handshake(incoming_request.url,incoming_request.rawHeaders[3]);
  console.log("ws_client_stream.id:-",incoming_request.rawHeaders[3]);
  console.log("socket.Handshaked:-",ws.Handshaked);
  console.log("socket.Host:-",ws.Host);
  console.log("socket.HttpVersion:-",ws.HttpVersion);
  console.log("socket.LastActiveTime:-",ws.LastActiveTime);
  console.log("socket.LocalEndPoint:-",ws.LocalEndPoint);
  console.log("socket.Method:-",ws.Method);
  console.log("Origin:-",incoming_request.url);
  console.log("ChargerId:-",incoming_request.url);
  console.log("socket.RemoteEndPoint:-",ws.RemoteEndPoint);
  console.log("socket.SecWebSocketProtocol:-",ws.SecWebSocketProtocol);
  console.log("socket.SecWebSocketVersion:-",ws.SecWebSocketVersion);
  console.log("SessionId:-",ws.id);
  console.log("StartTime:-",ws.StartTime);
  console.log("Upgrade:-",ws.Upgrade);
  console.log("New connection added");
  ws.send('connection established')
  ws.on('close', () => console.log('Client has disconnected!'))
  ws.on('message', data => {
   console.log("data:-",data);
    sockserver.clients.forEach(client => {
      console.log(`distributing message: ${data}`)
      client.send(`${data}`)
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }

});

function handshake(path,secWebSocketKey){
  if (path) {
    let chargerId = path;
    let key = ComputeWebSocketHandshakeSecurityHash09(secWebSocketKey);
    var stringBuilder = `HTTP/1.1 101 Switching Protocols \n HTTP/1.1 101 Switching Protocols \n User-Agent \n Upgrade: WebSocket \n Connection: Upgrade \n Sec-WebSocket-Accept: ${key} \n Sec-WebSocket-Protocol: ocpp1.6 `;
    console.log('stringBuilder',stringBuilder);
    Console.WriteLine("New session: " + path);
    session.Send(stringBuilder);
    socket.user = chargerId;
    let num = Convert.ToInt32("4");
    chargerModel.ChargerId = chargerId;
    let text2 = chargerModel.ChargerId.Split('/')[chargerModel.ChargerId.Split('/').Length - 1];
    text2 = text2.Replace('/', ' ');
    chargerModel.Handshek = socket.Handshaked.ToString();
    chargerModel.Host = socket.Host;
    chargerModel.HttpVersion = socket.HttpVersion;
    chargerModel.LastActiveTime = socket.LastActiveTime.ToString();
    chargerModel.LocationEndPoint = socket.LocalEndPoint.ToString();
    chargerModel.Method = socket.Method;
    chargerModel.Origin = path.ToString();
    chargerModel.ChargerId = path.ToString();
    chargerModel.RemoteEndPoint = socket.RemoteEndPoint.ToString();
    chargerModel.SecWebSocketProtocol = socket.SecWebSocketProtocol;
    chargerModel.SecWebSocketVersion = socket.SecWebSocketVersion;
    chargerModel.SessionId = socket.id;
    chargerModel.StartTime = socket.StartTime.ToString();
    chargerModel.Upgrade = socket.Upgrade;
    var list = [
      socket.Handshaked.ToString(),
      socket.Host,
      socket.HttpVersion,
      socket.LastActiveTime.ToString(),
      socket.LocalEndPoint.ToString(),
      socket.Method,
      socket.handshake.query.Path.ToString(),
      text2,
      socket.RemoteEndPoint.ToString(),
      socket.SecWebSocketProtocol,
      socket.SecWebSocketVersion,
      socket.id,
      socket.StartTime.ToString(),
      socket.Upgrade
    ];
    //let text5 = AddHandShek.AddHandShek(list);
    next();
  }
}

function ComputeWebSocketHandshakeSecurityHash09(secWebSocketKey)
{
    let s = secWebSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    const hash = crypto.createHash('sha1').update(s).digest();
    const utf8Hash = hash.toString('utf-8'); 
    const base64Hash = utf8Hash.toString('base64');
    console.log('Base64 Hash:', base64Hash);
    return base64Hash;
}
/*
sockserver.on('connection', ws => {
 console.log('New client connected!',ws);
 ws.send('connection established')
 ws.on('close', () => console.log('Client has disconnected!'))
 ws.on('message', data => {
  console.log("data:-",data);
   sockserver.clients.forEach(client => {
     console.log(`distributing message: ${data}`)
     client.send(`${data}`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})*/

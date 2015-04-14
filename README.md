#TO DO
## Frontend
### Build analyze interface
![alt text](https://raw.githubusercontent.com/mvanlonden/openBrain-client/master/docs/images/2015-02-22%2001.07.13.jpg "Interface Sketch")
- Application list is not shown but could resemble session list
- Should link to exsisting menu

### Design annotation mechanism

### Test components are linked to endpoints

### Add inline documentation


## Backend
### Persistence
- implement [InfluxDB](http://influxdb.com/) for saving sessions
- implement tree store for saving user data

### Endpoints
user
- /user/:userId
```
{
  id: 23,
  username: 'Brain N3rd',
  sessions: [{
    id: 102,
    recordedAt: 1428100695,
    duration: 4803,
    activity: 'Brushing Teeth'
  }, ...],
  applications: [{
    id: 3024,
    name: 'Same Wave Length',
    sessions: [{
      id: 34,
      recordedAt: 1428100695,
      duration: 4803,
      activity: 'Brushing Teeth'
    }, ...]
  }, ...],
  following: [{
    id: 2,
    username: 'Cortexifier'
  }, ...]
}
```
- /user/:userId/sessions
- /user/:userId/applications

application
returns applications for logged in user
- /application 
- /application/:applicationId
```
{
 id: 3024,
 name: 'Same Wave Length',
 collaborators: [{
  id: 2,
  username: 'Cortexifier'
 }, ...], 
 sessions: [{
   id: 34,
   recordedAt: 1428100695,
   duration: 4803,
   activity: 'Brushing Teeth'
 }, ...]
}
```
- /application/:applicationId/sessions
- /application/:applicationId/collaborators

session
returns sessions for logged in user
- /session
- /session/:sessionId
```
{
  id: 3021,
  recordedAt: 1428100695,
  duration: 4803,
  activity: 'Brushing Teeth',
  annotations: [{
    time: 204,
    event: 'Rinsed toothbrush'
  }, ...],
  channels: [data, ...],
  tags: [
    'hygiene',
    'water',
    'dental'
  ]
}
```

- /session/:sessionId/channels
- /session/:sessionId/annotations
- /session/?tags=:tag

### Ontology
![alt text](https://raw.githubusercontent.com/mvanlonden/openBrain-client/master/docs/images/2015-02-22%2001.07.08.jpg "Ontology")

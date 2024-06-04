## 0.18.1
- fixed header assign order

## 0.18.0
- added support of GraphQL along with specific steps:
  - _I create GraphQL request {string}_
  - _I add {gqlRequestProperty} to GraphQL {string}:_

## 0.17.0
- added experimental support of websockets (API may change in future)

Breaking Change
- migrated to native fetch
- dropped support of node16

## 0.16.0
- removed chai from dependencies
- fixed issue with attaching non string responses

## 0.15.0
- added request/response logging
- fixed issue with optional contentType and filename in form data step

## 0.0.14
- added undefined payload handler
- added _I add form data body_ step
- added match schema validation
  
## 0.0.13
- added construction api steps

## 0.0.12
- added logs to validation steps
- removed hook

## 0.0.11
- added step for parsing response body with needed type

## 0.0.10
- removed headers parameter type. Moved logic step signature

## 0.0.9
- removed JSON stringify from body send

## 0.0.7
- fixed step definition for sending requests with requestBody as DOC Cucumber String 
- added step definition to verify response status message
- added e2e test

## 0.0.6
- :beetle: fixed issue with api service import

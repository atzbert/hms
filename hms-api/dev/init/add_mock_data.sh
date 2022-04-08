#!/bin/bash
# TODO make it so this script also clears out the DB before putting data in

PUT='aws --endpoint-url=http://localhost:4566 --region eu-central-1 dynamodb put-item'

$PUT --table-name hackathon --item '{
    "id": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "title": {"S": "Previous Hackathon"},
    "startDate": {"S": "2021-12-13"},
    "endDate": {"S": "2021-12-17"},
    "creationDate": {"S": "2021-10-19"},
    "participants": {"SS": [
      "16a43590-c7ba-4bb1-81d0-b726dea47b6e",
      "4e80138c-ed15-4947-ad18-15afa6af4adf",
      "bc7edc4c-d840-4521-8666-505946ff6ecf"
    ]},
    "categories": {"SS": [
      "7f38993d-073a-4932-af79-07440012f268",
      "a8ce5468-ec97-4b99-acea-511c54817956"
    ]},
    "ideas": {"SS": [
      "e1e24282-b98a-4b8a-95e8-d08ea8400061",
      "ea34c250-1edf-4059-9a5a-3d73898044be",
      "f67d7491-e919-4575-80ed-48af66d6b687",
      "d67af6fc-9e08-4020-bff2-9dca7a0e2017",
      "5e427cab-19c7-41d0-b223-4e0927e014b9"
    ]}
}'

$PUT --table-name hackathon --item '{
    "id": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "title": {"S": "Current Hackathon"},
    "startDate": {"S": "2022-04-04"},
    "endDate": {"S": "2022-04-08"},
    "creationDate": {"S": "2022-01-14"},
    "participants": {"SS": [
      "e27fb873-fd63-4c43-a00b-4593a3662953",
      "d73e9d79-7ebb-400c-ac3a-5de35c509eb9",
      "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8",
      "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6",
      "403d2770-f7d2-4aa0-8c58-b711ad09f169"
    ]},
    "categories": {"SS": [
      "52c0bbde-6360-451c-bf50-b56694f56053"
    ]},
    "ideas": {"SS": [
      "cd760a62-6c79-44f0-96f0-f2e87bd5f169",
      "58ee0b24-7087-49ab-b0c9-8b9f58110ae4",
      "2ea43759-7580-4331-b31b-d5a206937662",
      "eb4551ef-17b1-4808-8d5c-e472b21df76f",
      "a4d30e2d-1764-4bb5-ab99-866b7391a4e4",
      "d4c7a584-a399-4c02-8f60-a20ff4d997c0",
      "6d9be287-038d-4b8a-a005-bc4e64e6ac48",
      "5c0b9191-ac63-44be-8c68-b5c9888643af",
      "e64163a6-d20e-40d7-a69a-aba4ee82410d"
    ]}
}'

$PUT --table-name hackathon --item '{
    "id": {"S": "a1c60aba-f846-4208-b4b8-1caaec031aea"},
    "title": {"S": "Next Hackathon"},
    "startDate": {"S": "2022-08-15"},
    "endDate": {"S": "2022-08-19"},
    "creationDate": {"S": "2022-03-01"},
    "participants": {"NULL": true},
    "categories": {"SS": [
      "e499b34e-fda9-4f66-949a-46e0300b9d08",
      "c9897c51-2e0b-47d7-b9a7-5572e990d02b",
      "4be5c953-b871-40e3-b0cc-d2a7c929b519"
    ]},
    "ideas": {"NULL": true}
}'

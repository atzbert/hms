#!/bin/bash
# TODO make it so this script also clears out the DB before putting data in

PUT='aws --endpoint-url=http://localhost:4566 --region eu-central-1 dynamodb put-item '

$PUT --table-name hackathon --item '{
    "id": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "title": {"S": "Previous Hackathon"},
    "startDate": {"S": "2021-12-13"},
    "endDate": {"S": "2021-12-17"},
    "creationDate": {"S": "2021-10-19"},
    "participantIds": {"SS": [
      "16a43590-c7ba-4bb1-81d0-b726dea47b6e",
      "4e80138c-ed15-4947-ad18-15afa6af4adf",
      "bc7edc4c-d840-4521-8666-505946ff6ecf"
    ]},
    "categoryIds": {"SS": [
      "7f38993d-073a-4932-af79-07440012f268",
      "a8ce5468-ec97-4b99-acea-511c54817956"
    ]},
    "ideaIds": {"SS": [
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
    "participantIds": {"SS": [
      "e27fb873-fd63-4c43-a00b-4593a3662953",
      "d73e9d79-7ebb-400c-ac3a-5de35c509eb9",
      "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8",
      "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6",
      "403d2770-f7d2-4aa0-8c58-b711ad09f169"
    ]},
    "categoryIds": {"SS": [
      "52c0bbde-6360-451c-bf50-b56694f56053"
    ]},
    "ideaIds": {"SS": [
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
    "participantIds": {"NULL": true},
    "categoryIds": {"SS": [
      "e499b34e-fda9-4f66-949a-46e0300b9d08",
      "c9897c51-2e0b-47d7-b9a7-5572e990d02b",
      "4be5c953-b871-40e3-b0cc-d2a7c929b519"
    ]},
    "ideaIds": {"NULL": true}
}'

$PUT --table-name category --item '{
    "id": {"S": "7f38993d-073a-4932-af79-07440012f268"},
    "title": {"S": "Bears and Bees"},
    "description": {"S": "Just cool bears and bee focused projects"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"}
}'

$PUT --table-name category --item '{
    "id": {"S": "a8ce5468-ec97-4b99-acea-511c54817956"},
    "title": {"S": "Tech stuff"},
    "description": {"S": "Generic tech stuff projects"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"}
}'

$PUT --table-name category --item '{
    "id": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "title": {"S": "All in one bucket"},
    "description": {"S": "Just a single category for everything in this hackathon"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"}
}'

$PUT --table-name category --item '{
    "id": {"S": "e499b34e-fda9-4f66-949a-46e0300b9d08"},
    "title": {"S": "Another fun category"},
    "description": {"S": "For just fun stuff, you know like shoes and knives"},
    "hackathonId": {"S": "a1c60aba-f846-4208-b4b8-1caaec031aea"}
}'

$PUT --table-name category --item '{
    "id": {"S": "c9897c51-2e0b-47d7-b9a7-5572e990d02b"},
    "title": {"S": "An even BETTER category"},
    "description": {"S": "Filling out this information really takes a long time"},
    "hackathonId": {"S": "a1c60aba-f846-4208-b4b8-1caaec031aea"}
}'

$PUT --table-name category --item '{
    "id": {"S": "4be5c953-b871-40e3-b0cc-d2a7c929b519"},
    "title": {"S": "A pretty bland category"},
    "description": {"S": "Oh good, the last category to write a description for"},
    "hackathonId": {"S": "a1c60aba-f846-4208-b4b8-1caaec031aea"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "e1e24282-b98a-4b8a-95e8-d08ea8400061"},
    "ownerId": {"S": "16a43590-c7ba-4bb1-81d0-b726dea47b6e"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "participantIds": {"SS": ["16a43590-c7ba-4bb1-81d0-b726dea47b6e"]},
    "title": {"S": "A really cool idea about bears!"},
    "description": {"S": "Ulysses, Ulysses — Soaring through all the galaxies. In search of Earth, flying in to the night. Ulysses, Ulysses — Fighting evil and tyranny, with all his power, and with all of his might. Ulysses — no-one else can do the things you do. Ulysses — like a bolt of thunder from the blue. Ulysses — always fighting all the evil forces bringing peace and justice to all."},
    "problem": {"S": "Not enough bears"},
    "goal": {"S": "Have more bears"},
    "requiredSkills": {"SS": ["0c27e6c6-4a33-4b1f-a15e-46a8bed218e8"]},
    "categoryId": {"S": "7f38993d-073a-4932-af79-07440012f268"},
    "creationDate": {"S": "2021-12-01"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "ea34c250-1edf-4059-9a5a-3d73898044be"},
    "ownerId": {"S": "16a43590-c7ba-4bb1-81d0-b726dea47b6e"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "participantIds": {"SS": ["16a43590-c7ba-4bb1-81d0-b726dea47b6e", "4e80138c-ed15-4947-ad18-15afa6af4adf"]},
    "title": {"S": "A really cool idea about bees!"},
    "description": {"S": "One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, it'"'"'s a pretty story. Sharing everything with fun, that'"'"'s the way to be. One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, can sound pretty corny. If you'"'"'ve got a problem chum, think how it could be."},
    "problem": {"S": "Too many bees"},
    "goal": {"S": "Have less bees"},
    "requiredSkills": {"SS": ["7242a9e2-8af9-40c1-aa4c-af76faa013ca"]},
    "categoryId": {"S": "7f38993d-073a-4932-af79-07440012f268"},
    "creationDate": {"S": "2021-12-04"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "f67d7491-e919-4575-80ed-48af66d6b687"},
    "ownerId": {"S": "4e80138c-ed15-4947-ad18-15afa6af4adf"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "participantIds": {"SS": ["4e80138c-ed15-4947-ad18-15afa6af4adf"]},
    "title": {"S": "A really cool bleeding edge tech idea!"},
    "description": {"S": "Hey there where ya goin'"'"', not exactly knowin'"'"', who says you have to call just one place home. He'"'"'s goin'"'"' everywhere, B.J. McKay and his best friend Bear. He just keeps on movin'"'"', ladies keep improvin'"'"', every day is better than the last. New dreams and better scenes, and best of all I don'"'"'t pay property tax. Rollin'"'"' down to Dallas, who'"'"'s providin'"'"' my palace, off to New Orleans or who knows where. Places new and ladies, too, I'"'"'m B.J. McKay and this is my best friend Bear."},
    "problem": {"S": "Wanna do something with ML"},
    "goal": {"S": "Obviously have another pointless ML project"},
    "requiredSkills": {"SS": ["c02e0957-610e-43eb-8c37-651afc208c8f", "5e283cba-3ed6-4c2a-ad11-4d269fce3d43"]},
    "categoryId": {"S": "a8ce5468-ec97-4b99-acea-511c54817956"},
    "creationDate": {"S": "2021-12-05"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "d67af6fc-9e08-4020-bff2-9dca7a0e2017"},
    "ownerId": {"S": "bc7edc4c-d840-4521-8666-505946ff6ecf"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "participantIds": {"SS": ["bc7edc4c-d840-4521-8666-505946ff6ecf", "16a43590-c7ba-4bb1-81d0-b726dea47b6e"]},
    "title": {"S": "One of those ones that is really just a presentation"},
    "description": {"S": "There'"'"'s a voice that keeps on calling me. Down the road, that'"'"'s where I'"'"'ll always be. Every stop I make, I make a new friend. Can'"'"'t stay for long, just turn around and I'"'"'m gone again. Maybe tomorrow, I'"'"'ll want to settle down, Until tomorrow, I'"'"'ll just keep moving on."},
    "problem": {"S": "Not enough nice powerpoints"},
    "goal": {"S": "Make a kickass powerpoint"},
    "requiredSkills": {"SS": ["c02e0957-610e-43eb-8c37-651afc208c8f", "dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c"]},
    "categoryId": {"S": "a8ce5468-ec97-4b99-acea-511c54817956"},
    "creationDate": {"S": "2021-12-06"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "5e427cab-19c7-41d0-b223-4e0927e014b9"},
    "ownerId": {"S": "4e80138c-ed15-4947-ad18-15afa6af4adf"},
    "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
    "participantIds": {"SS": ["bc7edc4c-d840-4521-8666-505946ff6ecf", "4e80138c-ed15-4947-ad18-15afa6af4adf"]},
    "title": {"S": "Write software for a thing"},
    "description": {"S": "Mutley, you snickering, floppy eared hound. When courage is needed, you'"'"'re never around. Those medals you wear on your moth-eaten chest should be there for bungling at which you are best. So, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him, jab him, tab him, grab him, stop that pigeon now."},
    "problem": {"S": "They don'"'"'t make software like they did in my day"},
    "goal": {"S": "Have nice software"},
    "requiredSkills": {"SS": ["c02e0957-610e-43eb-8c37-651afc208c8f"]},
    "categoryId": {"S": "7f38993d-073a-4932-af79-07440012f268"},
    "creationDate": {"S": "2021-12-09"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "cd760a62-6c79-44f0-96f0-f2e87bd5f169"},
    "ownerId": {"S": "e27fb873-fd63-4c43-a00b-4593a3662953"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["e27fb873-fd63-4c43-a00b-4593a3662953", "d73e9d79-7ebb-400c-ac3a-5de35c509eb9", "403d2770-f7d2-4aa0-8c58-b711ad09f169"]},
    "title": {"S": "Making sweet party hats for bees"},
    "description": {"S": "Hong Kong Phooey, number one super guy. Hong Kong Phooey, quicker than the human eye. He'"'"'s got style, a groovy style, and a car that just won'"'"'t stop. When the going gets tough, he'"'"'s really rough, with a Hong Kong Phooey chop (Hi-Ya!). Hong Kong Phooey, number one super guy. Hong Kong Phooey, quicker than the human eye. Hong Kong Phooey, he'"'"'s fan-riffic!"},
    "problem": {"S": "Bees like to party but have no hats"},
    "goal": {"S": "Have tiny hats for bees"},
    "requiredSkills": {"SS": ["dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c", "7242a9e2-8af9-40c1-aa4c-af76faa013ca"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-03-28"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "58ee0b24-7087-49ab-b0c9-8b9f58110ae4"},
    "ownerId": {"S": "d73e9d79-7ebb-400c-ac3a-5de35c509eb9"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["e27fb873-fd63-4c43-a00b-4593a3662953", "d73e9d79-7ebb-400c-ac3a-5de35c509eb9", "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6", "403d2770-f7d2-4aa0-8c58-b711ad09f169"]},
    "title": {"S": "Bears that look like bees"},
    "description": {"S": "Children of the sun, see your time has just begun, searching for your ways, through adventures every day. Every day and night, with the condor in flight, with all your friends in tow, you search for the Cities of Gold. Ah-ah-ah-ah-ah… wishing for The Cities of Gold. Ah-ah-ah-ah-ah… some day we will find The Cities of Gold. Do-do-do-do ah-ah-ah, do-do-do-do, Cities of Gold. Do-do-do-do, Cities of Gold. Ah-ah-ah-ah-ah… some day we will find The Cities of Gold."},
    "problem": {"S": "Bears don'"'"'t look like bees"},
    "goal": {"S": "Make bears that look like bees"},
    "requiredSkills": {"SS": ["7242a9e2-8af9-40c1-aa4c-af76faa013ca", "0c27e6c6-4a33-4b1f-a15e-46a8bed218e8"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-03-29"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "2ea43759-7580-4331-b31b-d5a206937662"},
    "ownerId": {"S": "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["e27fb873-fd63-4c43-a00b-4593a3662953", "d73e9d79-7ebb-400c-ac3a-5de35c509eb9", "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8"]},
    "title": {"S": "Bees that look like bears"},
    "description": {"S": "80 days around the world, we'"'"'ll find a pot of gold just sitting where the rainbow'"'"'s ending. Time — we'"'"'ll fight against the time, and we'"'"'ll fly on the white wings of the wind. 80 days around the world, no we won'"'"'t say a word before the ship is really back. Round, round, all around the world. Round, all around the world. Round, all around the world. Round, all around the world."},
    "problem": {"S": "Bees aren'"'"'t nearly scary enough"},
    "goal": {"S": "Have horrifying bear like bees"},
    "requiredSkills": {"SS": ["7242a9e2-8af9-40c1-aa4c-af76faa013ca", "0c27e6c6-4a33-4b1f-a15e-46a8bed218e8"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-01"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "eb4551ef-17b1-4808-8d5c-e472b21df76f"},
    "ownerId": {"S": "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["e27fb873-fd63-4c43-a00b-4593a3662953", "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6"]},
    "title": {"S": "Backend software for feet"},
    "description": {"S": "Thundercats are on the move, Thundercats are loose. Feel the magic, hear the roar, Thundercats are loose. Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thundercats!"},
    "problem": {"S": "Feet don'"'"'t have enough purpose built software"},
    "goal": {"S": "Make a cool app for feet"},
    "requiredSkills": {"SS": ["5e283cba-3ed6-4c2a-ad11-4d269fce3d43"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-01"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "a4d30e2d-1764-4bb5-ab99-866b7391a4e4"},
    "ownerId": {"S": "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["d73e9d79-7ebb-400c-ac3a-5de35c509eb9", "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6"]},
    "title": {"S": "Frontend software for hands"},
    "description": {"S": "There'"'"'s a voice that keeps on calling me. Down the road, that'"'"'s where I'"'"'ll always be. Every stop I make, I make a new friend. Can'"'"'t stay for long, just turn around and I'"'"'m gone again. Maybe tomorrow, I'"'"'ll want to settle down, Until tomorrow, I'"'"'ll just keep moving on."},
    "problem": {"S": "Hands don'"'"'t have enough purpose built software"},
    "goal": {"S": "Make a cool app for hands"},
    "requiredSkills": {"SS": ["c02e0957-610e-43eb-8c37-651afc208c8f"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-01"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "d4c7a584-a399-4c02-8f60-a20ff4d997c0"},
    "ownerId": {"S": "403d2770-f7d2-4aa0-8c58-b711ad09f169"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["403d2770-f7d2-4aa0-8c58-b711ad09f169"]},
    "title": {"S": "Just like mock data idk"},
    "description": {"S": "Mutley, you snickering, floppy eared hound. When courage is needed, you'"'"'re never around. Those medals you wear on your moth-eaten chest should be there for bungling at which you are best. So, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him, jab him, tab him, grab him, stop that pigeon now."},
    "problem": {"S": "We need test data"},
    "goal": {"S": "We will have test data"},
    "requiredSkills": {"SS": ["dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c", "5e283cba-3ed6-4c2a-ad11-4d269fce3d43", "c02e0957-610e-43eb-8c37-651afc208c8f"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-02"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "6d9be287-038d-4b8a-a005-bc4e64e6ac48"},
    "ownerId": {"S": "d73e9d79-7ebb-400c-ac3a-5de35c509eb9"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["d73e9d79-7ebb-400c-ac3a-5de35c509eb9", "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8", "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6"]},
    "title": {"S": "Always good do have more test data"},
    "description": {"S": "One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, it'"'"'s a pretty story. Sharing everything with fun, that'"'"'s the way to be. One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, can sound pretty corny. If you'"'"'ve got a problem chum, think how it could be."},
    "problem": {"S": "We REALLY need test data"},
    "goal": {"S": "We will have test data"},
    "requiredSkills": {"SS": ["0c27e6c6-4a33-4b1f-a15e-46a8bed218e8", "dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c", "c02e0957-610e-43eb-8c37-651afc208c8f"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-03"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "5c0b9191-ac63-44be-8c68-b5c9888643af"},
    "ownerId": {"S": "e27fb873-fd63-4c43-a00b-4593a3662953"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["e27fb873-fd63-4c43-a00b-4593a3662953", "d73e9d79-7ebb-400c-ac3a-5de35c509eb9", "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8", "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6", "403d2770-f7d2-4aa0-8c58-b711ad09f169"]},
    "title": {"S": "Really cool software headbands for animals"},
    "description": {"S": "Knight Rider, a shadowy flight into the dangerous world of a man who does not exist. Michael Knight, a young loner on a crusade to champion the cause of the innocent, the helpless in a world of criminals who operate above the law."},
    "problem": {"S": "Animals don'"'"'t have cool enough headbands"},
    "goal": {"S": "Really stylish animals"},
    "requiredSkills": {"SS": ["0c27e6c6-4a33-4b1f-a15e-46a8bed218e8", "7242a9e2-8af9-40c1-aa4c-af76faa013ca", "dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c", "5e283cba-3ed6-4c2a-ad11-4d269fce3d43", "c02e0957-610e-43eb-8c37-651afc208c8f"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-03"}
}'

$PUT --table-name idea --item '{
    "id": {"S": "e64163a6-d20e-40d7-a69a-aba4ee82410d"},
    "ownerId": {"S": "e27fb873-fd63-4c43-a00b-4593a3662953"},
    "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
    "participantIds": {"SS": ["e27fb873-fd63-4c43-a00b-4593a3662953"]},
    "title": {"S": "Just a task no one wants to do"},
    "description": {"S": "There'"'"'s a voice that keeps on calling me. Down the road, that'"'"'s where I'"'"'ll always be. Every stop I make, I make a new friend. Can'"'"'t stay for long, just turn around and I'"'"'m gone again. Maybe tomorrow, I'"'"'ll want to settle down, Until tomorrow, I'"'"'ll just keep moving on."},
    "problem": {"S": "Just like whatever"},
    "goal": {"S": "Just stuff"},
    "requiredSkills": {"SS": ["c02e0957-610e-43eb-8c37-651afc208c8f"]},
    "categoryId": {"S": "52c0bbde-6360-451c-bf50-b56694f56053"},
    "creationDate": {"S": "2022-04-04"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "16a43590-c7ba-4bb1-81d0-b726dea47b6e"},
  "userId": {"S": "629f52c9-df29-491b-82a4-bdd80806338d"},
  "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
  "creationDate": {"S": "2021-03-02"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "4e80138c-ed15-4947-ad18-15afa6af4adf"},
  "userId": {"S": "c3480d57-5670-4364-b0cc-9038a83de628"},
  "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
  "creationDate": {"S": "2021-03-03"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "bc7edc4c-d840-4521-8666-505946ff6ecf"},
  "userId": {"S": "c16785af-d7bd-442c-b3f5-257fad9ad2ac"},
  "hackathonId": {"S": "e955fe4b-7ce7-4904-ae6f-22a8985f74a8"},
  "creationDate": {"S": "2021-03-03"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "e27fb873-fd63-4c43-a00b-4593a3662953"},
  "userId": {"S": "629f52c9-df29-491b-82a4-bdd80806338d"},
  "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
  "creationDate": {"S": "2022-02-01"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "d73e9d79-7ebb-400c-ac3a-5de35c509eb9"},
  "userId": {"S": "c3480d57-5670-4364-b0cc-9038a83de628"},
  "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
  "creationDate": {"S": "2022-02-01"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "fdc15363-ef3c-4ffa-a764-34ca3b4f5bd8"},
  "userId": {"S": "c34a519a-be46-410c-828e-0f806cfca620"},
  "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
  "creationDate": {"S": "2022-02-21"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "dd4596c0-911a-49a9-826f-0b6ec8a2d0b6"},
  "userId": {"S": "f6fa2b8e-68ed-4486-b8df-f93b87ff23e5"},
  "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
  "creationDate": {"S": "2022-02-24"}
}'

$PUT --table-name participant --item '{
  "id": {"S": "403d2770-f7d2-4aa0-8c58-b711ad09f169"},
  "userId": {"S": "9b184ff3-8b63-4807-a3c6-89973c126d75"},
  "hackathonId": {"S": "4eb2d486-c786-431e-a4fd-4c093ed30642"},
  "creationDate": {"S": "2022-03-07"}
}'

$PUT --table-name user --item '{
  "id": {"S": "629f52c9-df29-491b-82a4-bdd80806338d"},
  "firstName": {"S": "Greg"},
  "lastName": {"S": "Greggson"},
  "emailAddress": {"S": "greg.greggson@internet.com"},
  "roles": {"SS": ["Admin", "Participant"]},
  "skills": {"SS": ["c02e0957-610e-43eb-8c37-651afc208c8f", "5e283cba-3ed6-4c2a-ad11-4d269fce3d43"]},
  "imageUrl": {"S": ""},
  "creationDate": {"S": "2021-03-01"}
}'

$PUT --table-name user --item '{
  "id": {"S": "c3480d57-5670-4364-b0cc-9038a83de628"},
  "firstName": {"S": "Susy"},
  "lastName": {"S": "Q"},
  "emailAddress": {"S": "susy.q@internet.com"},
  "roles": {"SS": ["Participant"]},
  "skills": {"SS": ["0c27e6c6-4a33-4b1f-a15e-46a8bed218e8", "5e283cba-3ed6-4c2a-ad11-4d269fce3d43"]},
  "imageUrl": {"S": ""},
  "creationDate": {"S": "2021-03-02"}
}'

$PUT --table-name user --item '{
  "id": {"S": "c16785af-d7bd-442c-b3f5-257fad9ad2ac"},
  "firstName": {"S": "Dart"},
  "lastName": {"S": "Mouth"},
  "emailAddress": {"S": "dart.mouth@internet.com"},
  "roles": {"SS": ["Participant"]},
  "skills": {"SS": ["dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c", "c02e0957-610e-43eb-8c37-651afc208c8f", "5e283cba-3ed6-4c2a-ad11-4d269fce3d43"]},
  "imageUrl": {"S": ""},
  "creationDate": {"S": "2021-03-03"}
}'

$PUT --table-name user --item '{
  "id": {"S": "c34a519a-be46-410c-828e-0f806cfca620"},
  "firstName": {"S": "Cor"},
  "lastName": {"S": "Nell"},
  "emailAddress": {"S": "cor.nell@internet.com"},
  "roles": {"SS": ["Participant"]},
  "skills": {"SS": ["7242a9e2-8af9-40c1-aa4c-af76faa013ca", "beer handling", "dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c"]},
  "imageUrl": {"S": ""},
  "creationDate": {"S": "2021-03-03"}
}'

$PUT --table-name user --item '{
  "id": {"S": "f6fa2b8e-68ed-4486-b8df-f93b87ff23e5"},
  "firstName": {"S": "Baldy"},
  "lastName": {"S": "McBaldhead"},
  "emailAddress": {"S": "baldy.mcbaldhead@internet.com"},
  "roles": {"SS": ["Participant"]},
  "skills": {"SS": ["7242a9e2-8af9-40c1-aa4c-af76faa013ca", "dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c"]},
  "imageUrl": {"S": ""},
  "creationDate": {"S": "2021-03-05"}
}'

$PUT --table-name user --item '{
  "id": {"S": "9b184ff3-8b63-4807-a3c6-89973c126d75"},
  "firstName": {"S": "Micheal"},
  "lastName": {"S": "Scott"},
  "emailAddress": {"S": "m.g.s@internet.com"},
  "roles": {"SS": ["Participant"]},
  "skills": {"NULL": true},
  "imageUrl": {"S": ""},
  "creationDate": {"S": "2021-03-06"}
}'

$PUT --table-name skill --item '{
  "id": {"S": "c02e0957-610e-43eb-8c37-651afc208c8f"},
  "name": {"S": "frontend"},
  "description": {"S": "Pretty programming"}
}'

$PUT --table-name skill --item '{
  "id": {"S": "5e283cba-3ed6-4c2a-ad11-4d269fce3d43"},
  "name": {"S": "backend"},
  "description": {"S": "Programming for the basement kids"}
}'

$PUT --table-name skill --item '{
  "id": {"S": "dc6a6f0b-06bf-46cb-b8b1-1c3c17db197c"},
  "name": {"S": "design"},
  "description": {"S": "Designing things and making them pretty"}
}'

$PUT --table-name skill --item '{
  "id": {"S": "0c27e6c6-4a33-4b1f-a15e-46a8bed218e8"},
  "name": {"S": "bear handling"},
  "description": {"S": "You can handle bears... without getting eaten"}
}'

$PUT --table-name skill --item '{
  "id": {"S": "7242a9e2-8af9-40c1-aa4c-af76faa013ca"},
  "name": {"S": "bee handling"},
  "description": {"S": "You can handle bees... and not get stung too much"}
}'


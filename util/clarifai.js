const {ClarifaiStub} = require("clarifai-nodejs-grpc");
const grpc = require("@grpc/grpc-js");
const configure = require("../configure").clarifai;
const stub = ClarifaiStub.json();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key "+configure.key);

class Clarifal{
    constructor(){

    }

    recognizeImage(imageUrl,callback){
        stub.PostModelOutputs(
            {
                model_id: "aaa03c23b3724a16a56b629203edc62c", 
                inputs: [
                    {data: {image: {url: imageUrl}}}
                ]
            },
            metadata,
            (err, response) => {
                if (err) {
                    console.log(response);
                    console.log(err);
                }else if (response.status.code !== 10000) {
                    console.log(response);
                    console.log(response.outputs.status);
                    console.log(response.outputs.model);
                    console.log(response.outputs.input);
                    console.log("Post model outputs failed, status: " + response.status.description);
                }else{
                    callback(response);
                }
            }
        );
    }
}

module.exports = new Clarifal();


// Response Json
// {
//     "status": {
//       "code": 10000,
//       "description": "Ok"
//     },
//     "outputs": [
//       {
//         "id": "ea68cac87c304b28a8046557062f34a0",
//         "status": {
//           "code": 10000,
//           "description": "Ok"
//         },
//         "created_at": "2016-11-22T16:50:25Z",
//         "model": {
//           "name": "general-v1.3",
//           "id": "aaa03c23b3724a16a56b629203edc62c",
//           "created_at": "2016-03-09T17:11:39Z",
//           "app_id": null,
//           "output_info": {
//             "message": "Show output_info with: GET /models/{model_id}/output_info",
//             "type": "concept"
//           },
//           "model_version": {
//             "id": "aa9ca48295b37401f8af92ad1af0d91d",
//             "created_at": "2016-07-13T01:19:12Z",
//             "status": {
//               "code": 21100,
//               "description": "Model trained successfully"
//             }
//           }
//         },
//         "input": {
//           "id": "ea68cac87c304b28a8046557062f34a0",
//           "data": {
//             "image": {
//               "url": "https://samples.clarifai.com/metro-north.jpg"
//             }
//           }
//         },
//         "data": {
//           "concepts": [
//             {
//               "id": "ai_HLmqFqBf",
//               "name": "train",
//               "app_id": null,
//               "value": 0.9989112
//             },
//             {
//               "id": "ai_fvlBqXZR",
//               "name": "railway",
//               "app_id": null,
//               "value": 0.9975532
//             },
//             {
//               "id": "ai_Xxjc3MhT",
//               "name": "transportation system",
//               "app_id": null,
//               "value": 0.9959158
//             },
//             {
//               "id": "ai_6kTjGfF6",
//               "name": "station",
//               "app_id": null,
//               "value": 0.992573
//             },
//             {
//               "id": "ai_RRXLczch",
//               "name": "locomotive",
//               "app_id": null,
//               "value": 0.992556
//             },
//             {
//               "id": "ai_VRmbGVWh",
//               "name": "travel",
//               "app_id": null,
//               "value": 0.98789215
//             },
//             {
//               "id": "ai_SHNDcmJ3",
//               "name": "subway system",
//               "app_id": null,
//               "value": 0.9816359
//             },
//             {
//               "id": "ai_jlb9q33b",
//               "name": "commuter",
//               "app_id": null,
//               "value": 0.9712483
//             },
//             {
//               "id": "ai_46lGZ4Gm",
//               "name": "railroad track",
//               "app_id": null,
//               "value": 0.9690325
//             },
//             {
//               "id": "ai_tr0MBp64",
//               "name": "traffic",
//               "app_id": null,
//               "value": 0.9687052
//             },
//             {
//               "id": "ai_l4WckcJN",
//               "name": "blur",
//               "app_id": null,
//               "value": 0.9667078
//             },
//             {
//               "id": "ai_2gkfMDsM",
//               "name": "platform",
//               "app_id": null,
//               "value": 0.9624243
//             },
//             {
//               "id": "ai_CpFBRWzD",
//               "name": "urban",
//               "app_id": null,
//               "value": 0.960752
//             },
//             {
//               "id": "ai_786Zr311",
//               "name": "no person",
//               "app_id": null,
//               "value": 0.95864904
//             },
//             {
//               "id": "ai_6lhccv44",
//               "name": "business",
//               "app_id": null,
//               "value": 0.95720303
//             },
//             {
//               "id": "ai_971KsJkn",
//               "name": "track",
//               "app_id": null,
//               "value": 0.9494642
//             },
//             {
//               "id": "ai_WBQfVV0p",
//               "name": "city",
//               "app_id": null,
//               "value": 0.94089437
//             },
//             {
//               "id": "ai_dSCKh8xv",
//               "name": "fast",
//               "app_id": null,
//               "value": 0.9399334
//             },
//             {
//               "id": "ai_TZ3C79C6",
//               "name": "road",
//               "app_id": null,
//               "value": 0.93121606
//             },
//             {
//               "id": "ai_VSVscs9k",
//               "name": "terminal",
//               "app_id": null,
//               "value": 0.9230834
//             }
//           ]
//         }
//       }
//     ]
//   }


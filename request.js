const axios = require('axios');
const fs = require("fs");
const readline = require("readline-sync");

axios.get('http://api.navgurukul.org/courses').then(cource_response => {
    const responce_data = cource_response.data;
    let serial_number = 1
    for (i in responce_data) {
        console.log(serial_number, responce_data[i]['name'], "(", responce_data[i]['id'], ")")
        serial_number++
    }
    user_InputCources = readline.question("...Enter the topic you want to read ");
    console.log(user_InputCources, responce_data[user_InputCources - 1]['name'], "(", responce_data[i]['id'], ")");
    axios.get("https://saral.navgurukul.org/api/courses/" + responce_data[user_InputCources - 1]['id'] + "/exercises").then(exercise_responce => {

        const resp = exercise_responce.data
        //THIS IS TO CREATE JSON FILE
        fs.writeFile('exercise.json', JSON.stringify(resp, null, 4), (err) => {
            if (err) throw err;
        })
        let SerialNumber = 1
        for (j in resp.data) {
            console.log(SerialNumber, resp["data"][j]["name"]);
            if (resp["data"][j]["childExercises"].length == 0) {
                SerialNumber++
                continue
                
                
            }
            else {
                let SNumber = 1
                for (k in resp["data"][j]["childExercises"]) {
                    console.log("       ", SNumber, resp["data"][j]["childExercises"][k]["name"]);
                    SNumber++
                }
            }
            SerialNumber++
        }
        let user_InputExercise = readline.question("...Enter the topic that you want to read ");
        console.log(user_InputExercise,  resp["data"][user_InputExercise - 1]["name"]);

        if (resp["data"][user_InputExercise - 1]["childExercises"].length == 0) {
            console.log("           ", resp["data"][user_InputExercise - 1]["slug"]);

            var slug = resp["data"][user_InputExercise - 1]["slug"]
            axios.get("https://saral.navgurukul.org/api/courses/" + responce_data[user_InputCources - 1]['id'] + "/exercise/getBySlug?slug=" + slug).then(res_slug => {
                slug_responce = res_slug.data
                //THIS IS TO CREATE JSON FILE
                fs.writeFile('slug.json', JSON.stringify(slug_responce, null, 4), (err) => {
                    if (err) throw err;
                });
                console.log("content:--", slug_responce["content"]);

            });


        }
        else {
            let SerialN = 1
            for (k in resp["data"][user_InputExercise - 1]["childExercises"]) {
                console.log("       ", SerialN, resp["data"][user_InputExercise - 1]["childExercises"][k]["name"]);
                SerialN++

            }
            let input_childExercise = readline.question("...Enter the childexercise topic ");
            var slug = resp["data"][user_InputExercise - 1]["childExercises"][input_childExercise - 1]["slug"]
            axios.get("https://saral.navgurukul.org/api/courses/" + responce_data[user_InputCources - 1]['id'] + "/exercise/getBySlug?slug=" + slug).then(res_slug => {
                slug_responce = res_slug.data
                //THIS IS TO CREATE JSON FILE
                fs.writeFile('slug.json', JSON.stringify(slug_responce, null, 4), (err) => {
                    if (err) throw err;
                });
                console.log("content:--", slug_responce["content"]);

            });
        }
    });
});

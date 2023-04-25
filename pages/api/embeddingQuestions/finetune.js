import openai, {Configuration, OpenAIApi} from 'openai';
import fs from 'fs';
import { promisify } from 'util';
//XMLHttpRequest
//FileReader
//filereader__WEBPACK_IMPORTED_MODULE_6__.FileReader is not a constructor


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openAIAPI = new OpenAIApi(configuration);
// Set up OpenAI API key
// openai.api_key = process.env.OPENAI_API_KEY;

// Define the fine-tuning parameters
const params = {
    model: 'text-davinci-003',
    prompt: '',
    temperature: 0.5,
    max_tokens: 1024,
    n_epochs: 3,
    n_examples: 1000,
    batch_size: 1,
    learning_rate: 1e-5,
    output_dir: 'fine-tuned-model'
};

export default async function (req, res) {
    
    const readFileAsync = promisify(fs.readFile);
    // public에 있는 dataset.json 파일을 읽어서 data에 저장
    const data = await readFileAsync('./public/dataset.jsonl', 'utf8');
    const dataset = data.split('\n').map(line => {
        if (!!line) {
            // console.log(line);
            return JSON.parse(line);
        }
    }).filter(line => !!line);
    // console.log(dataset, dataset.length)

    try {
        const response = await openAIAPI.createFile(
            fs.createReadStream("./public/dataset.jsonl"),
            "fine-tune"
        );

        // console.log('response : ', response);


        const datasetId = response.data.id;
        try {
            const response = await openAIAPI.createFineTune({
                training_file: datasetId,
            });
            // const res = await openAIAPI.createFineTune({
            //     // model: "text-davinci-003",
            //     // training_file: './public/dataset.jsonl',
            //     training_file: file
            //     // validation_file: [],
            // });
            console.log('res hhhhhh : ', response.data)
            console.log(response.data.organization_id);
        } catch (e) {
            console.log('error, ', e)
        }


        // Only absolute URLs are supported
        // fetch('./public/dataset.jsonl')
        //     .then(response => response.blob())
        //     .then(async blob => {
        //         const file = new File([blob], 'dataset.jsonl', {type: 'application/json'});
        //         const createFiles = await openAIAPI.createFile(
        //             file, 'fine-tune'
        //         );
        //         console.log('createFiles : ', createFiles)
        //     });


        // const finetunes = await openAIAPI.createFineTune({
        //     model: "text-davinci-003",
        //     training_file: file
        //     // training_file: datasetId
        //     // validation_file: [],
        // });
        // console.log('finetunes hhhhhh : ', finetunes)
        res.status(200).json({ success: true });
    } catch (e) {
        console.log('error, ', e)
        res.status(500).json({ success: false, error: e });
    }


    // try {
    //     // Create the dataset on the OpenAI API
    //     // const datasetResponse = await openai.datasets.upload({
    //     //     name: 'my-dataset',
    //     //     // data: dataset
    //     //     data: JSON.stringify(dataset)
    //     // });
    //     //dataset array만큼 datasetId를 생성해서 createFineTune 실행
    //
    //     for (const data1 of dataset) {
    //         const datasetResponse = await openAIAPI.createCompletion(
    //             {
    //                 model: "text-davinci-003",
    //                 prompt: data1.prompt
    //             }
    //         )
    //         console.log(datasetResponse.data.choices[0].text);
    //         // console.log('datasetResponse   ###### ', datasetResponse.data)
    //         const datasetId = datasetResponse.data.id;
    //         console.log('datasetId : ', datasetId);
            // try {
            //     const res = await openAIAPI.createFineTune({
            //         // model: "text-davinci-003",
            //         // training_file: './public/dataset.jsonl',
            //         training_file: file
            //         // validation_file: [],
            //     });
            //     console.log('res hhhhhh : ', res)
            //     console.log(res.data.choices[0].text);
            // } catch (e) {
            //     console.log('error, ', e)
            // }
    //
    //         // console.log('res : ', res)
    //     }
    //
    //     // const datasetResponse = await openAIAPI.createCompletion(
    //     //     {
    //     //         model: "text-davinci-003",
    //     //         // prompt: JSON.stringify(dataset)
    //     //         prompt: dataset
    //     //     }
    //     // )
    //     // console.log('datasetResponse   ###### ', datasetResponse)
    //     // const datasetId = datasetResponse.data.id;
    //     //
    //     // await openAIAPI.createFineTune({
    //     //     model: "text-davinci-003",
    //     //     training_file: datasetId
    //     // });
    //
    //     // Fine-tune the model on the dataset
    //     // await openai.fineTunes.create({
    //     //     model: params.model,
    //     //     dataset: datasetId,
    //     //     prompt: params.prompt,
    //     //     temperature: params.temperature,
    //     //     max_tokens: params.max_tokens,
    //     //     n_epochs: params.n_epochs,
    //     //     n_examples: params.n_examples,
    //     //     batch_size: params.batch_size,
    //     //     learning_rate: params.learning_rate,
    //     //     output_dir: params.output_dir
    //     // });
    //
    //     res.status(200).json({ success: true });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, error: error.message });
    // }
}
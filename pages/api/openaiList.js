import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openAIAPI = new OpenAIApi(configuration);

export default async function (req, res) {
    
    try {
    // finetune list 모델
    const responseOfListFineTunes = await openai.listFineTunes();
    console.log('responseOfListFineTunes ', responseOfListFineTunes.data);

    // list model 호출
    const responseOfList = await openai.listModels();
    console.log('responseOfList ', responseOfList.data);
    res.status(200).json({ fineTunes: responseOfListFineTunes.data.choices[0].text, listModels: responseOfList.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}
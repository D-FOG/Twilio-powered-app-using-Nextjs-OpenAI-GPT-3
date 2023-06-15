import {Configuration, OpenAIApi} from 'openai'
export default async function postMethod(req, res){
    const {name, message, messageTitle} = JSON.parse(req.body);
    const endPoint = './data.js';
    const configuration = new Configuration({
        apiKey: process.env.openAiKey,
    })
    const openai = new OpenAIApi(configuration);
    const prompt = `${message} to ${name} with title ${messageTitle}`;
    try{
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 0,
            max_tokens: 100,
            n: 1,
        });

        const textOutput = response.data.choices;       
        const textData = textOutput[0].text;
        console.log(textOutput);
        console.log('main data: ',textData)
        console.log('from frontend: ', message);
        
        res.status(200).json({ textData });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'An error occured while fetcing from openAI'});
    }
}
    
    

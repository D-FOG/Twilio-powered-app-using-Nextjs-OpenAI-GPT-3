// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import twilio from 'twilio'
import axios from 'axios'
export default async function postMethod(req, res){
    //const body1 = await fetch('../index.js');
    const {number,text} = JSON.parse(req.body)
    // //const data1 = await data1.json();
    // const data2 = response2.data;
    // const {message} = JSON.parse(data2)

    const authToken = process.env.AuthToken
    const accountSID = process.env.AccountSID
    const client = twilio(accountSID, authToken)

    // const bothData = {
    //     //data1,
    //     data2
    // }

    //const data1 = req.body;
    //const {name, number, messageTitle} = JSON.parse(req.body1);
   // console.log(`my body is: ${body1} `);
   // console.log(name, number, messageTitle, mainBody);
   console.log('my data: ',number, text)
    client.messages.create({
        from: '+13157125351',
        to: number,
        body: text,
    })
    .then((message) => {
        res.status(200).json({messageSId: message.sid});
    })
    .catch((err) => {
        res.status(500).json({err: err.message});
    })

    // res.status(200).json({data: 'succesfully received from textAI route'});
    //res.status(500).json({err: 'Failed to receive from textAI rroute'});
}
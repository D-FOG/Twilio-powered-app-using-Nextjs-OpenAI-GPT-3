import twilio from 'twilio'
export default async function postMethod(req, res){
    const {number,text} = JSON.parse(req.body)

    const authToken = process.env.AuthToken
    const accountSID = process.env.AccountSID
    const client = twilio(accountSID, authToken)

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
}

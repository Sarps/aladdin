const router = require('express').Router()
const { WebClient } = require('@slack/web-api');

const web = new WebClient('xoxb-1531097613601-1518741055907-Ict0jZyJXBBJdFAgLKGXHbyy');

router.post('/code', async (req, res) => {
    console.log(req.body)
    res.send('Use the command, ```git init``` to start')
    // res.sendStatus(200)
    // const auth = await web.auth.test({ token: req.body.token })
    // console.log('auth', auth)
    // const result = await web.views.open({
    //     trigger_id: req.body.trigger_id,
    //     view: {
    //         type: 'modal',
    //         callback_id: 'view_identifier',
    //         title: {
    //             type: 'plain_text',
    //             text: 'Modal title'
    //         },
    //         submit: {
    //             type: 'plain_text',
    //             text: 'Submit'
    //         },
    //         blocks: [
    //             {
    //                 type: 'input',
    //                 label: {
    //                     type: 'plain_text',
    //                     text: 'Input label'
    //                 },
    //                 element: {
    //                     type: 'plain_text_input',
    //                     action_id: 'value_indentifier'
    //                 }
    //             }
    //         ]
    //     }
    // })
    console.log('result', result)
})

router.post('/interact', async (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
})

module.exports = router

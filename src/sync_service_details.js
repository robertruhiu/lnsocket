const Twilio = require('twilio');
require('dotenv').config();

function syncServiceDetails() {
    const syncServiceSid = process.env.TWILIO_SYNC_SERVICE_SID || 'default';

    const client = new Twilio(
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        {accountSid: process.env.TWILIO_ACCOUNT_SID}
    );
    client.sync
        .services(syncServiceSid)
        .fetch()
        .then(response => {

            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    client.sync
        .services(syncServiceSid)
        .update({
            'notifications.addedToChannel.enabled': true,
            'notifications.addedToChannel.sound': 'default',
            'notifications.addedToChannel.template': 'A New message in ${CHANNEL} from ${USER}: ${MESSAGE}'
        })
        .then(service => console.log(service.friendlyName));

}

module.exports = syncServiceDetails;

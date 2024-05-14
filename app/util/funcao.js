function notifyMessages(req, res) {
    const flash = req.flash()
    const statusMsgs = Object.keys(flash)
    const msgs = []
    if (statusMsgs.length > 0) { 
        statusMsgs.forEach(status => { 
            const texts = [...flash[status]] 
            texts.forEach(text => { 
                msgs.push({status, text})
            })
        })
    }
    return msgs
}
exports.notifyMessages = notifyMessages;
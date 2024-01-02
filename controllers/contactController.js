const contact = require('../models/contact')
module.exports.view_contact = async (req, res) => {
    let contactdetails = await contact.find({});
    return res.render('view_contact', {
        adminData: contactdetails
    })
}
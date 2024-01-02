const slider = require('../models/slider');
const post = require('../models/post')
const comment = require('../models/comment')
const catagory = require('../models/catagory')
const subcatagory = require('../models/subcatagory')
const offermodel = require('../models/offermodel');
const contact = require('../models/contact');
const nodemailer = require("nodemailer");
module.exports.home = async (req, res) => {
    let sliderData = await slider.find({})
    let postdata = await post.find({ isActive: true })
    let offerdata = await offermodel.find({});
    return res.render('userpanel/home', {
        'sliderData': sliderData,
        'offerview': offerdata,
        'postdata': postdata
    });
}

module.exports.viewblog = async (req, res) => {
    let blogId = req.params.id;
    let data = await post.findOne({ _id: blogId });
    let cdata = await comment.find({ postid: blogId, isActive: true });
    var cc = cdata.length;
    let allpostdata = await post.find({});
    var ids = [];
    allpostdata.map((v, i) => {
        ids.push(v.id)
    })
    var next;
    for (var i = 0; i < ids.length; i++) {
        if (ids[i] === req.params.id) {
            next = i;
            break;
        }
    }
    let recentpost = await post.find({}).sort({ "_id": -1 }).limit(3);
    return res.render('userpanel/viewblog', {
        'blogdata': data,
        'comm': cdata,
        'cc': cc,
        'allids': ids,
        'cp': next,
        'recentpost': recentpost
    })
}

module.exports.addcomment = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = comment.commentImgPath + "/" + req.file.filename;
    }
    req.body.userImage = imgPath;
    req.body.isActive = false;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    await comment.create(req.body);
    return res.redirect('back')
}

module.exports.catagory = async (req, res) => {
    let cdata = await catagory.find({ isActive: true });
    let subdata = await subcatagory.find({ isActive: true });
    return res.render('userpanel/catagory', {
        'cdata': cdata,
        'subdata': subdata
    });
}


module.exports.contact = async (req, res) => {
    return res.render('userpanel/contact');
}


module.exports.addcontactdeails = async (req, res) => {
    var comm = true;
    if (comm) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "clownfish156@gmail.com",
                pass: "lfvcykzhqjeeehsd",
            },
        });

        let user = req.body.name;
        const info = await transporter.sendMail({
            from: 'clownfish156@gmail.com', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Contact", // Subject line
            text: "Hello User ", // plain text body
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title></title>
                <!--[if (mso 16)]>
                <style type="text/css">
                a {text-decoration: none;}
                </style>
                <![endif]-->
                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
                <!--[if !mso]><!-- -->
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
                <!--<![endif]-->
            </head>
            
            <body>
                <div dir="ltr" class="es-wrapper-color">
                    <!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#FF6E12"></v:fill>
                        </v:background>
                    <![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-email-paddings" valign="top">
                                    <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center">
                                                    <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p40" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fef852" style="background-color: #fef852; border-radius: 20px; border-collapse: separate;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p30t es-p10b es-p20r es-p20l">
                                                                                                    <h1>Thank You<br>for Choosing Us</h1>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p30b">
                                                                                                    <p style="font-size: 16px;">for your food delivery needs!</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="esd-structure es-p40b es-p40r es-p40l" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="left" class="esd-block-text es-p5t es-p5b">
                                                                                                    <h3>Dear ${user},</h3>
                                                                                                    <p><br></p>
                                                                                                    <p>We just wanted to take a moment to thank you for choosing us for your food delivery needs. We hope that you enjoyed the food and the service, and that we met your expectations.<br><br></p>
                                                                                                    <p>If there's anything we can do to make your experience even better, please don't hesitate to let us know. We appreciate your feedback and are always looking for ways to improve.<br><br></p>
                                                                                                    <p>Thank you again for your business. We look forward to serving you again soon!<br><br></p>
                                                                                                    <p>Best regards,<br>Delivery Company</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
            
            </html>`, // html body
        });

    }
    req.body.isActive = true;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    await contact.create(req.body);
    return res.redirect('back')
}


export default class templates {
    static verification(data: { username: string; token: string }): string {
        const { username, token } = data;
        const url = `${process.env.SERVER_URL}/api/auth/verify/${username}/${token}`;
        return `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title></title>

  <style type="text/css">
    @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
      .u-row .u-col-100 {
        width: 600px !important;
      }
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col>div {
        margin: 0 auto;
      }
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table,
    td {
      color: #000000;
    }
    
    #u_body a {
      color: #0000ee;
      text-decoration: underline;
    }
  </style>



  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
  <!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->



          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #597ed1;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #597ed1;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #597ed1;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #597ed1;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                    <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;"
                                      width="150.8" />

                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N I N G&nbsp; &nbsp;U P !</strong></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                  </span>
                                </p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You're almost ready to get started. Please click on the button below to verify your email address and enjoy exclusive cleaning services with us! </span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                              <div align="center">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:46px; v-text-anchor:middle; width:235px;" arcsize="8.5%"  stroke="f" fillcolor="#000000"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                <a href="${url}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #000000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                  <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">VERIFY YOUR EMAIL</span></strong>
                                  </span>
                                  </span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">The Company Team</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">+11 111 333 4444</span></p>
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">Info@YourCompany.com</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">

                              <div align="center">
                                <div style="display: table; max-width:244px;">
                                  <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->


                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://facebook.com/" title="Facebook" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://instagram.com/" title="Instagram" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://youtube.com/" title="YouTube" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="mailto:https://email.com/" title="Email" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->


                                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #597ed1;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #597ed1;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>



          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
      `;
    }
    static reset_password(data: { email: string; token: string }): string {
        const { email, token } = data;
        const targetUrl = `${process.env.FRONT_URL}/auth/reset-password?email=${email}&token=${token}`;
        return `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title></title>

  <style type="text/css">
    @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
      .u-row .u-col-100 {
        width: 600px !important;
      }
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col>div {
        margin: 0 auto;
      }
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table,
    td {
      color: #000000;
    }
    
    #u_body a {
      color: #0000ee;
      text-decoration: underline;
    }
  </style>



  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
  <!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->



          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #597ed1;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #597ed1;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #597ed1;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #597ed1;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                    <img align="center" border="0" src="https://assets.unlayer.com/projects/235841/1717291843591-940597.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 100px;"
                                      width="100" />

                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;R E A C H I N G&nbsp; O U T&nbsp; &nbsp;T O&nbsp; US!</strong></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Reset Your Password</span></strong>
                                  </span>
                                </p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">We received your request to reset the password for your account please press the button below to proceed.</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                              <div align="center">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${targetUrl}" style="height:46px; v-text-anchor:middle; width:271px;" arcsize="8.5%"  stroke="f" fillcolor="#000000"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                <a href="${targetUrl}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #000000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                  <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">RESET YOUR PASSWORD</span></strong>
                                  </span>
                                  </span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 160%;">For security purposes, the link will expire in [X hours/days].</p>
                                <p style="line-height: 160%;">&nbsp;</p>
                                <p style="line-height: 160%;">If you have any questions or need assistance, please contact our support team.</p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">The Company Team</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
                                <p style="font-size: 14px; line-height: 160%;"><a target="_blank" href="https://www.testPhone.com" rel="noopener"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">+11 111 333 4444</span></a></p>
                                <p style="font-size: 14px; line-height: 160%;"><a target="_blank" href="https://www.testEmail.com" rel="noopener"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">Info@YourCompany.com</span></a></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">

                              <div align="center">
                                <div style="display: table; max-width:244px;">
                                  <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->


                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://facebook.com/" title="Facebook" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://instagram.com/" title="Instagram" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="https://youtube.com/" title="YouTube" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->

                                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                          <a href="mailto:https://email.com/" title="Email" target="_blank">
                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></td><![endif]-->


                                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #597ed1;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #597ed1;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Mujedd All Rights Reserved</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>



          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
      `;
    }
    static congratsMail(): string {
        return `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

@media (max-width: 480px) {
  .hide-mobile {
    max-height: 0px;
    overflow: hidden;
    display: none !important;
  }
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 60% !important; } #u_content_heading_1 .v-container-padding-padding { padding: 40px 10px 0px !important; } #u_content_heading_1 .v-font-size { font-size: 26px !important; } #u_content_heading_1 .v-line-height { line-height: 120% !important; } #u_content_text_1 .v-container-padding-padding { padding: 5px 10px 10px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_content_text_2 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_menu_1 .v-padding { padding: 5px 10px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #3554c1;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #3554c1;height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_image_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Montserrat',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1693917291236-Finish-Registration.gif" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 51%;max-width: 306px;" width="306" class="v-src-width v-src-max-width"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 0px;font-family:'Montserrat',sans-serif;" align="left">
        
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
    <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 130%; text-align: center; word-wrap: break-word; font-family: 'Playfair Display',serif; font-size: 36px; font-weight: 400;"><span><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiMHNRUkxSOGNyUFhMbVJGdjFocm1FTCIsInBhc3RlSUQiOjU1Mjc3NjAyOCwiZGF0YVR5cGUiOiJzY2VuZSJ9Cg==(/figmeta)--&gt;" style="line-height: 31.2px;"></span><span data-buffer="&lt;!--(figma)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(/figma)--&gt;" style="line-height: 31.2px;"></span>Congratulations!</span></h1>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 30px 10px;font-family:'Montserrat',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 160%;"><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiMHNRUkxSOGNyUFhMbVJGdjFocm1FTCIsInBhc3RlSUQiOjQ0NTk1NDM3MywiZGF0YVR5cGUiOiJzY2VuZSJ9Cg==(/figmeta)--&gt;" style="line-height: 28.8px;"></span><span style="color: #000000; text-align: center; white-space: normal; background-color: #ffffff; float: none; display: inline; line-height: 28.8px;">Your email has been verified and you are now  ready to get started. Please click on the button below to start your exclusive journey with us!</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_button_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://mujedd.live/auth/login" style="height:39px; v-text-anchor:middle; width:160px;" arcsize="10.5%"  stroke="f" fillcolor="#3554c1"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
    <a href="https://mujedd.live/auth/login" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3554c1; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 16px;font-weight: 700; ">
      <span class="v-line-height v-padding" style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 19.2px;">Go To Website</span></span>
    </a>
    <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_2" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 10px;font-family:'Montserrat',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">if you have any questions, please email us at <span style="text-decoration: underline; line-height: 22.4px; color: #3598db;">support<a rel="noopener" href="https://www.unlayer.com" target="_blank" style="color: #3598db; text-decoration: underline;">@mujedd.</a>live</span> or visit our FAQS, you can also chat with a reel live human during our operating hours. They can answer questions about your account</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:'Montserrat',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:187px;">
  <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.facebook.com/unlayer" title="Facebook" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/rounded/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://twitter.com/unlayerapp" title="Twitter" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/rounded/twitter.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.linkedin.com/company/unlayer/mycompany/" title="LinkedIn" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/rounded/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.instagram.com/unlayer_official/" title="Instagram" target="_blank">
          <img src="https://cdn.tools.unlayer.com/social/icons/rounded/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_menu_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
        
<div class="menu" style="text-align:center">
<!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->

  <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
  
    <a href="https://mujedd.live" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      Home
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    <span style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <!--[if (mso)|(IE)]></td><![endif]-->
  

  <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
  
    <a href="https://mujedd.live" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      Page
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    <span style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <!--[if (mso)|(IE)]></td><![endif]-->
  

  <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
  
    <a href="https://mujedd.live" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      About Us
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    <span style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <!--[if (mso)|(IE)]></td><![endif]-->
  

  <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
  
    <a href="https://mujedd.live" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      Contact US
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  

<!--[if (mso)|(IE)]></tr></table><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:'Montserrat',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"> </p>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<p style="line-height: 160%;">Copyrights © Mujedd All Rights Reserved</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

      `;
    }
    static passwordChanged(): string {
        return `
        <h1> your password has been changed </h1>
      `;
    }
}

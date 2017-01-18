const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const cors = require('kcors');
const parse = require('co-body');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const app = koa();

const auth = {
  auth: {
    // DEV
    // api_key: 'key-79080355940d6338a6d937945598c2b0',
    // domain: 'sandbox7ac29bca8bf34d23937ff863fdf1844f.mailgun.org'
    // PROD
    api_key: 'key-79080355940d6338a6d937945598c2b0',
    domain: 'mailgun.nodeunify.com'
  }
}
const transporter = nodemailer.createTransport(mailgun(auth));

router.post('/emails', function *(next) {
  const body = yield parse.json(this);
  const send = transporter.templateSender({
    subject: '联系我们： {{subject}}!',
    html: '<b>联系人：<strong>{{name}}</strong></b><br/><b>邮件：{{email}}</b><br/><b>电话：{{telephone}}</b><br/><b>消息：</b><p>{{message}}</p>'
  }, {
    to: 'jiesheng.zhu@hotmail.com'
  });
  yield send({
    from: `"${body.name}" <${body.email}>`
  }, body);
  this.body = {
    created: body
  };
  this.status = 201;
  yield next;
});

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('public'))
  .listen(8080, '0.0.0.0');

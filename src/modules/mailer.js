import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from 'path';


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2524b86cd8e9cc",
        pass: "aa6b7fb3f061fb"
    }
});

//forma de preencher variaveis em arquivos html
transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));


export default transport;
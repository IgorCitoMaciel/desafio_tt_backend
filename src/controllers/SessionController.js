import User from '../models/User';
import transport from '../modules/mailer';
import crypto from 'crypto';


class SessionController {
    async register(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;

        // verificando se esse usuario ja existe
        let user = await User.findOne({ email, senha });
        //se nao tiver esse usuario, nos criamos no banco
        if (!user) {
            user = await User.create(req.body);
        }

        console.log(user);
        return res.json(user);
    }


    async login(req, res) {
        try {
            const email = req.body.email;
            const senha = req.body.senha;

            let user = await User.findOne({ email: email, senha: senha });

            if (!user) {
                return res.status(401).json({ message: "Usuário ou senha inválido" });
            }
            return res.json(user);

        } catch (err) {

            return res.status(400);
        }
    }

    async forgotPassword(req, res) {
        const email = req.body.email;
        console.log(req.body);
        try {

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: "Usuário não encontrado" });
            }

            const token = crypto.randomBytes(3).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 2);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });

            transport.sendMail({
                to: email,
                from: 'appdesafio@gmail.com',
                subject: 'Redefinir sua senha no App Desafio ?',
                html: '<p>Utilize esse código: </p>' + token + ' <p> para mudar senha!</p><br> ',

            }, (err) => {
                if (err)
                    return res.status(400).send({ message: " erro forgot password" });
                return res.send();
            })

            res.status(200).send({ message: " Tudo certo!" });
        } catch (err) {
            console.error();
            res.status(400).send({ message: " Erro ao mudar senha!" });
        }
    }

    async resetPassword(req, res) {
        const email = req.body.email;
        const token = req.body.token;
        const senha = req.body.senha;

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

            if (!user) {
                return res.status(401).send({ message: "Usuário não encontrado" });
            }
            if (token !== user.passwordResetToken) {
                return res.status(400).send({ message: "Token inválido" });
            }

            const now = new Date();

            if (now > user.passwordResetExpires) {
                return res.status(400).send({ message: "Token expirado" });
            }

            user.senha = senha;
            await user.save();

            res.send();


        } catch (err) {
            res.status(400).send({ menssage: "usuário não encontrado" })
        }
    }
}

export default new SessionController();


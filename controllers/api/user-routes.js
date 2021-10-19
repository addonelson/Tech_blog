const router = require('express').Router();
const { User } = require('../../models');

//Post to create a new user account
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        console.log(dbUserData);
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//Post to log user in
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ where: { username: req.body.username } });
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password' });
            return;
        }
        console.log(dbUserData);

        const validPassword = await dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'Logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//Post to log user out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
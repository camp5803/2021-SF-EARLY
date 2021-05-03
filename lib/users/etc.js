const userScore = require('./profile').readScore;
const { selectWholeData } = require('../mariadb/solver_query');
const { selectChallData } = require('../mariadb/chall_query');
const selectScoreData = require('../mariadb/score_query').selectWholeData;

const index = (req, res) => {
    res.render('play', { err: null });
};

const profile = async (req, res) => {
    const score = await userScore(req.session.users.uuid);
    const solverInfo = await selectWholeData(`SELECT * FROM boards.solver WHERE uuid = ?`, [req.session.users.uuid]);
    const challInfo = await selectChallData(`SELECT * FROM boards.chall`);
    const rankInfo = await selectScoreData(`SELECT uuid, uscore, usolved_at, ( @rank := @rank + 1 ) AS rank FROM users.score AS a, ( SELECT @rank := 0 ) AS b where NOT  mem_type IN ('Admin') ORDER BY uscore DESC, usolved_at ASC;`);
    let rank = -1;

    for (let i=0; i<rankInfo.length; i++) {
        if (rankInfo[i].uuid == req.session.users.uuid) {
            rank = rankInfo[i].rank;
            break;
        }
    }

    res.render('profile', { 
        sess: req.session, 
        score, 
        solverInfo, 
        challInfo,
        rank,
    });
};

const killSession = (req, res) => {
    delete req.session.logined;
    res.redirect('/');
};

module.exports = {
    index,
    profile,
    killSession,
};
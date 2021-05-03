const { renderRanking } = require('./ranking');
const { renderRankingByType } = require('./ranking');

const rank = async (req, res) => {
    data = await renderRanking();
    res.render('scoreboard', { 
        data, 
        route: '',
        type: '',
        sess: req.session,
     });
};

const rankByType = async (req, res) => {
    data = await renderRankingByType(req.params.type);
    if (data[0] == null) {
        res.redirect('/ranking');
        return;
    }
    res.render('scoreboard', { 
        data, 
        route: '../',
        type: req.params.type,
        sess: req.session,
    });
}

module.exports = {
    rank,
    rankByType,
};
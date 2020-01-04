const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    posts:[mongoose.Schema.Types.Mixed],
    created_date: {type: Date, default: Date.now}

});

const News = mongoose.model("News", newsSchema,'news');
exports.News = News;
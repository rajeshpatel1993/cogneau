const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    posts:[Schema.Types.Mixed],
    created_date: {type: Date, default: Date.now}

});

const News = mongoose.model("News", tradeSchema);
exports.News = News;
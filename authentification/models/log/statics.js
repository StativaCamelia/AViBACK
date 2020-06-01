module.exports = function (schema) {
    schema.statics.findByMethod = async function(method) {
        let date = new Date();
        date.setDate(date.getDate() - 10);
        let filter = {};
        filter.method = method;
        filter.date = {
            $gte: date,
            $lte: new Date()
        };
        const logs = await this.find(filter);
        return logs.length;
    }
};
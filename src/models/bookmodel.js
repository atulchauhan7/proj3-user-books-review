const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true

    },
    excerpt: { type: String, required: true },
    userId: { type: ObjectId, required: true, ref: 'user' },
    ISBN: { type: String, required: true, unique: true, match: [/\b(?:ISBN(?:: ?| ))?((?:97[89])?\d{9}[\dx])\b/, "pls provide valid ISBN number"] },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    reviews: { type: Number, default: 0, comment: 'Holds number of reviews of this book' },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    //   releasedAt: {type:Date, require:true, new Date(YYYY-MM-DD)},

}, { timestamps: true })

module.exports = mongoose.model('book', bookModel)  
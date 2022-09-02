export default (req, res) => {
    let messages = [],
        old = { firstName: "", lastName: "", email: "" };
    res.render('home/index', { messages, old });
};
const { StatusCodes } = require("http-status-codes");
const buildHttpRequest = (req) => ({
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    url: req.url,
    path: req.path,
    user: req.user,
    logger: req.logger,
    source: {
        ip: req.ip,
        browser: req.get('User-Agent')
    },
    headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
    }
})

module.exports = (controller) => async (req, res, next) => {
    try {
        console.log('req', req);
        const httpResponse = await controller(buildHttpRequest(req));

        res.set('Content-Type', 'application/json');
        res.type('json');

        return res.status(StatusCodes.OK).send({
            success: true,
            code: StatusCodes.OK,
            data: httpResponse,
            timestamps: Date.now(),
        });
    } catch (err) {
        return res.status(StatusCodes.NOT_FOUND).send({
            success: false,
            code: StatusCodes.NOT_FOUND,
            error: {
                description: err.message
            },
            timestamps: Date.now(),
        });
    }
};
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
        browser: req['User-Agent']
    },
    headers: {
        'Content-Type': req['Content-Type'],
        Referer: req['referer'],
        'User-Agent': req['User-Agent']
    }
})

/**
 * Example of use
 * fastify.get('*', makeCallback(notFound))
 * or expressRouter.get('*', makeCallback(notFound))
 * where "notFound" is the handler (or controller)
 * @param controller
 * @returns {(function(*, *, *): Promise<*|undefined>)|*}
 */
module.exports = (controller) => async (req, res, next) => {
    try {
        const httpResponse = await controller(buildHttpRequest(req));

        res['Content-Type'] = 'application/json';
        res.type('json');

        return res.code(StatusCodes.OK).send({
            success: true,
            code: StatusCodes.OK,
            data: httpResponse,
            timestamps: Date.now(),
        });
    } catch (err) {
        return res.code(StatusCodes.NOT_FOUND).send({
            success: false,
            code: StatusCodes.NOT_FOUND,
            error: {
                description: err.message
            },
            timestamps: Date.now(),
        });
    }
};
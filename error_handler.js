function errorHandler(err, req, res, next) {
    const error = new Error("Not found");
    error.status = 404;

    if (error.status === 404) {
        return res.status(404).json({
            error: {
                message: "Resource not found"
            }
        });
    } else {
        return res.status(500).json({
            error: {
                message: err.message || "Internal Server Error"
            }
        });
    }
}

module.exports = errorHandler;

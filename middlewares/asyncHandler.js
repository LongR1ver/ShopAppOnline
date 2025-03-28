const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch(error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: process.env.NODE_ENV === 'development' ? error: ''
            })
        }
    }
}

export default asyncHandler
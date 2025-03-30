const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch(error) {
            console.log("Detailed error: ", error)
            console.log("Error details: ", {
                message: error.message,
                stack: error.stack
            })

            return res.status(500).json({
                message: "Internal Server Error",
                error: process.env.NODE_ENV === 'development' ? error: ''
            })
        }
    }
}

export default asyncHandler
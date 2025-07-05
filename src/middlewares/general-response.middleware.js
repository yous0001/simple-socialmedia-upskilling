export const globalResponse = (err, req, res, next) => {
    if (err) {
        res.status(err['cause'] || 500).json({
            success:false,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        })
    }
}

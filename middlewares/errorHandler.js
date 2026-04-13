// middleware -> é uma fução que vai "ficar no meio do caminho"
// entre a requisição do usuário (request) e a resposta do servidor (response)
function errorHandler(err, req, res, next) {
    console.error(err);

    res.status(400).json({
        error: err.message
    })
}

export default errorHandler;
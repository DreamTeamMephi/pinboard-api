/**
 * Middleware that checks if user is authenticated
 */
export default function (req, res, next) {
  if (!req.isAuthenticated()) {
    next('AUTH_NEEDED')
  } else {
    next()
  }
}

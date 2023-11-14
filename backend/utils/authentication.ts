import jwt from 'jsonwebtoken';
import { secretKey } from './.secret.ts';

const secret = secretKey || process.env.secretKey;

// export function authenticateToken(req, res, next) {
//     console.log('authenticateToken: req.body: ', req.body)
//     let token = req.headers?.authorization
//     console.log('authenticateToken: token: ', token)
//     const secret = secretKey
//     // token = token.trim()

//     if (!token) {
//         console.log('!token, inside auth-middleware')
//         return res.sendStatus(400)
//     }

//     jwt.verify(token, secret, (err, user) => {
//         console.log(user)
//         if (err) {
//             console.log(err)
//             return res.sendStatus(400)
//         }

//         req.user = user
//         next()
//     })
// }

// const db = getDb()

// const authenticateAndAuthorize = (async (req, res, next) => {
// 	await db.read()
// 	let authHeader = req.headers.authorization
// 	if (!authHeader) {
// 		res.status(401).send({
// 			message: 'You must be authenticated to view this very secret data.'
// 		})
// 		return
// 	}
// 	let token = authHeader.replace('Bearer: ', '')

// 	try {
// 		let decoded = jwt.verify(token, secret)
// 		console.log('GET /secret decoded: ', decoded);
// 		let userId = decoded.userId
// 		let user = db.data.users.find(u => u.id === userId)
// 		console.log(`User "${user.username}" has access to secret data.`)
// 		req.user = user
// 		next()
// 	} catch (error) {
// 		console.log('GET /secret error: ' + error.message);
// 		res.sendStatus(401)
// 	}
// })

// export default authenticateAndAuthorize

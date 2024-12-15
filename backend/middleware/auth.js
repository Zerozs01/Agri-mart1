import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.token;
		if (!token) {
			return res.json({ success: false, message: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.body.userId = decoded.id;
		next();
	} catch (error) {
		console.error("Auth middleware error:", error);
		res.json({ success: false, message: "Invalid token" });
	}
};

export default authMiddleware;
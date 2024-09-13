import { jwtverify } from "../utils/Auth";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwtverify(token);
        req.user = decoded.user; // Store user information from token payload
        next(); // Move to the next middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
// Middleware to check if the user has 'organizer' role
const organizerRoleMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwtverify(token);
        const { role } = decoded.user; // Extract the role from the token

        if (role !== 'organizer') {
            return res.status(403).json({ msg: 'Access denied: Organizer role required' });
        }

        // Role is valid, move to the next middleware or route
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Middleware to check if the user has 'admin' role
const adminRoleMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        const { role } = decoded.user;  // Extract the role from the toke

        if (role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied: Admin role required' });
        }
        // Role is valid, move to the next middleware or route
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};


export { authMiddleware, organizerRoleMiddleware,adminRoleMiddleware };
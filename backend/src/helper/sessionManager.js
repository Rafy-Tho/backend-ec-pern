class SessionManager {
  async createSession(req, userData) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) return reject(err);

        req.session.user = {
          user_id: userData.user_id,
          name: userData.username,
          login_at: new Date(),
          role: userData.role,
          userAgent: req.headers["user-agent"],
          ip: req.headers["x-forwarded-for"] || req.ip,
        };

        req.session.save((err) => {
          if (err) return reject(err);
          resolve(req.session.user);
        });
      });
    });
  }

  async destroySession(req) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  validateSession(req) {
    if (!req.session.user) return false;

    const currentIp = req.headers["x-forwarded-for"] || req.ip; // Handle IPv6

    const sessionIp = req.session.user.ip; // Handle IPv6

    if (currentIp !== sessionIp) return false; // IP mismatch

    return true;
  }
}

const sessionManager = new SessionManager();
export default sessionManager;

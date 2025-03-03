export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        const data = req.body;
        const user = await this.authService.register(data);
        res
            .status(201)
            .json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    }
    async login(req, res) {
        const data = req.body;
        const { token } = await this.authService.login(data);
        res.json({ token });
    }
}

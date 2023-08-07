import {
    Injectable,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }
     

    /**
     * Verify JWT service
     * @param token JWT token
     * @param type {TokenType} "refresh" or "access"
     * @returns decrypted payload from JWT
     */
    public verifyToken(token: string, type: string) {
        try {
            return this.jwtService.verify(token);
        } catch ({ name }) {
            if (name == 'TokenExpiredError' && type == 'AccessToken') {
                throw new console.log('Access token has expired');
            }
            throw new console.log();
        }
    }

   
}
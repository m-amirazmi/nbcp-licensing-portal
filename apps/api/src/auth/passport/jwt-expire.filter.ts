/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Catch(TokenExpiredError)
export class JwtExpireFilter implements ExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 406;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    response.status(status).json({
      statusCode: status,
      message: 'JWT token has expired!', // Custom error message for token expiration
    });
  }
}

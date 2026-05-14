import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { validateUser } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  try {
    //Validate user
    const user = await validateUser(req.body);

    if (!user) {
      return res.status(401).send("Invalid Email or Password");
    }

    //create session
    const session = await createSession(
      user._id as string,
      req.get("user-agent") || ""
    );

    //create accesstoken
    const accessToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: config.get("accessTokenTtl"),
      }
    );

    //create refreshtoken
    const refreshToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: config.get("refreshTokenTtl"),
      }
    );

    res.send({ accessToken, refreshToken });
    //return accesstoken and refresh token
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });

    res.status(200).json(sessions);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.status(200).json({
    accessToken: null,
    refreshToken: null,
  });
}

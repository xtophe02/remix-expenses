import { prisma } from "./database.server";
import { compare, hash } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax", //protects malicious third parties to make user requests
    maxAge: 3 * 24 * 60 * 60, // 3 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();

  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  // console.log(email, existingUser);
  if (existingUser) {
    const error = new Error(
      "A user with provided email address exists already"
    );
    error.status = 422;
    throw error;
  }
  const passwordHash = await hash(password, 12);
  const newUser = await prisma.user.create({
    data: { email, password: passwordHash },
  });
  return createUserSession(newUser.id, "/expenses");
}
export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  const passwordCorrect = await compare(password, existingUser.password);
  if (!existingUser && !passwordCorrect) {
    const error = new Error(
      "Could not check you in, please check the provided credentials"
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, "/expenses");
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) {
    return null;
  }
  return userId;
}
export async function destroyUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    //a throw will stop other functions
    throw redirect("/auth?mode=login");
  }
  return userId;
}

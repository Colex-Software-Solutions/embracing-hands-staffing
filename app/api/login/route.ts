import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
}

// All passwords are hashes of 123456
export const users = [
  {
    email: "user1@example.com",
    password: "$2b$12$O4ngf1bYOr1yNvSYURM3D.jWgNuEE4QwENdzlYUhhAgaOGUeZ8Qx.",
    firstName: "John",
    lastName: "Doe",
    role: "user",
  },
  {
    email: "user2@example.com",
    password: "$2b$12$AJD.WUhfSzzZwCERES5K9O7kFX/G8P3Tbp5/Ex04WziPfmTmN2oB2",
    firstName: "Jane",
    lastName: "Doe",
    role: "admin",
  },
  {
    email: "user3@example.com",
    password: "$2b$12$OrwLYnC5akRPsT18bWJwd.uiKLlsLEbn2Rss0U99RXNUApdqM0iq2",
    firstName: "Alice",
    lastName: "Johnson",
    role: "user",
  },
  {
    email: "user4@example.com",
    password: "$2b$12$3aTT5QcsUcNX83IrdJ/RuOP0AFuRQ7UNfyGlX4A7X7TxcNbVU509.",
    firstName: "Bob",
    lastName: "Smith",
    role: "admin",
  },
];

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = users.find((user) => user.email === body.username);

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}

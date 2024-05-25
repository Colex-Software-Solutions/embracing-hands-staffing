import { userProvider } from "@/app/providers/userProvider";
import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  console.log("Received login request for username:", body.username);


  const user = await userProvider.getUserByEmail(body.username);

  console.log("user is", user)
  
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

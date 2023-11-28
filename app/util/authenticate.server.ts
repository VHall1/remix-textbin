import { generateMagicLink } from "./magic-link.server";
import { prisma } from "./prisma.server";

async function authenticate(email: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });
  return generateMagicLink(user.email);
}

export { authenticate };

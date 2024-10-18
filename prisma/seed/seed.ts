/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  //seed books
  await seed.book((x) =>
    x(10, {
      code: () =>
        faker.string.fromCharacters(['A', 'B', 'C']) +
        faker.string.fromCharacters(['D', 'E', 'F']) +
        ' ' +
        faker.number.int(10),
      title: () => faker.company.name(),
      author: () => faker.person.firstName(),
      stock: () => '1',
    }),
  );

  // Seed the database with 10 users
  await seed.user((createMany) =>
    createMany(10, ({ index }) => ({
      username: () => faker.person.firstName(),
      password: () => bcrypt.hash('1', 10),
      members: (create) =>
        create(1, {
          name: () => faker.person.fullName(),
          code: () => 'M00' + (index + 1),
        }),
    })),
  );

  console.log('Database seeded successfully!');

  process.exit();
}

main();

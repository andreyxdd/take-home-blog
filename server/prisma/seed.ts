import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const samplePassword = await hash('qwerty123', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@test.com' },
    update: {
      password: samplePassword,
    },
    create: {
      email: 'alice@test.com',
      password: samplePassword,
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'What is Lorem Ipsum?',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            title: 'Fun Facts About Lorem Ipsum',
            content: 'Maecenas urna nisl, dapibus sit amet feugiat ut, volutpat eu nunc. Mauris eget nibh nec nisi elementum faucibus eget eget eros. Quisque id nunc sollicitudin, efficitur risus vitae, auctor turpis. Donec sed dui id leo ullamcorper ullamcorper vel ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec neque turpis. Aliquam fringilla placerat sodales. Morbi eu posuere dolor. Integer ac felis id dolor dignissim auctor consectetur at neque. Pellentesque ut venenatis elit.',
          },
          {
            title: 'Top 10 Lorem Ipsum Phrases',
            content: 'Ut bibendum in lorem quis vestibulum. Aliquam ac eros ut dolor aliquam iaculis ut sit amet diam. Sed arcu dui, pulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget mauris ac, varius vulputate purus. Etiam ornare hendrerit maximus. Donec mattis metus vitae venenatis bibendum. Sed nisl sapien, tincidunt vel finibus a, scelerisque nec nulla. Cras sit amet cursus erat. Nullam at massa at quam varius convallis varius quis massa.',
          },
          {
            title: 'Me and Lorem Ipsum',
            content: 'Maecenas rhoncus varius sapien. Vestibulum pharetra eros id lacus egestas, et commodo urna finibus. Sed quis vestibulum ipsum. Proin hendrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Origin Of Lorem Ipsum',
            content: 'Ut bibendum in lorem quis vestibulum. Aliquam ac eros ut dolor aliquam iaculis ut sit amet diam. Sed arcu dui, pulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget maundrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 5',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 6',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'nilu@test.com' },
    update: {
      password: samplePassword,
    },
    create: {
      email: 'nilu@test.com',
      password: samplePassword,
      name: 'Nilu',
      posts: {
        create: [
          {
            title: 'Where does Lorem Ipsum come from?',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
          },
          {
            title: 'Short Post 3',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Lorem Ipsum 1.0',
            content: 'Maecenas urna nisl, dapibus sit amet feugiat ut, volutpat eu nunc. Mauris eget nibh nec nisi elementum faucibus eget eget eros. Quisque id nunc sollicitudin, efficitur risus vitae, auctor turpis. Donec sed dui id leo ullamcorper ullamcorper vel ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec neque turpis. Aliquam fringilla placerat sodales. Morbi eu posuere dolor. Integer ac felis id dolor dignissim auctor consectetur at neque. Pellentesque ut venenatis elit.',
          },
          {
            title: 'How to deal with Lorem Ipsum',
            content: 'Nullam nec neque turpis. Aliquam fringilla placerat sodales. Morbi eu posuere dolor. Integer ac felis id dolor dignissim auctor consectetur at neque. ac eros ut dolor aliquam iaculis ut sit amet diam. Sed arcu dui, pulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget maundrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'The Best Lorem Ipsum',
            content: 'Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibusNam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget maundrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Why you shoudl learn Lorem Ipsum Now',
            content: 'Aliquam fringilla placerat sodales. Morbi eu posuere dolor. Integer ac felis id dolor dignissim auctor consectetur at neque. ac eros ut dolor aliquam iaculis ut sit amet diam. Sed arcu dui, pulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget maundrerit euismodt. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 4',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'mahmoud@test.com' },
    update: {
      password: samplePassword,
    },
    create: {
      email: 'mahmoud@test.com',
      password: samplePassword,
      name: 'Mahmoud',
      posts: {
        create: [
          {
            title: 'Why do we use Lorem Ipsum?',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
          },
          {
            title: 'Where can I get some Lorem Ipsum?',
            content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
          },
          {
            title: 'My favourite Lorem Ipsum',
            content: 'Maecenas urna nisl, dapibus sit amet feugiat ut, volutpat eu nunc. Mauris eget nibh nec nisi elementum faucibus eget eget eros. Quisque id nunc sollicitudin, efficitur risus vitae, auctor turpis. Donec sed dui id leo ullamcorper ullamcorper vel ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec neque turpis. Aliquam fringilla placerat sodales. Morbi eu posuere dolor. Integer ac felis id dolor dignissim auctor consectetur at neque. Pellentesque ut venenatis elit.',
          },
          {
            title: 'Short Post 7',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 8',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 9',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 10',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Better Lorem Ipsum',
            content: 'Ut bibendum in lorem quis vestibulum. Aliquam ac eros ut dolor aliquam iaculis ut sit amet diam. Sed arcu dui, pulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget mauris ac, varius vulputate purus. Etiam ornare hendrerit maximus. Donec mattis metus vitae venenatis bibendum. Sed nisl sapien, tincidunt vel finibus a, scelerisque nec nulla. Cras sit amet cursus erat. Nullam at massa at quam varius convallis varius quis massa.',
          },
          {
            title: 'Final thoughts on Lorem Ipsum',
            content: 'Maecenas rhoncus varius sapien. Vestibulum pharetra eros id lacus egestas, et commodo urna finibus. Sed quis vestibulum ipsum. Proin hendrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 2',
            content: 'Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'One More Thing About LI',
            content: 'Maecenas rhoncus varius sapienpulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget mauris ac, hendrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 1',
            content: 'Ut dapibus purus at mi viverra faucibus.',
          },
        ],
      },
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: 'test@test.test' },
    update: {
      password: samplePassword,
    },
    create: {
      email: 'test@test.test',
      password: samplePassword,
      name: 'Test Testov',
      posts: {
        create: [
          {
            title: 'Why do we use Lorem Ipsum?',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
          },
          {
            title: 'Where can I get some Lorem Ipsum?',
            content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
          },
          {
            title: 'My favourite Lorem Ipsum',
            content: 'Maecenas urna nisl, dapibus sit amet feugiat ut, volutpat eu nunc. Mauris eget nibh nec nisi elementum faucibus eget eget eros. Quisque id nunc sollicitudin, efficitur risus vitae, auctor turpis. Donec sed dui id leo ullamcorper ullamcorper vel ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec neque turpis. Aliquam fringilla placerat sodales. Morbi eu posuere dolor. Integer ac felis id dolor dignissim auctor consectetur at neque. Pellentesque ut venenatis elit.',
          },
          {
            title: 'Short Post 7',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 8',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 9',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 10',
            content: 'Vulputate dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Better Lorem Ipsum',
            content: 'Ut bibendum in lorem quis vestibulum. Aliquam ac eros ut dolor aliquam iaculis ut sit amet diam. Sed arcu dui, pulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget mauris ac, varius vulputate purus. Etiam ornare hendrerit maximus. Donec mattis metus vitae venenatis bibendum. Sed nisl sapien, tincidunt vel finibus a, scelerisque nec nulla. Cras sit amet cursus erat. Nullam at massa at quam varius convallis varius quis massa.',
          },
          {
            title: 'Final thoughts on Lorem Ipsum',
            content: 'Maecenas rhoncus varius sapien. Vestibulum pharetra eros id lacus egestas, et commodo urna finibus. Sed quis vestibulum ipsum. Proin hendrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 2',
            content: 'Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'One More Thing About LI',
            content: 'Maecenas rhoncus varius sapienpulvinar ut velit vel, molestie imperdiet nulla. Suspendisse imperdiet lectus turpis, eu pretium eros volutpat eu. Nam sapien metus, vulputate eu scelerisque id, dignissim vitae libero. Praesent tortor nisl, ullamcorper eget mauris ac, hendrerit euismod tortor quis vehicula. Nunc tristique blandit odio, a lacinia libero faucibus ut. Pellentesque eros augue, suscipit at mi ac, malesuada pharetra odio. Morbi id posuere dui. Ut dapibus purus at mi viverra faucibus.',
          },
          {
            title: 'Short Post 1',
            content: 'Ut dapibus purus at mi viverra faucibus.',
          },
        ],
      },
    },
  });

  console.log({
    user1, user2, user3, user4,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

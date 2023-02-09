// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const names = ["John Doe", "Mary Doe", "Jim Doe", "Ben Doe"];

export default function handler(_, res) {
  res.status(200).json({ name: names[Math.floor(Math.random() * names.length)] });
}

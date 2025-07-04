/*
Automated Bluesky Bot (Node.js)
Posts a random phrase + link every 4 hours via GitHub Actions.

Dependencies:
  npm install @atproto/api

Environment Variables (GitHub Secrets):
  BSKY_HANDLE       -> martatecnica.bsky.social‬ (e.g. marta.segura.bsky.social)
  BSKY_PASSWORD     -> testxx1983
  BSKY_SERVER       -> https://bsky.social
  CTA_LINK          -> https://bit.ly/protegetumovil
*/

const { BskyAgent } = require('@atproto/api')

const PHRASES = [
  `LaLiga activaba tu micro sin permiso. Yo ya bloqueo todo 👉 ${process.env.CTA_LINK}`,
  `Tebas te espía con tu propio móvil 😱 Protege tu privacidad aquí 👉 ${process.env.CTA_LINK}`,
  `Confirmado: la app de LaLiga accedía a tu micrófono. Usa esto 👉 ${process.env.CTA_LINK}`,
  `Si no quieres que te graben sin permiso, instala esto 👉 ${process.env.CTA_LINK}`,
  `Mi móvil ya no habla con nadie: bloquea a todos con esto 👉 ${process.env.CTA_LINK}`
]

async function run() {
  const agent = new BskyAgent({ service: process.env.BSKY_SERVER })

  await agent.login({
    identifier: process.env.BSKY_HANDLE,
    password: process.env.BSKY_PASSWORD
  })

  const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)]

  await agent.post({ text: phrase })

  console.log('Post enviado:', phrase)
}

run().catch(console.error)

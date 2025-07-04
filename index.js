/*
Automated Bluesky Bot (Node.js)
Posts a random phrase + link every 4 hours via GitHub Actions.

Dependencies:
  npm install @atproto/api

*/

const { BskyAgent } = require('@atproto/api')

const link = process.env.CTA_LINK;


const PHRASES = [
  `https://bit.ly/protegetumovil 👈 🎙️ ¿Sabías que te pueden escuchar aunque el móvil esté bloqueado?`,
  `https://bit.ly/protegetumovil 👈 📱 LaLiga ya lo hizo. ¿Quién más lo está haciendo sin que lo sepas?`,
  `https://bit.ly/protegetumovil 👈 👂 Tu micro está activado más veces de las que imaginas`
  
];



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

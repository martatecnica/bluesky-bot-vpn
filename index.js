/*
Automated Bluesky Bot (Node.js)
Posts a random phrase + link every 4 hours via GitHub Actions.

Dependencies:
  npm install @atproto/api

*/

const { BskyAgent } = require('@atproto/api')

const PHRASES = [
  `🎙️ ¿Sabías que te pueden escuchar aunque el móvil esté bloqueado? 👉 ${process.env.CTA_LINK}`,
  `📱 LaLiga ya lo hizo. ¿Quién más lo está haciendo sin que lo sepas? 👉 ${process.env.CTA_LINK}`,
  `👂 Tu micro está activado más veces de las que imaginas 👉 ${process.env.CTA_LINK}`,
  `🤐 Si tu móvil hablara… te delataría. Protégete 👉 ${process.env.CTA_LINK}`,
  `🔒 ¿Micrófono, GPS, WiFi? Todo se rastrea. Bloquéalo 👉 ${process.env.CTA_LINK}`,
  `👀 Me enteré de lo de LaLiga y cambié todo 👉 ${process.env.CTA_LINK}`,
  `😳 Desde que supe lo del micro, no salgo sin esto 👉 ${process.env.CTA_LINK}`,
  `🛡️ Usa esto y que te espíen si quieren… no podrán 👉 ${process.env.CTA_LINK}`,
  `⚠️ Pensé que era paranoia hasta que vi las pruebas 👉 ${process.env.CTA_LINK}`,
  `🧠 Nadie tiene por qué saber dónde estoy. Ni tú 👉 ${process.env.CTA_LINK}`,
  `🛡️ Esto no es una VPN cualquiera. Es mi escudo 👉 ${process.env.CTA_LINK}`,
  `💀 Puedes seguir confiando en tu operador... o protegerte 👉 ${process.env.CTA_LINK}`,
  `🔐 ¿Privacidad? No existe… hasta que haces esto 👉 ${process.env.CTA_LINK}`,
  `👂 Hay apps que escuchan más de lo que tú hablas 👉 ${process.env.CTA_LINK}`,
  `😌 Desde que lo instalo, el móvil respira tranquilo 👉 ${process.env.CTA_LINK}`,
  `😤 Esto no es para todos. Es para los que se cansaron 👉 ${process.env.CTA_LINK}`,
  `🧪 Lo instalé por curiosidad. Me quedé por seguridad 👉 ${process.env.CTA_LINK}`,
  `🫣 ¿Crees que no te espían? Así pensaba yo 👉 ${process.env.CTA_LINK}`,
  `💬 Pruébalo una vez. Luego lo recomendarás 👉 ${process.env.CTA_LINK}`,
  `🧰 No es magia. Es protección digital real 👉 ${process.env.CTA_LINK}`,
  `😅 Si lo supiera antes, me habría ahorrado muchos sustos 👉 ${process.env.CTA_LINK}`,
  `📲 El botón más importante de tu móvil es este enlace 👉 ${process.env.CTA_LINK}`,
  `⏳ No esperes a que te pase algo para reaccionar 👉 ${process.env.CTA_LINK}`,
  `🚫 Gratis, rápido y sin datos personales. Esto es lo que uso 👉 ${process.env.CTA_LINK}`,
  `💎 Protege lo tuyo como si valiera millones. Porque lo vale 👉 ${process.env.CTA_LINK}`,
  `🙈 Esto es para los que ya no confían en “ajustes de privacidad” 👉 ${process.env.CTA_LINK}`,
  `📴 El móvil no es el problema. Es lo que haces con él 👉 ${process.env.CTA_LINK}`,
  `🕵️‍♂️ Lo que estás ignorando, otros lo están escuchando 👉 ${process.env.CTA_LINK}`,
  `📉 Deja de ser un producto. Empieza a protegerte 👉 ${process.env.CTA_LINK}`,
  `💸 Es más barato que ser hackeado. Y gratis 👉 ${process.env.CTA_LINK}`,
  `📡 Los mismos que te ofrecen apps, te están escuchando 👉 ${process.env.CTA_LINK}`,
  `📶 Si usas tu móvil, usa esto. Punto 👉 ${process.env.CTA_LINK}`,
  `⚡ Un clic. Y todo cambia 👉 ${process.env.CTA_LINK}`,
  `🧐 No es por paranoia. Es por experiencia 👉 ${process.env.CTA_LINK}`,
  `❓ Si tienes dudas, prueba. Si no las tienes, peor 👉 ${process.env.CTA_LINK}`,
  `😤 Esto lo instalé el día que LaLiga me cabreó 👉 ${process.env.CTA_LINK}`,
  `👊 Ya no tengo miedo de que me espíen. Ahora se lo pongo difícil 👉 ${process.env.CTA_LINK}`,
  `🫢 Este es mi truco. No lo digas muy alto 👉 ${process.env.CTA_LINK}`,
  `🧱 Lo llaman VPN. Yo lo llamo chaleco antibalas digital 👉 ${process.env.CTA_LINK}`,
  `💥 Que te espíen otros… a mí que me busquen 👉 ${process.env.CTA_LINK}`,
  `🛑 Estás a un clic de estar tranquilo 👉 ${process.env.CTA_LINK}`,
  `🤔 ¿Por qué nadie habla de esto? Porque funciona 👉 ${process.env.CTA_LINK}`,
  `📣 Esto es lo que recomiendo cuando me preguntan 👉 ${process.env.CTA_LINK}`,
  `🙈 Si lo lees, pruébalo. Si lo ignoras, suerte 👉 ${process.env.CTA_LINK}`,
  `🤷‍♂️ No necesitas entenderlo. Solo activarlo 👉 ${process.env.CTA_LINK}`,
  `📵 Tu privacidad no es opcional. Pero te la quitan igual 👉 ${process.env.CTA_LINK}`,
  `💢 ¿Te dolería más que te escuchen o que no te avisen? 👉 ${process.env.CTA_LINK}`,
  `🚀 Haz clic, activa, y sigue con tu vida 👉 ${process.env.CTA_LINK}`,
  `📉 No es viral. Pero debería serlo 👉 ${process.env.CTA_LINK}`,
  `🫶 Esto no protege solo tu móvil. Te protege a ti 👉 ${process.env.CTA_LINK}`
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

/*
Automated Bluesky Bot (Node.js)
Posts a random phrase + link every 4 hours via GitHub Actions.

Dependencies:
  npm install @atproto/api

*/

const { BskyAgent } = require('@atproto/api')

const link = process.env.CTA_LINK;


const PHRASES = [
  `${link} 👈 🎙️ ¿Sabías que te pueden escuchar aunque el móvil esté bloqueado?`,
  `${link} 👈 📱 LaLiga ya lo hizo. ¿Quién más lo está haciendo sin que lo sepas?`,
  `${link} 👈 👂 Tu micro está activado más veces de las que imaginas`,
  `${link} 👈 🤐 Si tu móvil hablara… te delataría. Protégete`,
  `${link} 👈 🔒 ¿Micrófono, GPS, WiFi? Todo se rastrea. Bloquéalo`,
  `${link} 👈 👀 Me enteré de lo de LaLiga y cambié todo`,
  `${link} 👈 😳 Desde que supe lo del micro, no salgo sin esto`,
  `${link} 👈 🛡️ Usa esto y que te espíen si quieren… no podrán`,
  `${link} 👈 ⚠️ Pensé que era paranoia hasta que vi las pruebas`,
  `${link} 👈 🧠 Nadie tiene por qué saber dónde estoy. Ni tú`,
  `${link} 👈 🛡️ Esto no es una VPN cualquiera. Es mi escudo`,
  `${link} 👈 💀 Puedes seguir confiando en tu operador... o protegerte`,
  `${link} 👈 🔐 ¿Privacidad? No existe… hasta que haces esto`,
  `${link} 👈 👂 Hay apps que escuchan más de lo que tú hablas`,
  `${link} 👈 😌 Desde que lo instalo, el móvil respira tranquilo`,
  `${link} 👈 😤 Esto no es para todos. Es para los que se cansaron`,
  `${link} 👈 🧪 Lo instalé por curiosidad. Me quedé por seguridad`,
  `${link} 👈 🫣 ¿Crees que no te espían? Así pensaba yo`,
  `${link} 👈 💬 Pruébalo una vez. Luego lo recomendarás`,
  `${link} 👈 🧰 No es magia. Es protección digital real`,
  `${link} 👈 😅 Si lo supiera antes, me habría ahorrado muchos sustos`,
  `${link} 👈 📲 El botón más importante de tu móvil es este enlace`,
  `${link} 👈 ⏳ No esperes a que te pase algo para reaccionar`,
  `${link} 👈 🚫 Gratis, rápido y sin datos personales. Esto es lo que uso`,
  `${link} 👈 💎 Protege lo tuyo como si valiera millones. Porque lo vale`,
  `${link} 👈 🙈 Esto es para los que ya no confían en “ajustes de privacidad”`,
  `${link} 👈 📴 El móvil no es el problema. Es lo que haces con él`,
  `${link} 👈 🕵️‍♂️ Lo que estás ignorando, otros lo están escuchando`,
  `${link} 👈 📉 Deja de ser un producto. Empieza a protegerte`,
  `${link} 👈 💸 Es más barato que ser hackeado. Y gratis`,
  `${link} 👈 📡 Los mismos que te ofrecen apps, te están escuchando`,
  `${link} 👈 📶 Si usas tu móvil, usa esto. Punto`,
  `${link} 👈 ⚡ Un clic. Y todo cambia`,
  `${link} 👈 🧐 No es por paranoia. Es por experiencia`,
  `${link} 👈 👀 Te quejas de que te espían... y usas el WiFi del bar. Anda ya`,
  `${link} 👈 😂 Tu ex no te espía, pero tu móvil sí. Prioridades, bro`,
  `${link} 👈 🕶️ El FBI viendo tu vida aburrida mientras tú ni VPN usas`,
  `${link} 👈 📵 Si no usas esto, mejor apaga el móvil y llévate un walkie`,
  `${link} 👈 🤫 Esto no es para todos. Solo para los que sospechan de todo`,
  `${link} 👈 😏 "No tengo nada que ocultar"... dijo justo antes de llorar`,
  `${link} 👈 🤖 Alexa, Siri y Google ya saben lo que hiciste anoche`,
  `${link} 👈 💥 Este clic te protege más que tu madre y tu abogado juntos`,
  `${link} 👈 📲 Si llevas el móvil al baño y no usas VPN, estás regalando contenido`,
  `${link} 👈 🕵️‍♀️ Si te sientes observado, probablemente es porque lo estás`,
  `${link} 👈 🔍 Que no lo veas no significa que no esté pasando`,
  `${link} 👈 🫠 Usas modo incógnito y te crees hacker… usa esto mejor`,
  `${link} 👈 💬 Este enlace vale más que todos tus ajustes de privacidad juntos`,
  `${link} 👈 🙃 Si sigues usando el móvil así, al menos que te paguen por los datos`,
  `${link} 👈 😮‍💨 El micro escucha. El GPS ubica. El bot... te avisa`,
  `${link} 👈 📡 La app del banco, la del súper... todas cotillean`,
  `${link} 👈 😵‍💫 ¿"Aceptar todo"? No, bro. Acepta esto`,
  `${link} 👈 👻 Te espían más que a un narco con tobillera`,
  `${link} 👈 😎 Si vas a vivir paranoico, al menos que tenga estilo`,
  `${link} 👈 📉 Te venden como usuario, te compran como dato`,
  `${link} 👈 👽 Si crees en aliens pero no en espionaje digital, revisa prioridades`,
  `${link} 👈 🥷 Esto no es Black Mirror. Es peor.`,
  `${link} 👈 🎯 El móvil no es tuyo. Es de las apps que instalas`,
  `${link} 👈 🔇 Silenciar micro ≠ desconectar vigilancia. Hazlo bien`,
  `${link} 👈 🛠️ Instalar esto es como poner rejas al móvil`,
  `${link} 👈 💼 Ni tu jefe tiene tantos datos tuyos como tu móvil`,
  `${link} 👈 🔥 Esto es como cerrar la puerta cuando vas al baño… pero digital`,
  `${link} 👈 🪬 Contra el mal de ojo digital: clic aquí`,
  `${link} 👈 🤖 ¿Tu móvil está contigo o tú con él?`,
  `${link} 👈 ❓ Si tienes dudas, prueba. Si no las tienes, peor`,
  `${link} 👈 😤 Esto lo instalé el día que LaLiga me cabreó`,
  `${link} 👈 👊 Ya no tengo miedo de que me espíen. Ahora se lo pongo difícil`,
  `${link} 👈 🫢 Este es mi truco. No lo digas muy alto`,
  `${link} 👈 🧱 Lo llaman VPN. Yo lo llamo chaleco antibalas digital`,
  `${link} 👈 💥 Que te espíen otros… a mí que me busquen`,
  `${link} 👈 🛑 Estás a un clic de estar tranquilo`,
  `${link} 👈 🤔 ¿Por qué nadie habla de esto? Porque funciona`,
  `${link} 👈 📣 Esto es lo que recomiendo cuando me preguntan`,
  `${link} 👈 🙈 Si lo lees, pruébalo. Si lo ignoras, suerte`,
  `${link} 👈 🤷‍♂️ No necesitas entenderlo. Solo activarlo`,
  `${link} 👈 📵 Tu privacidad no es opcional. Pero te la quitan igual`,
  `${link} 👈 💢 ¿Te dolería más que te escuchen o que no te avisen?`,
  `${link} 👈 🚀 Haz clic, activa, y sigue con tu vida`,
  `${link} 👈 📉 No es viral. Pero debería serlo`,
  `${link} 👈 🫶 Esto no protege solo tu móvil. Te protege a ti`
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
